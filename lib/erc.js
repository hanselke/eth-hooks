'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chunkDWHO2QUS_js = require('./chunk-DWHO2QUS.js');
var chunkMLDFKDMQ_js = require('./chunk-MLDFKDMQ.js');
var chunkSYGGHKPN_js = require('./chunk-SYGGHKPN.js');
require('./chunk-6CZGM7JT.js');
var bignumber = require('@ethersproject/bignumber');
var reactQuery = require('react-query');

var zero = bignumber.BigNumber.from(0);
var queryKey = { namespace: chunkSYGGHKPN_js.keyNamespace.signer, key: "useTokenBalance" };
var useTokenBalance = (contract, address, options = chunkMLDFKDMQ_js.mergeDefaultUpdateOptions()) => {
  const keys = [{ ...queryKey, ...chunkMLDFKDMQ_js.contractKey(contract) }, { address }];
  const { data, refetch, status } = reactQuery.useQuery(
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
      ...chunkMLDFKDMQ_js.processQueryOptions(options),
      isDataEqual: (oldResult, newResult) => (oldResult == null ? void 0 : oldResult._hex) === (newResult == null ? void 0 : newResult._hex)
    }
  );
  const blockNumber = chunkDWHO2QUS_js.useBlockNumberContext();
  chunkDWHO2QUS_js.useEthersUpdater(refetch, blockNumber, options);
  return [data ?? zero, refetch, status];
};

exports.useTokenBalance = useTokenBalance;
//# sourceMappingURL=erc.js.map