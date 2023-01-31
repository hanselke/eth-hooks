import { BigNumber } from '@ethersproject/bignumber';
import { BaseContract } from '@ethersproject/contracts';
import { useQuery } from 'react-query';

import { useBlockNumberContext } from '~~/context';
import { contractKey, mergeDefaultUpdateOptions, processQueryOptions, TRequiredKeys } from '~~/functions';
import { useEthersUpdater } from '~~/hooks/useEthersUpdater';
import { THookResult, TUpdateOptions } from '~~/models';
import { keyNamespace } from '~~/models/constants';

const zero = BigNumber.from(0);
const queryKey: TRequiredKeys = { namespace: keyNamespace.signer, key: 'useTokenBalance' } as const;

type ERC20 = {
  balanceOf: (address: string) => Promise<BigNumber>;
};

/**
 * #### Summary
 * Get the balance of an ERC20 token in an address
 *
 * ##### ✏️ Notes
 * - uses the ethers.Contract object's provider to access the network
 *
 * @category Hooks
 *
 * @param contract ERC20 token to get the balance of
 * @param address Address of wallet that holds the tokens
 * @param options Options for how often and when to update
 * @returns
 */
export const useTokenBalance = <GContract extends BaseContract & ERC20>(
  contract: GContract,
  address: string,
  options: TUpdateOptions = mergeDefaultUpdateOptions()
): THookResult<BigNumber> => {
  const keys = [{ ...queryKey, ...contractKey(contract) }, { address }] as const;
  const { data, refetch, status } = useQuery(
    keys,
    async (keys): Promise<BigNumber> => {
      const { address } = keys.queryKey[1];

      if (contract?.provider && address) {
        const newBalance: BigNumber = (await contract?.balanceOf?.(address)) ?? zero;
        return newBalance;
      } else {
        return zero;
      }
    },
    {
      ...processQueryOptions<BigNumber>(options),
      isDataEqual: (oldResult, newResult) => oldResult?._hex === newResult?._hex,
    }
  );

  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);

  return [data ?? zero, refetch, status];
};
