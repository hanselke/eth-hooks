import 'test/helpers/chai-imports';

import { expect } from 'chai';
import { Signer } from 'ethers';
import { setupMockYourContract } from 'test-files/__mocks__/setupMockContracts';
import { YourContract } from 'test-files/generated/contract-types';
import sinon from 'ts-sinon';

import * as hookHelpers from '~~/functions/hookHelpers';
import { hookTestWrapper } from '~~/helpers/test-utils';
import { defaultBlockWaitOptions } from '~~/helpers/test-utils/constants';
import { mineBlock, mineBlockUntil, setAutoMine } from '~~/helpers/test-utils/eth';
import { shouldFailWithMessage } from '~~/helpers/test-utils/functions';
import { waitForExpect } from '~~/helpers/test-utils/functions/mochaHelpers';
import { getTestSigners } from '~~/helpers/test-utils/wrapper';
import { wrapperTestSetupHelper } from '~~/helpers/test-utils/wrapper/hardhatTestHelpers';
import { useContractReader } from '~~/hooks';
import { THookResult } from '~~/models';
const initialPurpose = 'no purpose';

describe('useContractReader', function () {
  describe('Given that a YourContract is deployed', () => {
    let yourContract: YourContract | undefined;
    let contractSigner: Signer;
    let sandbox: sinon.SinonSandbox;

    before(async () => {
      // setup a contract
      const wrapper = await wrapperTestSetupHelper();
      contractSigner = (await getTestSigners(wrapper.mockProvider)).user1;
      [yourContract] = await setupMockYourContract(contractSigner);
    });

    // let _testStartBockNumber = 0;
    beforeEach(async () => {
      // const wrapper = await wrapperTestSetupHelper();
      // _testStartBockNumber = await wrapper.mockProvider.getBlockNumber();
      await yourContract?.setPurpose(initialPurpose);
    });

    afterEach(async () => {
      const wrapper = await wrapperTestSetupHelper();
      await setAutoMine(wrapper.mockProvider, true);
      sandbox?.restore();
    });

    describe('Given the setPurpose is called and set with a new value', () => {
      it('When the hook is invoked after setPurpose calls; then it returns the result of the contract call', async () => {
        const wrapper = await hookTestWrapper(() => useContractReader(yourContract, yourContract?.purpose));

        const firstPurpose = 'purpose 1';
        await yourContract?.setPurpose(firstPurpose);
        await waitForExpect(() => expect(wrapper.result.current[0]).to.eql(firstPurpose), defaultBlockWaitOptions);

        const secondPurpose = 'purpose 2';
        await yourContract?.setPurpose(secondPurpose);
        await waitForExpect(() => expect(wrapper.result.current[0]).to.eql(secondPurpose), defaultBlockWaitOptions);
      });

      it('When the hook is invoked after multiple setPurpose calls; then it returns the last result of the contract', async () => {
        const wrapper = await hookTestWrapper(() => useContractReader(yourContract, yourContract?.purpose));

        await yourContract?.setPurpose('purpose 1');
        await yourContract?.setPurpose('purpose 2');
        const finalPurpose = 'purpose final';
        await yourContract?.setPurpose(finalPurpose);
        await waitForExpect(() => expect(wrapper.result.current[0]).to.eql(finalPurpose), defaultBlockWaitOptions);
      });

      it('When given options of block number interval to update; then the hook only updates "once an interval" over multiple intervals', async () => {
        // ::Given::
        const blockIntervalToUpdate = 3;
        const totalBlocksToTraverse = 9;
        const expectedUpdatedCount = Math.floor(totalBlocksToTraverse / blockIntervalToUpdate) + 1;

        const updateOptions = { blockNumberInterval: blockIntervalToUpdate };
        const wrapper = await hookTestWrapper(() =>
          useContractReader(yourContract, yourContract?.purpose, [], undefined, updateOptions)
        );
        // set automine to false in this test.  automine is set to true in the afterEach
        await setAutoMine(wrapper.mockProvider, false);
        let periodStart = await wrapper.mockProvider.getBlockNumber();

        // ::When::
        // mine blocks up to block when update should occur
        await mineBlockUntil(wrapper.mockProvider, totalBlocksToTraverse, async (currentBlockNumber): Promise<void> => {
          const intervalPurpose = `purpose ${currentBlockNumber}`;
          // if the interval has passed check if the hook has been updated
          if (currentBlockNumber >= blockIntervalToUpdate + periodStart + 2) {
            await wrapper.waitForNextUpdate(defaultBlockWaitOptions);
            periodStart = await wrapper.mockProvider.getBlockNumber();
          }
          // set purpose every loop
          await yourContract?.setPurpose(intervalPurpose);
        });

        // ::Then::
        const uniqueHookResults = [
          ...new Set(wrapper.result.all.map((m) => (m as THookResult<string | undefined>)[0])),
        ];
        expect(uniqueHookResults).to.have.lengthOf(expectedUpdatedCount);
      });

      it('When given option for refetchInterval; then ensures result is not returned before refetchInterval', async () => {
        // ::Given::
        // turn off checkUpdateOptions to allow for lower refetchInterval time
        sandbox = sinon.createSandbox();
        sandbox.stub(hookHelpers, 'checkUpdateOptions').returns();
        const purposeUpdate = 'higher purpose';
        const updateOptions = {
          refetchInterval: 10_000, // Note this is below 10_000 limit just for testing
          blockNumberInterval: undefined,
        };
        const wrapper = await hookTestWrapper(() =>
          useContractReader(yourContract, yourContract?.purpose, [], undefined, updateOptions)
        );
        await yourContract?.setPurpose(purposeUpdate);
        // ensure mining block doesn't trigger update
        await mineBlock(wrapper.mockProvider);
        // ensure doesn't update before refetchInterval time
        await shouldFailWithMessage(
          () =>
            wrapper.waitForValueToChange(() => wrapper.result.current[0], {
              timeout: 6_000,
              interval: 200,
            }),
          'Timed out'
        );
        expect(wrapper.result.current[0]).be.equal(initialPurpose);

        // ::When::
        await wrapper.waitForValueToChange(() => wrapper.result.current[0], defaultBlockWaitOptions);

        // ::Then::
        expect(wrapper.result.current[0]).be.equal(purposeUpdate);
      });
    });

    describe('Given update options that are not allowed', () => {
      it('When given option for refetchInterval and blockNumberInterval; then throws error', async () => {
        const updateOptions = {
          refetchInterval: 11_000,
          blockNumberInterval: 5,
        };
        const wrapper = await hookTestWrapper(() =>
          useContractReader(yourContract, yourContract?.purpose, [], undefined, updateOptions)
        );

        await shouldFailWithMessage(
          async () => await wrapper.waitForValueToChange(() => wrapper.result.current, defaultBlockWaitOptions),
          'You cannot use both refetchInterval (polling) and blockNumberInterval at the same time'
        );
      });

      it('When given option for refetchInterval < 10000; then throws error', async () => {
        const updateOptions = {
          refetchInterval: 2_000,
          blockNumberInterval: undefined,
        };
        const wrapper = await hookTestWrapper(() =>
          useContractReader(yourContract, yourContract?.purpose, [], undefined, updateOptions)
        );

        await shouldFailWithMessage(
          async () => await wrapper.waitForValueToChange(() => wrapper.result.current, defaultBlockWaitOptions),
          'Invalid refetchInterval (polling), must be at least 10000ms or undefined (disabled)'
        );
      });

      it('When given option for blockNumberInterval <= 0; then throws error', async () => {
        const updateOptions = {
          blockNumberInterval: 0,
        };
        const wrapper = await hookTestWrapper(() =>
          useContractReader(yourContract, yourContract?.purpose, [], undefined, updateOptions)
        );

        await shouldFailWithMessage(
          async () => await wrapper.waitForValueToChange(() => wrapper.result.current, defaultBlockWaitOptions),
          'Invalid blockNumberInterval, must be greater than 0'
        );
      });
    });
  });
});
