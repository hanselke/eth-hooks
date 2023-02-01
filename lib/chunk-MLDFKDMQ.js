'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chunkSYGGHKPN_js = require('./chunk-SYGGHKPN.js');
var providers = require('@ethersproject/providers');
var mergeAnything = require('merge-anything');
var tsInvariant = require('ts-invariant');
var ethers = require('ethers');

// src/functions/asyncHelpers.ts
var asyncSome = async (arr, predicate) => {
  for (const e of arr) {
    if (await predicate(e))
      return e;
  }
  return void 0;
};
var asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
};
var isEthersProvider = (providerBase) => {
  if (providerBase == null)
    return false;
  return providerBase instanceof providers.Web3Provider || providerBase instanceof providers.StaticJsonRpcProvider || providerBase instanceof providers.JsonRpcProvider || providerBase instanceof providers.UrlJsonRpcProvider || providerBase instanceof providers.JsonRpcBatchProvider || providerBase instanceof providers.WebSocketProvider;
};
var signerHasNetwork = (signer) => {
  var _a;
  const provider = signer == null ? void 0 : signer.provider;
  if (((_a = provider == null ? void 0 : provider.network) == null ? void 0 : _a.chainId) > 0 && (signer == null ? void 0 : signer._isSigner))
    return true;
  return false;
};
var asEthersAdaptor = (ethersContext) => {
  return {
    provider: ethersContext.provider,
    signer: ethersContext.signer,
    chainId: ethersContext.chainId,
    account: ethersContext.account
  };
};
var isValidEthersContext = (ethersContext) => {
  if (ethersContext != null && ethersContext.chainId != null && ethersContext.provider != null && ethersContext.signer != null && !!ethersContext.account)
    return true;
  return false;
};
var isValidEthersAdaptor = (ethersAdaptor) => {
  var _a, _b, _c, _d, _e;
  if (ethersAdaptor != null && ethersAdaptor.chainId != null) {
    if (ethersAdaptor.provider != null && ((_b = (_a = ethersAdaptor.provider) == null ? void 0 : _a.network) == null ? void 0 : _b.chainId) === ethersAdaptor.chainId) {
      return true;
    } else if (ethersAdaptor.signer != null && !!ethersAdaptor.account && ((_e = (_d = (_c = ethersAdaptor == null ? void 0 : ethersAdaptor.signer) == null ? void 0 : _c.provider) == null ? void 0 : _d.network) == null ? void 0 : _e.chainId) === ethersAdaptor.chainId) {
      return true;
    }
  }
  return false;
};
var isAdaptorEqual = (adaptor1, adaptor2) => {
  if (isValidEthersAdaptor(adaptor1) && isValidEthersAdaptor(adaptor2)) {
    return (adaptor1 == null ? void 0 : adaptor1.chainId) === (adaptor2 == null ? void 0 : adaptor2.chainId) && (adaptor1 == null ? void 0 : adaptor1.account) === (adaptor2 == null ? void 0 : adaptor2.account) && providerKey(adaptor1 == null ? void 0 : adaptor1.provider) === providerKey(adaptor2 == null ? void 0 : adaptor2.provider);
  }
  return false;
};
var ethersOverride = (context, options) => {
  if (options.adaptorEnabled) {
    tsInvariant.invariant(
      options.alternateContextKey == null,
      "You cannot use both contextOverride and contextKey at the same time"
    );
    return options.adaptor ?? {};
  }
  return asEthersAdaptor(context);
};
var checkUpdateOptions = (update) => {
  if (update.refetchInterval) {
    tsInvariant.invariant(
      update.refetchInterval >= 1e4,
      "Invalid refetchInterval (polling), must be at least 10000ms or undefined (disabled)"
    );
    tsInvariant.invariant(
      update.blockNumberInterval === void 0,
      "You cannot use both refetchInterval (polling) and blockNumberInterval at the same time"
    );
  } else if (update.blockNumberInterval === void 0) {
    tsInvariant.invariant(update.blockNumberInterval, "Invalid blockNumberInterval, it cannot be undefined unless polling is used");
  } else {
    tsInvariant.invariant(update.blockNumberInterval > 0, "Invalid blockNumberInterval, must be greater than 0");
  }
};
var mergeDefaultOverride = (...overrides) => {
  const defaultOptions = chunkSYGGHKPN_js.defaultOverride();
  if ((overrides == null ? void 0 : overrides.length) > 0) {
    return mergeAnything.merge(defaultOptions, ...overrides);
  }
  return defaultOptions;
};
var mergeDefaultUpdateOptions = (...overrides) => {
  const mergedOverrides = mergeAnything.merge({}, ...overrides);
  const defaultOptions = chunkSYGGHKPN_js.defaultUpdateOptions();
  if ((overrides == null ? void 0 : overrides.length) > 0) {
    if (mergedOverrides.refetchInterval) {
      checkUpdateOptions(mergedOverrides);
      defaultOptions.blockNumberInterval = void 0;
    }
    return mergeAnything.merge(defaultOptions, mergedOverrides);
  }
  return defaultOptions;
};
var setContextOverride = (adaptor, enabled = true) => {
  return mergeDefaultOverride({ adaptor, adaptorEnabled: enabled });
};
var processQueryOptions = (options) => {
  checkUpdateOptions(options);
  const queryOptions = { ...options.query };
  if (options.refetchInterval) {
    queryOptions.enabled = true;
    queryOptions.refetchInterval = options.refetchInterval;
  }
  return queryOptions;
};
var providerKey = (providerOrSigner) => {
  var _a, _b, _c, _d;
  if (providerOrSigner == null)
    return { provider: "undefined provider", signer: "undefined signer" };
  if (providers.Provider.isProvider(providerOrSigner)) {
    const provider = providerOrSigner;
    return {
      provider: `${(_a = provider == null ? void 0 : provider.network) == null ? void 0 : _a.chainId}_${(_b = provider == null ? void 0 : provider.network) == null ? void 0 : _b.name}_${provider == null ? void 0 : provider.connection.url.substring(0, 25)}`,
      signer: "isProvider"
    };
  } else {
    const provider = providerOrSigner.provider;
    const signerStr = (providerOrSigner == null ? void 0 : providerOrSigner.address) ?? "";
    if (provider && (provider == null ? void 0 : provider.network) && ethers.Signer.isSigner(providerOrSigner)) {
      return {
        signer: `isSigner_${providerOrSigner._isSigner}_${signerStr}`,
        provider: `${(_c = provider == null ? void 0 : provider.network) == null ? void 0 : _c.chainId}_${(_d = provider == null ? void 0 : provider.network) == null ? void 0 : _d.name}_${provider == null ? void 0 : provider.connection.url.substring(
          0,
          25
        )}`
      };
    }
  }
  return { provider: "unknown provider", signer: "unknown signer" };
};
var adaptorKey = (adaptor) => {
  var _a;
  if (adaptor == null && !isValidEthersAdaptor(adaptor))
    return { adaptor: "undefined adaptor" };
  if ((adaptor == null ? void 0 : adaptor.signer) != null && adaptor.account != null && adaptor.provider != null) {
    return { adaptor: `${(_a = adaptor.chainId) == null ? void 0 : _a.toString()}_${adaptor == null ? void 0 : adaptor.account}_${providerKey((adaptor == null ? void 0 : adaptor.provider) ?? "")}` };
  } else if (adaptor == null ? void 0 : adaptor.provider) {
    return providerKey(adaptor == null ? void 0 : adaptor.provider);
  }
  return { adaptor: "unknown adaptor" };
};
var eventKey = (m) => {
  return `${m.transactionHash}_${m.logIndex}`;
};
var contractKey = (contract) => {
  var _a;
  if (contract == null)
    return { contract: "undefined contract" };
  const address = contract.address;
  const provider = providerKey(contract.provider);
  const signerStr = ((_a = contract.signer) == null ? void 0 : _a.address) ?? "";
  const fragments = contract.interface.fragments.map((m) => m.name).reduce((oldValue, current) => {
    let newValue = oldValue;
    if (newValue == null) {
      newValue = "";
    }
    newValue += `${current},`;
    return newValue;
  }, "");
  return { contract: `${address}_${signerStr}_${fragments}`, ...provider };
};
var contractFuncKey = (contract, func) => {
  if (contract == null || func == null)
    return { contractFunc: "undefined contract or contractFunc" };
  let methodName = void 0;
  Object.getOwnPropertyNames(contract).forEach((prop) => {
    if (contract[prop] === func) {
      methodName = prop;
    }
  });
  if (methodName !== null) {
    return { contractFunc: methodName ?? "unknown contractFunc", ...contractKey(contract) };
  }
  return { contractFunc: "unknown contractFunc", ...contractKey(contract) };
};
var invalidateCache = (queryClient, namespace, otherKeys = {}, variables = {}) => {
  var _a;
  void ((_a = queryClient == null ? void 0 : queryClient.invalidateQueries) == null ? void 0 : _a.call(queryClient, [{ namespace, ...otherKeys }, variables]));
};
var logQueryCache = (queryClient, namespace, otherKeys = {}, variables = {}) => {
  tsInvariant.invariant.log(queryClient.getQueriesData([{ namespace, ...otherKeys }, variables]));
};
var isProvider = (providerOrSigner) => {
  const casted = providerOrSigner;
  if (providerOrSigner instanceof providers.JsonRpcProvider || providerOrSigner instanceof providers.Web3Provider || providerOrSigner instanceof providers.StaticJsonRpcProvider) {
    return true;
  } else if (providers.Provider.isProvider(providerOrSigner)) {
    return true;
  } else if ((casted == null ? void 0 : casted._isProvider) && (casted == null ? void 0 : casted.getNetwork) != null && typeof (casted == null ? void 0 : casted.getNetwork) == "function" && casted.listAccounts != null && typeof casted.listAccounts == "function") {
    return true;
  }
  return false;
};
var isSigner = (providerOrSigner) => {
  const casted = providerOrSigner;
  if (providerOrSigner instanceof ethers.ethers.Signer) {
    return true;
  } else if (ethers.Signer.isSigner(providerOrSigner)) {
    return true;
  } else if ((casted == null ? void 0 : casted._isSigner) && typeof (casted == null ? void 0 : casted.provider) != null && (casted == null ? void 0 : casted.signMessage) != null && typeof (casted == null ? void 0 : casted.signMessage) == "function") {
    return true;
  }
  return false;
};
var parseProviderOrSigner = async (providerOrSigner) => {
  let signer;
  let provider;
  let providerNetwork;
  let account;
  try {
    if (isProvider(providerOrSigner)) {
      const casted = providerOrSigner;
      provider = casted;
      providerNetwork = await casted.getNetwork();
      const accounts = await casted.listAccounts();
      if (accounts && accounts.length > 0) {
        signer = casted.getSigner();
      }
    }
    if (!signer && isSigner(providerOrSigner)) {
      const casted = providerOrSigner;
      signer = casted;
      provider = casted.provider;
      providerNetwork = casted.provider && await casted.provider.getNetwork();
    }
    if (signer) {
      account = await (signer == null ? void 0 : signer.getAddress());
    }
    const result = {
      signer,
      provider,
      chainId: providerNetwork == null ? void 0 : providerNetwork.chainId,
      account
    };
    if (isValidEthersAdaptor(result))
      return result;
  } catch (error) {
    tsInvariant.invariant.warn("parseProviderOrSigner error:", error, providerOrSigner);
  }
  return void 0;
};

exports.adaptorKey = adaptorKey;
exports.asEthersAdaptor = asEthersAdaptor;
exports.asyncForEach = asyncForEach;
exports.asyncSome = asyncSome;
exports.checkUpdateOptions = checkUpdateOptions;
exports.contractFuncKey = contractFuncKey;
exports.contractKey = contractKey;
exports.ethersOverride = ethersOverride;
exports.eventKey = eventKey;
exports.invalidateCache = invalidateCache;
exports.isAdaptorEqual = isAdaptorEqual;
exports.isEthersProvider = isEthersProvider;
exports.isProvider = isProvider;
exports.isValidEthersAdaptor = isValidEthersAdaptor;
exports.isValidEthersContext = isValidEthersContext;
exports.logQueryCache = logQueryCache;
exports.mergeDefaultOverride = mergeDefaultOverride;
exports.mergeDefaultUpdateOptions = mergeDefaultUpdateOptions;
exports.parseProviderOrSigner = parseProviderOrSigner;
exports.processQueryOptions = processQueryOptions;
exports.providerKey = providerKey;
exports.setContextOverride = setContextOverride;
exports.signerHasNetwork = signerHasNetwork;
//# sourceMappingURL=chunk-MLDFKDMQ.js.map