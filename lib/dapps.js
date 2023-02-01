'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chunkDWHO2QUS_js = require('./chunk-DWHO2QUS.js');
var chunkMLDFKDMQ_js = require('./chunk-MLDFKDMQ.js');
var chunkSYGGHKPN_js = require('./chunk-SYGGHKPN.js');
require('./chunk-6CZGM7JT.js');
var sdk = require('@uniswap/sdk');
var reactQuery = require('react-query');
var isEqual = require('lodash.isequal');
var ethers = require('ethers');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);

var queryKey = { namespace: chunkSYGGHKPN_js.keyNamespace.signer, key: "useDexEthPrice" };
var useDexEthPrice = (mainnetProvider, targetNetworkInfo, options = chunkMLDFKDMQ_js.mergeDefaultUpdateOptions()) => {
  const keys = [{ ...queryKey, ...chunkMLDFKDMQ_js.providerKey(mainnetProvider) }, { networkPrice: targetNetworkInfo == null ? void 0 : targetNetworkInfo.price }];
  const { data, refetch, status } = reactQuery.useQuery(
    keys,
    async (keys2) => {
      const { networkPrice } = keys2.queryKey[1];
      if (networkPrice) {
        return networkPrice;
      } else if (mainnetProvider) {
        const network = await mainnetProvider.getNetwork();
        const DAI = new sdk.Token(network ? network.chainId : 1, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18);
        const pair = await sdk.Fetcher.fetchPairData(DAI, sdk.WETH[DAI.chainId], mainnetProvider);
        const route = new sdk.Route([pair], sdk.WETH[DAI.chainId]);
        const price = parseFloat(route.midPrice.toSignificant(6));
        return price;
      }
    },
    {
      ...chunkMLDFKDMQ_js.processQueryOptions(options)
    }
  );
  const blockNumber = chunkDWHO2QUS_js.useBlockNumberContext();
  chunkDWHO2QUS_js.useEthersUpdater(refetch, blockNumber, options);
  return [data ?? 0, refetch, status];
};
var queryKey2 = { namespace: chunkSYGGHKPN_js.keyNamespace.signer, key: "useDexTokenList" };
var useDexTokenList = (tokenListUri = "https://gateway.ipfs.io/ipns/tokens.uniswap.org", chainId, options = chunkMLDFKDMQ_js.mergeDefaultUpdateOptions()) => {
  const keys = [{ ...queryKey2 }, { tokenListUri, chainId }];
  const { data, refetch, status } = reactQuery.useQuery(
    keys,
    async (keys2) => {
      const { tokenListUri: tokenListUri2, chainId: chainId2 } = keys2.queryKey[1];
      let tokenInfo = [];
      const response = await fetch(tokenListUri2);
      const tokenList = await response.json();
      if (tokenList != null) {
        if (chainId2) {
          tokenInfo = tokenList.tokens.filter((t) => {
            return t.chainId === chainId2;
          });
        } else {
          tokenInfo = tokenList.tokens;
        }
      }
      return tokenInfo;
    },
    {
      ...chunkMLDFKDMQ_js.processQueryOptions(options),
      isDataEqual: (oldResult, newResult) => isEqual__default["default"](oldResult, newResult)
    }
  );
  const blockNumber = chunkDWHO2QUS_js.useBlockNumberContext();
  chunkDWHO2QUS_js.useEthersUpdater(refetch, blockNumber, options);
  return [data ?? [], refetch, status];
};
var queryKey3 = { namespace: chunkSYGGHKPN_js.keyNamespace.signer, key: "useResolveEnsName" };
var lookupAddress = async (provider, address) => {
  if (ethers.utils.isAddress(address)) {
    try {
      const reportedName = await provider.lookupAddress(address);
      const resolvedAddress = await provider.resolveName(reportedName ?? ethers.constants.AddressZero);
      if (address && ethers.utils.getAddress(address) === ethers.utils.getAddress(resolvedAddress ?? "")) {
        return reportedName ?? "";
      } else {
        return ethers.utils.getAddress(address);
      }
    } catch (e) {
      return ethers.utils.getAddress(address);
    }
  }
  return "";
};
var useResolveEnsName = (mainnetProvider, address) => {
  const keys = [{ ...queryKey3, ...chunkMLDFKDMQ_js.providerKey(mainnetProvider) }, { address }];
  const { data, refetch, status } = reactQuery.useQuery(keys, async (keys2) => {
    const { address: address2 } = keys2.queryKey[1];
    const storedData = window.localStorage.getItem("ethhooks_ensCache_" + address2);
    const cache = JSON.parse(storedData ?? "{}");
    if (cache && (cache == null ? void 0 : cache.name) && (cache == null ? void 0 : cache.timestamp) > Date.now() && typeof (cache == null ? void 0 : cache.name) === "string") {
      return cache == null ? void 0 : cache.name;
    } else if (mainnetProvider) {
      const ensName = await lookupAddress(mainnetProvider, address2);
      if (ensName) {
        try {
          window.localStorage.setItem(
            "ensCache_" + address2,
            JSON.stringify({
              timestamp: Date.now() + 36e4,
              name: ensName
            })
          );
        } catch {
        }
        return ensName;
      }
    }
  });
  return [data, refetch, status];
};
var queryKey4 = { namespace: chunkSYGGHKPN_js.keyNamespace.signer, key: "useResolveEnsAddress" };
var useResolveEnsAddress = (mainnetProvider, ensName) => {
  const keys = [{ ...queryKey4, ...chunkMLDFKDMQ_js.providerKey(mainnetProvider) }, { ensName }];
  const { data, refetch, status } = reactQuery.useQuery(keys, async (keys2) => {
    const { ensName: ensName2 } = keys2.queryKey[1];
    if (mainnetProvider && ensName2) {
      const resolved = await mainnetProvider.resolveName(ensName2);
      return resolved ?? ethers.constants.AddressZero;
    }
    return ethers.constants.AddressZero;
  });
  return [data, refetch, status];
};

exports.useDexEthPrice = useDexEthPrice;
exports.useDexTokenList = useDexTokenList;
exports.useResolveEnsAddress = useResolveEnsAddress;
exports.useResolveEnsName = useResolveEnsName;
//# sourceMappingURL=dapps.js.map