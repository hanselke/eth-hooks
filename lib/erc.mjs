import { useBlockNumberContext, useEthersUpdater } from './chunk-4ZRKCOWA.mjs';
import { contractKey, processQueryOptions, mergeDefaultUpdateOptions } from './chunk-YI4OAWCG.mjs';
import { keyNamespace } from './chunk-NGVXFKGX.mjs';
import './chunk-MEWEIBC4.mjs';
import { BigNumber } from '@ethersproject/bignumber';
import { useQuery } from 'react-query';

var zero = BigNumber.from(0);
var queryKey = { namespace: keyNamespace.signer, key: "useTokenBalance" };
var useTokenBalance = (contract, address, options = mergeDefaultUpdateOptions()) => {
  const keys = [{ ...queryKey, ...contractKey(contract) }, { address }];
  const { data, refetch, status } = useQuery(
    keys,
    async (keys2) => {
      var _a;
      const { address: address2 } = keys2.queryKey[1];
      if ((contract == null ? void 0 : contract.provider) && address2) {
        const newBalance = await ((_a = contract == null ? void 0 : contract.balanceOf) == null ? void 0 : _a.call(contract, address2)) ?? zero;
        return newBalance;
      } else {
        return zero;
      }
    },
    {
      ...processQueryOptions(options),
      isDataEqual: (oldResult, newResult) => (oldResult == null ? void 0 : oldResult._hex) === (newResult == null ? void 0 : newResult._hex)
    }
  );
  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);
  return [data ?? zero, refetch, status];
};

export { useTokenBalance };
//# sourceMappingURL=erc.mjs.map