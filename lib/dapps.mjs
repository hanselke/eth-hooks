import { useBlockNumberContext, useEthersUpdater } from './chunk-4ZRKCOWA.mjs';
import { providerKey, processQueryOptions, mergeDefaultUpdateOptions } from './chunk-YI4OAWCG.mjs';
import { keyNamespace } from './chunk-NGVXFKGX.mjs';
import './chunk-MEWEIBC4.mjs';
import { Token, Fetcher, WETH, Route } from '@uniswap/sdk';
import { useQuery } from 'react-query';
import isEqual from 'lodash.isequal';
import { constants, utils } from 'ethers';

var queryKey = { namespace: keyNamespace.signer, key: "useDexEthPrice" };
var useDexEthPrice = (mainnetProvider, targetNetworkInfo, options = mergeDefaultUpdateOptions()) => {
  const keys = [{ ...queryKey, ...providerKey(mainnetProvider) }, { networkPrice: targetNetworkInfo == null ? void 0 : targetNetworkInfo.price }];
  const { data, refetch, status } = useQuery(
    keys,
    async (keys2) => {
      const { networkPrice } = keys2.queryKey[1];
      if (networkPrice) {
        return networkPrice;
      } else if (mainnetProvider) {
        const network = await mainnetProvider.getNetwork();
        const DAI = new Token(network ? network.chainId : 1, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18);
        const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId], mainnetProvider);
        const route = new Route([pair], WETH[DAI.chainId]);
        const price = parseFloat(route.midPrice.toSignificant(6));
        return price;
      }
    },
    {
      ...processQueryOptions(options)
    }
  );
  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);
  return [data ?? 0, refetch, status];
};
var queryKey2 = { namespace: keyNamespace.signer, key: "useDexTokenList" };
var useDexTokenList = (tokenListUri = "https://gateway.ipfs.io/ipns/tokens.uniswap.org", chainId, options = mergeDefaultUpdateOptions()) => {
  const keys = [{ ...queryKey2 }, { tokenListUri, chainId }];
  const { data, refetch, status } = useQuery(
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
      ...processQueryOptions(options),
      isDataEqual: (oldResult, newResult) => isEqual(oldResult, newResult)
    }
  );
  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);
  return [data ?? [], refetch, status];
};
var queryKey3 = { namespace: keyNamespace.signer, key: "useResolveEnsName" };
var lookupAddress = async (provider, address) => {
  if (utils.isAddress(address)) {
    try {
      const reportedName = await provider.lookupAddress(address);
      const resolvedAddress = await provider.resolveName(reportedName ?? constants.AddressZero);
      if (address && utils.getAddress(address) === utils.getAddress(resolvedAddress ?? "")) {
        return reportedName ?? "";
      } else {
        return utils.getAddress(address);
      }
    } catch (e) {
      return utils.getAddress(address);
    }
  }
  return "";
};
var useResolveEnsName = (mainnetProvider, address) => {
  const keys = [{ ...queryKey3, ...providerKey(mainnetProvider) }, { address }];
  const { data, refetch, status } = useQuery(keys, async (keys2) => {
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
var queryKey4 = { namespace: keyNamespace.signer, key: "useResolveEnsAddress" };
var useResolveEnsAddress = (mainnetProvider, ensName) => {
  const keys = [{ ...queryKey4, ...providerKey(mainnetProvider) }, { ensName }];
  const { data, refetch, status } = useQuery(keys, async (keys2) => {
    const { ensName: ensName2 } = keys2.queryKey[1];
    if (mainnetProvider && ensName2) {
      const resolved = await mainnetProvider.resolveName(ensName2);
      return resolved ?? constants.AddressZero;
    }
    return constants.AddressZero;
  });
  return [data, refetch, status];
};

export { useDexEthPrice, useDexTokenList, useResolveEnsAddress, useResolveEnsName };
//# sourceMappingURL=dapps.mjs.map