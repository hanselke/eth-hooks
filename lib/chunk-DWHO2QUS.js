'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chunkMLDFKDMQ_js = require('./chunk-MLDFKDMQ.js');
var chunkSYGGHKPN_js = require('./chunk-SYGGHKPN.js');
var chunk6CZGM7JT_js = require('./chunk-6CZGM7JT.js');
var ethers = require('ethers');
var mergeAnything = require('merge-anything');
var react = require('react');
var reactQuery = require('react-query');
var tsInvariant = require('ts-invariant');
var create = require('zustand');
var useDebounce = require('use-debounce');
var usehooksTs = require('usehooks-ts');
var providers = require('@ethersproject/providers');
var abstractConnector = require('@web3-react/abstract-connector');
var core = require('@web3-react/core');
var cts = require('web3modal');
var jsxRuntime = require('react/jsx-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var create__default = /*#__PURE__*/_interopDefaultLegacy(create);
var cts__namespace = /*#__PURE__*/_interopNamespace(cts);

var extractHardhatContracts = (configJson) => {
  var _a2;
  const parse = chunkSYGGHKPN_js.deployedHardhatContractsJsonSchema.safeParse(configJson);
  if (!parse.success) {
    console.error("Invalid deployment hardhat_contracts.json TDeployedHardhatContractsJson", parse.error);
  }
  const contractData = {};
  for (const chainIdStr in configJson) {
    const chainId = parseInt(chainIdStr);
    if (chainId == null || isNaN(chainId))
      continue;
    const deployedDataByNetwork = (_a2 = Object.values(configJson[chainId]).filter(
      (f) => parseInt(f == null ? void 0 : f.chainId) === chainId
    )) == null ? void 0 : _a2[0];
    if ((deployedDataByNetwork == null ? void 0 : deployedDataByNetwork.chainId) != null) {
      for (const contractName in deployedDataByNetwork.contracts) {
        const config = {
          [chainId]: { address: deployedDataByNetwork.contracts[contractName].address, chainId }
        };
        const abi = deployedDataByNetwork.contracts[contractName].abi;
        if (abi && (abi == null ? void 0 : abi.length) > 0) {
          contractData[contractName] = mergeAnything.merge(contractData[contractName] ?? {}, { abi });
        }
        contractData[contractName] = mergeAnything.merge({ ...contractData[contractName] }, { config });
      }
    }
  }
  return contractData;
};
var extractExternalContracts = (configJson) => {
  const parse = chunkSYGGHKPN_js.externalContractAddressMap.safeParse(configJson);
  if (!parse.success) {
    console.error("Invalid TExternalContractsAddressMap", parse.error);
  }
  const contractData = {};
  for (const chainIdStr in configJson) {
    const chainId = parseInt(chainIdStr);
    if (chainId == null || isNaN(chainId))
      continue;
    for (const contractName in configJson[chainId]) {
      const config = {
        [chainId]: { address: configJson[chainId][contractName], chainId }
      };
      contractData[contractName] = mergeAnything.merge({ ...contractData[contractName] ?? {} }, { config });
    }
  }
  return contractData;
};
var extractForgeBroadcastContracts = (configJson) => {
  const parse = chunkSYGGHKPN_js.forgeDeploymentBroadcastCollectionSchema.safeParse(configJson);
  if (!parse.success) {
    console.error("Invalid forge boradcast json TForgeBroadcastJson", parse.error);
  }
  const contractData = {};
  for (const chainIdStr in configJson) {
    const chainId = parseInt(chainIdStr);
    if (chainId == null || isNaN(chainId))
      continue;
    const contractDeployments = configJson[chainId].transactions.filter((f) => f.transactionType === "CREATE").map((m) => {
      const td = {
        contractName: m.contractName.replace("Deploy", "").replace("deploy", ""),
        address: m.contractAddress
      };
      return td;
    });
    const contractNameList = contractDeployments.map((m) => m.contractName);
    contractNameList.forEach((contractName) => {
      var _a2;
      const data = contractDeployments.filter((f) => f.contractName === contractName);
      if (data.length === 0) {
        console.error("Contract deployments NOT found for contract", contractName, `chainId: ${chainId}`);
      } else if (data.length > 1) {
        console.error(
          "Multiple contract deployments found for contract on the same chainId",
          contractName,
          `chainId: ${chainId}`
        );
      }
      console.log("output data", data[0]);
      const config = {
        [chainId]: { address: (_a2 = data == null ? void 0 : data[0]) == null ? void 0 : _a2.address, chainId }
      };
      contractData[contractName] = mergeAnything.merge({ ...contractData[contractName] ?? {} }, { config });
    });
  }
  return contractData;
};
var createConnectorForHardhatContract = (contractName, typechainFactory, deployedHardhatContractJson) => {
  const info = extractHardhatContracts(deployedHardhatContractJson)[contractName];
  if (info == null || info.abi == null) {
    throw new Error(
      `Contract ${contractName} not found in deployed contracts (hardhat_config.json).  Check your hardhat deploy scripts and hardhat_config.json`
    );
  }
  return {
    contractName,
    connect: typechainFactory.connect,
    abi: (info == null ? void 0 : info.abi) ?? typechainFactory.abi ?? [],
    config: {
      ...info.config
    }
  };
};
var createConnectorForFoundryContract = (contractName, typechainFactory, forgeBroadcastJson) => {
  const info = extractForgeBroadcastContracts(forgeBroadcastJson)[contractName];
  if (info == null || typechainFactory.abi == null) {
    throw new Error(
      `Contract ${contractName} not found in deployed contracts (foundry_config.json).  Check your foundry deploy script`
    );
  }
  return {
    contractName,
    connect: typechainFactory.connect,
    abi: typechainFactory.abi ?? [],
    config: {
      ...info.config
    }
  };
};
var createConnectorForExternalContract = (contractName, typechainFactory, deployedContractJson) => {
  const info = extractExternalContracts(deployedContractJson)[contractName];
  if (info == null) {
    throw new Error(
      `Contract ${contractName} not found in external contract map.  Check that contractName: address map is correct.  This is required by eth-sdk`
    );
  }
  return {
    contractName,
    connect: typechainFactory.connect,
    abi: typechainFactory.abi ?? [],
    config: {
      ...info.config
    }
  };
};
var createConnectorForExternalAbi = (contractName, config, abi, connectFunc = void 0) => {
  const deploymentConfig = { ...config };
  for (const k in deploymentConfig) {
    deploymentConfig[k].chainId = parseInt(k);
  }
  if (connectFunc) {
    return {
      contractName,
      connect: connectFunc,
      abi,
      config: deploymentConfig
    };
  } else {
    const defaultConnectFunction = (address, signerOrProvider) => {
      const baseContract = new ethers.BaseContract(address, abi, signerOrProvider);
      baseContract.contractName = contractName;
      return baseContract;
    };
    return {
      contractName,
      connect: defaultConnectFunction,
      abi,
      config: deploymentConfig
    };
  }
};
var contractsContextFactory = (loadAppContractConnectors) => {
  const defaultAppContractsContext = () => {
    return {
      contractConnectors: {},
      contractsByName: {},
      contractsByChainId: {}
    };
  };
  const initalizeState = (appContractConnectorList) => {
    const state = defaultAppContractsContext();
    state.contractConnectors = appContractConnectorList;
    return state;
  };
  const cloneContextState = (state) => {
    const newState = defaultAppContractsContext();
    newState.contractConnectors = { ...state.contractConnectors };
    newState.contractsByName = { ...state.contractsByName };
    newState.contractsByChainId = { ...state.contractsByChainId };
    return newState;
  };
  const sortContractsByChainId = (contractsByName) => {
    let contractsByChainId = {};
    const names = Object.keys(contractsByName);
    names.forEach((name) => {
      const chainIds = Object.keys(contractsByName[name]).map(Number);
      chainIds.forEach((chainId) => {
        const data = {
          [chainId]: { [name]: contractsByName[name][chainId] }
        };
        const temp = mergeAnything.merge(contractsByChainId, data);
        contractsByChainId = temp;
      });
    });
    return contractsByChainId;
  };
  const sortContractsByName = (contractsByChainId) => {
    let contractsByName = {};
    const chainIds = Object.keys(contractsByChainId).map(Number);
    chainIds.forEach((chainId) => {
      const names = Object.keys(contractsByChainId[chainId]);
      names.forEach((name) => {
        const data = {
          [name]: { [chainId]: contractsByChainId[chainId][name] }
        };
        const temp = mergeAnything.merge(contractsByName, data);
        contractsByName = temp;
      });
    });
    return contractsByName;
  };
  const removeInvalidContractsAction = (state, ethersAdaptor) => {
    if ((ethersAdaptor == null ? void 0 : ethersAdaptor.chainId) != null) {
      const newState = cloneContextState(state);
      const chainId = ethersAdaptor.chainId;
      delete newState.contractsByChainId[chainId];
      newState.contractsByName = sortContractsByName(newState.contractsByChainId);
      return newState;
    }
    return state;
  };
  const connectToContractWithAdaptorAction = (connector, adaptor) => {
    var _a2, _b;
    if (adaptor == null || !chunkMLDFKDMQ_js.isValidEthersAdaptor(adaptor)) {
      console.warn("No valid ethers adaptor provided.  Skipping contract connection");
      return void 0;
    }
    const { signer, provider } = adaptor;
    const signerOrProvider = signer ?? provider;
    const chainId = adaptor.chainId;
    const contractAddress = (_b = (_a2 = connector == null ? void 0 : connector.config) == null ? void 0 : _a2[chainId]) == null ? void 0 : _b.address;
    if (contractAddress != null && signerOrProvider != null) {
      const contract = connector.connect(connector.config[chainId].address, signerOrProvider);
      if (contract != null) {
        return contract;
      }
    }
    if (connector.config[chainId] != null) {
      console.warn("ContractConnector requires signer with the same chainId to connect contract");
    }
    console.log(
      `Couldn't connect to contract ${connector == null ? void 0 : connector.contractName}:   signer chainId: ${chainId}, config: ${JSON.stringify(
        connector == null ? void 0 : connector.config
      )}.`
    );
    console.log("\u{1F645}\u{1F3FD}\u200D\u2642\uFE0F Please make sure the correct network is connected and the contract is deployed.");
    return void 0;
  };
  const connectToAllContractsAction = (state, ethersAdaptor) => {
    if (ethersAdaptor == null || !chunkMLDFKDMQ_js.isValidEthersAdaptor(ethersAdaptor)) {
      tsInvariant.invariant.log("connectToAllContracts: Invalid ethers adaptor");
      return removeInvalidContractsAction(state, ethersAdaptor);
    }
    const newState = cloneContextState(state);
    const { chainId, signer, provider } = ethersAdaptor;
    const providerOrSigner = signer ?? provider;
    for (const contractName in newState.contractConnectors) {
      const connector = newState.contractConnectors[contractName];
      if (chainId && connector.config[chainId] != null && providerOrSigner != null) {
        const contract = connectToContractWithAdaptorAction(connector, ethersAdaptor);
        const data = { [contractName]: { [chainId]: contract } };
        newState.contractsByName = mergeAnything.merge(newState.contractsByName, data);
      }
    }
    newState.contractsByChainId = sortContractsByChainId(newState.contractsByName);
    return newState;
  };
  const connectToContractAction = (state, contractName, ethersAdaptor) => {
    if (ethersAdaptor == null || !chunkMLDFKDMQ_js.isValidEthersAdaptor(ethersAdaptor)) {
      tsInvariant.invariant.log("connectToAllContracts: Invalid ethers adaptor");
      return removeInvalidContractsAction(state, ethersAdaptor);
    }
    const newState = cloneContextState(state);
    const { chainId } = ethersAdaptor;
    const contractConnector = newState.contractConnectors[contractName];
    if (chainId && contractConnector.config[chainId] != null) {
      const contract = connectToContractWithAdaptorAction(contractConnector, ethersAdaptor);
      newState.contractsByName[contractConnector.contractName] = {};
      const temp = newState.contractsByName[contractConnector.contractName];
      temp[chainId] = contract;
      newState.contractsByChainId = sortContractsByChainId(newState.contractsByName);
    }
    return newState;
  };
  const setContractConnectorsAction = (contractConnectors) => {
    const newState = initalizeState(contractConnectors);
    return newState;
  };
  const useContractsAppStore = create__default["default"]()((set) => ({
    contractState: void 0,
    setContractState: (contractState) => set((store) => {
      store.contractState = contractState;
      return store;
    }),
    connectToAllContracts: (ethersAdaptor) => set((store) => {
      if (store.contractState) {
        const contractState = connectToAllContractsAction(store.contractState, ethersAdaptor);
        store.contractState = contractState;
      }
      return store;
    }),
    connectToContract: (contractName, ethersAdaptor) => set((store) => {
      if (store.contractState) {
        const contractState = connectToContractAction(store.contractState, contractName, ethersAdaptor);
        store.contractState = contractState;
      }
      return store;
    }),
    setContractConnectors: (contractConnectors) => set((store) => {
      const contractState = setContractConnectorsAction(contractConnectors);
      store.contractState = contractState;
      return store;
    })
  }));
  const useAppContracts = (contractName, chainId) => {
    var _a2, _b, _c;
    const contractsState = useContractsAppStore((state) => state.contractState);
    const ethersContext = useEthersAppContext();
    const contract = (_b = (_a2 = contractsState == null ? void 0 : contractsState.contractsByName) == null ? void 0 : _a2[contractName]) == null ? void 0 : _b[chainId ?? -1];
    const contractConnector = (_c = contractsState == null ? void 0 : contractsState.contractConnectors) == null ? void 0 : _c[contractName];
    const chainIdRef = react.useRef(-1);
    if (contract == null && (ethersContext == null ? void 0 : ethersContext.chainId) != null && (contractConnector == null ? void 0 : contractConnector.abi) != null && chainId === chainIdRef.current) {
      console.warn(`\u26A0\uFE0F Contract ${contractName} not found on chain ${chainId}.`);
      console.warn(
        `\u{1F64B}\u{1F3FD}\u200D\u2642\uFE0F 1. Did you setup the contract in the config ? 2. Did you call useLoadAppContracts with an adaptor that has the correct chainId ?`
      );
      chainIdRef.current = chainId;
    }
    if (contract) {
      return contract;
    }
    return void 0;
  };
  const useLoadAppContracts = () => {
    const queryClient = reactQuery.useQueryClient();
    const setContractConnectors = useContractsAppStore((state) => state.setContractConnectors);
    const load = react.useCallback(() => {
      if (loadAppContractConnectors != null) {
        const connectors = loadAppContractConnectors();
        if (connectors != null) {
          setContractConnectors(connectors);
          chunkMLDFKDMQ_js.invalidateCache(queryClient, chunkSYGGHKPN_js.keyNamespace.contracts);
        }
      }
    }, []);
    react.useEffect(() => {
      void load();
    }, [load]);
  };
  const useConnectAppContracts = (adaptor) => {
    const queryClient = reactQuery.useQueryClient();
    const connectToAllContracts = useContractsAppStore((state) => state.connectToAllContracts);
    const validAdaptorState = chunkMLDFKDMQ_js.isValidEthersAdaptor(adaptor);
    const connect = react.useCallback(() => {
      if ((adaptor == null ? void 0 : adaptor.chainId) != null) {
        connectToAllContracts(adaptor);
        chunkMLDFKDMQ_js.invalidateCache(queryClient, chunkSYGGHKPN_js.keyNamespace.contracts);
      }
    }, [adaptor == null ? void 0 : adaptor.provider, adaptor == null ? void 0 : adaptor.signer, adaptor == null ? void 0 : adaptor.chainId, adaptor == null ? void 0 : adaptor.account, validAdaptorState]);
    react.useEffect(() => {
      void connect();
    }, [connect]);
  };
  return {
    useContractsAppStore,
    useAppContracts,
    useLoadAppContracts,
    useConnectAppContracts
  };
};
var useEthersAppStore = create__default["default"]()((set) => ({
  blockNumberState: {},
  setBlockNumber: (blocknumber, chainId) => set((state) => {
    state.blockNumberState[chainId] = blocknumber;
    return state;
  })
}));
var useEthersUpdater = (update, blockNumber, options, allowBlockNumberUpdate = true) => {
  chunkMLDFKDMQ_js.checkUpdateOptions(options);
  const updateNumberRef = react.useRef(void 0);
  const blockNumberFilter = blockNumber ? Math.floor(blockNumber / (options.blockNumberInterval ?? 1)) : void 0;
  if (allowBlockNumberUpdate) {
    if (!options.refetchInterval && blockNumberFilter !== updateNumberRef.current) {
      updateNumberRef.current = blockNumberFilter;
      void update();
    }
  }
};

// src/hooks/useAreSignerEqual.ts
var queryKey = { namespace: chunkSYGGHKPN_js.keyNamespace.signer, key: "useAreSignerEqual" };
var useAreSignerEqual = (signer1, signer2, options = chunkMLDFKDMQ_js.mergeDefaultUpdateOptions()) => {
  const keys = [{ ...queryKey }, { singer1Key: chunkMLDFKDMQ_js.providerKey(signer1), signer2Key: chunkMLDFKDMQ_js.providerKey(signer2) }];
  const { data, refetch, status } = reactQuery.useQuery(
    keys,
    async (_keys) => {
      if (chunkMLDFKDMQ_js.signerHasNetwork(signer1)) {
        const chainId1 = await (signer1 == null ? void 0 : signer1.getChainId());
        const chainId2 = await (signer2 == null ? void 0 : signer2.getChainId());
        const address1 = await (signer1 == null ? void 0 : signer1.getAddress());
        const address2 = await (signer2 == null ? void 0 : signer2.getAddress());
        const isEqual = address1 === address2 && chainId1 === chainId2 && address1 !== void 0 && chainId1 !== void 0;
        return isEqual;
      }
      return void 0;
    },
    {
      ...chunkMLDFKDMQ_js.processQueryOptions(options)
    }
  );
  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);
  return [data, refetch, status];
};
var queryKey2 = { namespace: chunkSYGGHKPN_js.keyNamespace.signer, key: "useBalance" };
var zero = ethers.BigNumber.from(0);
var useBalance = (addresses, options = chunkMLDFKDMQ_js.mergeDefaultUpdateOptions(), override = chunkMLDFKDMQ_js.mergeDefaultOverride()) => {
  const ethersContext = useEthersAppContext(override.alternateContextKey);
  const { provider } = chunkMLDFKDMQ_js.ethersOverride(ethersContext, override);
  const keys = [{ ...queryKey2, ...chunkMLDFKDMQ_js.providerKey(provider) }, { addresses }];
  const { data, refetch, status } = reactQuery.useQuery(
    keys,
    async (keys2) => {
      const { addresses: addresses2 } = keys2.queryKey[1];
      if (provider && addresses2) {
        if (Array.isArray(addresses2)) {
          const result2 = {};
          await chunkMLDFKDMQ_js.asyncForEach(addresses2, async (address) => {
            const balance = await provider.getBalance(address);
            result2[address] = balance;
          });
          return result2;
        } else {
          const address = addresses2;
          const newBalance = await provider.getBalance(address);
          return newBalance;
        }
      }
      return void 0;
    },
    {
      ...chunkMLDFKDMQ_js.processQueryOptions(options),
      isDataEqual: (oldResult, newResult) => (oldResult == null ? void 0 : oldResult._hex) === (newResult == null ? void 0 : newResult._hex)
    }
  );
  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);
  let result;
  if (Array.isArray(addresses)) {
    result = data ?? {};
  } else {
    result = data ?? zero;
  }
  return [result, refetch, status];
};
var queryKey3 = { namespace: chunkSYGGHKPN_js.keyNamespace.signer, key: "useBlockNumber" };
var useBlockNumber = (provider, callback, options = chunkMLDFKDMQ_js.mergeDefaultUpdateOptions()) => {
  const keys = [
    {
      ...queryKey3,
      ...chunkMLDFKDMQ_js.providerKey(provider)
    }
  ];
  const { data, refetch, status } = reactQuery.useQuery(
    keys,
    async (_keys) => {
      if (provider) {
        const nextBlockNumber = await (provider == null ? void 0 : provider.getBlockNumber());
        return nextBlockNumber;
      }
      return void 0;
    },
    {
      ...chunkMLDFKDMQ_js.processQueryOptions(options)
    }
  );
  react.useEffect(() => {
    var _a2;
    if (provider) {
      const listener = (blockNumberLocal) => {
        void refetch();
        if (callback != null) {
          try {
            void callback(blockNumberLocal);
          } catch (e) {
            console.warn("useBlockNumber callback failed", e);
          }
        }
      };
      (_a2 = provider == null ? void 0 : provider.addListener) == null ? void 0 : _a2.call(provider, "block", listener);
      if (data == null) {
        void refetch();
      }
      return () => {
        var _a3;
        (_a3 = provider == null ? void 0 : provider.removeListener) == null ? void 0 : _a3.call(provider, "block", listener);
      };
    }
  }, [callback, provider, refetch]);
  return [data ?? 0, refetch, status];
};
var storageKey = "scaffold-eth-burner-privateKey";
var isValidPk = (pk) => {
  return (pk == null ? void 0 : pk.length) === 64 || (pk == null ? void 0 : pk.length) === 66;
};
var saveBurnerKeyToStorage = (incomingPK) => {
  if (isValidPk(incomingPK)) {
    const rawPK = incomingPK;
    window.history.pushState({}, "", "/");
    const currentPrivateKey = window.localStorage.getItem(storageKey);
    if (currentPrivateKey && currentPrivateKey !== rawPK) {
      window.localStorage.setItem(`${storageKey}_backup${Date.now()}`, currentPrivateKey);
      console.log("\u{1F511} ...Saved Private Key");
    }
    window.localStorage.setItem(`${storageKey}`, rawPK.toString());
  }
};
var loadBurnerKeyFromStorage = () => {
  const currentPrivateKey = window.localStorage.getItem(storageKey);
  return currentPrivateKey;
};
var useBurnerSigner = (localProvider) => {
  var _a2;
  const [privateKeyValue, setPrivateKey] = react.useState();
  const walletRef = react.useRef();
  const creatingBurnerRef = react.useRef(false);
  const [signer] = useDebounce.useDebounce(walletRef.current, 200, {
    trailing: true,
    equalityFn: (a, b) => (a == null ? void 0 : a.address) === (b == null ? void 0 : b.address) && a != null && b != null
  });
  const account = (_a2 = walletRef.current) == null ? void 0 : _a2.address;
  const setValue = (value) => {
    try {
      setPrivateKey(value);
      window.localStorage.setItem(storageKey, value);
    } catch (error) {
      console.log(error);
    }
  };
  react.useEffect(() => {
    const storedKey = window.localStorage.getItem(storageKey);
    if (!storedKey) {
      console.log("generating a new key");
      const newWallet = ethers.ethers.Wallet.createRandom();
      const newKey = newWallet.privateKey;
      setValue(newKey);
    } else {
      setValue(storedKey);
    }
  }, []);
  react.useEffect(() => {
    if (privateKeyValue && localProvider) {
      const wallet = new ethers.ethers.Wallet(privateKeyValue);
      const newSigner = wallet.connect(localProvider);
      walletRef.current = newSigner;
    }
  }, [privateKeyValue, localProvider]);
  const saveToStorage = react.useCallback(() => {
    console.log("\u{1F511} Incoming Private Key...");
    if (privateKeyValue != null) {
      saveBurnerKeyToStorage(privateKeyValue);
    }
  }, [privateKeyValue]);
  const generateBurnerSigner = react.useCallback(() => {
    if (localProvider && !creatingBurnerRef.current) {
      creatingBurnerRef.current = true;
      console.log("\u{1F511} Create new burner wallet...");
      const wallet = ethers.Wallet.createRandom();
      setPrivateKey((_v) => {
        console.log("\u{1F4DD} ...Set key");
        creatingBurnerRef.current = false;
        return wallet.privateKey;
      });
    } else {
      console.log("\u26A0 Could not create burner wallet");
    }
  }, [localProvider]);
  const loadOrGenerateBurner = react.useCallback(() => {
    if (setPrivateKey != null) {
      const pk = loadBurnerKeyFromStorage();
      if (pk && isValidPk(pk)) {
        console.log("\u{1F511} ...Loaded Private Key");
        setPrivateKey(pk);
      } else {
        generateBurnerSigner();
      }
    }
  }, [generateBurnerSigner]);
  const getBurnerPrivateKey = () => {
    return privateKeyValue;
  };
  return {
    signer,
    account,
    saveBurner: saveToStorage,
    loadOrGenerateBurner,
    generateBurnerSigner,
    getBurnerPrivateKey
  };
};
var queryKey4 = { namespace: chunkSYGGHKPN_js.keyNamespace.contracts, key: "useContractExistsAtAddress" };
var useContractExistsAtAddress = (contract, options = chunkMLDFKDMQ_js.mergeDefaultUpdateOptions()) => {
  const keys = [{ ...queryKey4, ...chunkMLDFKDMQ_js.contractKey(contract) }, { contractAddress: contract == null ? void 0 : contract.address }];
  const { data, refetch, status } = reactQuery.useQuery(
    keys,
    async (keys2) => {
      const { contractAddress } = keys2.queryKey[1];
      if (contractAddress != null && ethers.utils.isAddress(contractAddress) && (contract == null ? void 0 : contract.provider) != null) {
        const bytecode = await contract.provider.getCode(contractAddress);
        return bytecode !== "0x";
      }
      return false;
    },
    {
      ...chunkMLDFKDMQ_js.processQueryOptions(options)
    }
  );
  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);
  return [data ?? false, refetch, status];
};
var queryKey5 = { namespace: chunkSYGGHKPN_js.keyNamespace.contracts, key: "useContractReader" };
var useContractReader = (contract, contractFunc, args, funcEventFilter, options = chunkMLDFKDMQ_js.mergeDefaultUpdateOptions()) => {
  const keys = [
    {
      ...queryKey5,
      ...chunkMLDFKDMQ_js.contractFuncKey(contract, contractFunc)
    },
    { args: args ?? [], funcEventFilter }
  ];
  const { data, refetch, status } = reactQuery.useQuery(
    keys,
    async (keys2) => {
      const { args: args2 } = keys2.queryKey[1];
      if (contractFunc != null && contract != null) {
        const result = await contractFunc(...args2);
        return result;
      }
      return void 0;
    },
    {
      ...chunkMLDFKDMQ_js.processQueryOptions(options)
    }
  );
  react.useEffect(() => {
    if (funcEventFilter != null) {
      const listener = () => {
        void refetch();
      };
      try {
        contract == null ? void 0 : contract.on(funcEventFilter, listener);
        return () => {
          contract == null ? void 0 : contract.off(funcEventFilter, listener);
        };
      } catch (e) {
        console.log(e);
      }
    }
  }, [contract, funcEventFilter, refetch]);
  const blockNumber = useBlockNumberContext();
  const allowBlockNumberIntervalUpdate = funcEventFilter == null;
  useEthersUpdater(refetch, blockNumber, options, allowBlockNumberIntervalUpdate);
  return [data, refetch, status];
};
var queryKey6 = {
  namespace: chunkSYGGHKPN_js.keyNamespace.network,
  key: "useGetEthersAdaptorFromProviderOrSigners"
};
var useEthersAdaptorFromProviderOrSigners = (providerOrSigner, options = chunkMLDFKDMQ_js.mergeDefaultUpdateOptions()) => {
  const keys = [{ ...queryKey6, ...chunkMLDFKDMQ_js.providerKey(providerOrSigner) }];
  console.log("useEthersAdaptorFromProviderOrSigners keys, providerOrSigner", keys, providerOrSigner);
  const { data, refetch, status } = reactQuery.useQuery(
    keys,
    async (_keys) => {
      const result = await chunkMLDFKDMQ_js.parseProviderOrSigner(providerOrSigner);
      return result;
    },
    {
      ...chunkMLDFKDMQ_js.processQueryOptions(options),
      isDataEqual: (oldData, newData) => chunkMLDFKDMQ_js.isAdaptorEqual(oldData, newData)
    }
  );
  const validAdaptorState = chunkMLDFKDMQ_js.isValidEthersAdaptor(data);
  console.log("validAdaptorState", validAdaptorState);
  react.useEffect(() => {
    var _a2;
    if (data != null && !validAdaptorState) {
      console.log("not valid");
      if (data.provider) {
        void data.provider.getNetwork().then(() => refetch()).catch();
      } else if (data.signer && data.account) {
        void ((_a2 = data.signer.provider) == null ? void 0 : _a2.getNetwork().then(() => refetch()).catch());
      }
    }
  }, [data, refetch, validAdaptorState]);
  return [data, refetch, status];
};
var queryKey7 = { namespace: chunkSYGGHKPN_js.keyNamespace.contracts, key: "useEventListener" };
var useEventListener = (contract, eventFilter, startBlock, toBlock = void 0, options = chunkMLDFKDMQ_js.mergeDefaultUpdateOptions(chunkSYGGHKPN_js.const_blockNumberIntervalMedium)) => {
  const keys = [
    {
      ...queryKey7,
      ...chunkMLDFKDMQ_js.contractKey(contract)
    },
    {
      eventFilter,
      startBlock,
      toBlock
    }
  ];
  const { data, refetch, status } = reactQuery.useQuery(
    keys,
    async (keys2) => {
      {
        const { eventFilter: eventFilter_, startBlock: startBlock_, toBlock: toBlock_ } = keys2.queryKey[1];
        const result = await (contract == null ? void 0 : contract.queryFilter(eventFilter_, startBlock_, toBlock_));
        return result ?? [];
      }
    },
    {
      ...chunkMLDFKDMQ_js.processQueryOptions(options)
    }
  );
  react.useEffect(() => {
    if (eventFilter != null) {
      const listener = () => {
        void refetch();
      };
      try {
        contract == null ? void 0 : contract.on(eventFilter, listener);
        return () => {
          contract == null ? void 0 : contract.off(eventFilter, listener);
        };
      } catch (e) {
        console.log(e);
      }
    }
  }, [contract, eventFilter, refetch]);
  return [data ?? [], refetch, status];
};
var queryKey8 = { namespace: chunkSYGGHKPN_js.keyNamespace.state, key: "useGasPrice" };
var useGasPrice = (chainId, speed, currentNetworkInfo, options = chunkMLDFKDMQ_js.mergeDefaultUpdateOptions(), override = chunkMLDFKDMQ_js.mergeDefaultOverride()) => {
  const ethersContext = useEthersAppContext(override.alternateContextKey);
  const { provider } = chunkMLDFKDMQ_js.ethersOverride(ethersContext, override);
  const keys = [
    { ...queryKey8, ...chunkMLDFKDMQ_js.providerKey(provider) },
    { chainId, speed, currentNetworkInfo }
  ];
  const { data, refetch, isError, status } = reactQuery.useQuery(
    keys,
    async (keys2) => {
      const { chainId: chainId2, speed: speed2, currentNetworkInfo: currentNetworkInfo2 } = keys2.queryKey[1];
      if (!chainId2) {
        return void 0;
      } else if (chainId2 === 1) {
        if (navigator == null ? void 0 : navigator.onLine) {
          const gweiFactor = 10;
          const response = await fetch("https://ethgasstation.info/json/ethgasAPI.json");
          const result2 = response.json() ?? {};
          let newGasPrice = result2[speed2] / gweiFactor;
          if (!newGasPrice)
            newGasPrice = result2["fast"] / gweiFactor;
          return newGasPrice;
        }
      } else if (provider) {
        const fee = await provider.getFeeData();
        const price = fee.gasPrice ?? fee.maxFeePerGas;
        if (price && (price == null ? void 0 : price.toBigInt()) > 0) {
          const result2 = parseInt(ethers.utils.formatUnits(price, "gwei")) ?? 0;
          return result2;
        }
      }
      if (currentNetworkInfo2 == null ? void 0 : currentNetworkInfo2.gasPrice) {
        return currentNetworkInfo2.gasPrice;
      }
      return void 0;
    },
    {
      ...chunkMLDFKDMQ_js.processQueryOptions(options)
    }
  );
  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);
  const result = isError ? void 0 : data;
  const [gasPriceDebounced] = useDebounce.useDebounce(result, 250, { trailing: true });
  return [gasPriceDebounced, refetch, status];
};
var queryKey9 = {
  namespace: chunkSYGGHKPN_js.keyNamespace.signer,
  key: "useNonce"
};
var useNonce = (address, options = chunkMLDFKDMQ_js.mergeDefaultUpdateOptions(), override = chunkMLDFKDMQ_js.mergeDefaultOverride()) => {
  const ethersContext = useEthersAppContext(override.alternateContextKey);
  const { provider } = chunkMLDFKDMQ_js.ethersOverride(ethersContext, override);
  const keys = [{ ...queryKey9, ...chunkMLDFKDMQ_js.providerKey(provider) }, { address }];
  const { data, refetch, status } = reactQuery.useQuery(
    keys,
    async (keys2) => {
      const { address: address2 } = keys2.queryKey[1];
      if (address2) {
        const nextNonce = await (provider == null ? void 0 : provider.getTransactionCount(address2));
        return nextNonce ?? 0;
      }
      return void 0;
    },
    {
      ...chunkMLDFKDMQ_js.processQueryOptions(options)
    }
  );
  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);
  return [data ?? 0, refetch, status];
};
var queryKey10 = { namespace: chunkSYGGHKPN_js.keyNamespace.signer, key: "useSignerAddress" };
var useSignerAddress = (signer, options = chunkMLDFKDMQ_js.mergeDefaultUpdateOptions()) => {
  const keys = [{ ...queryKey10, ...chunkMLDFKDMQ_js.providerKey(signer) }];
  const { data, refetch, status } = reactQuery.useQuery(
    keys,
    async (_keys) => {
      if (signer) {
        const result = await signer.getAddress();
        return result;
      }
      return void 0;
    },
    {
      ...chunkMLDFKDMQ_js.processQueryOptions(options)
    }
  );
  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);
  return [data, refetch, status];
};
var queryKey11 = { namespace: chunkSYGGHKPN_js.keyNamespace.signer, key: "useSignerChainId" };
var useSignerChainId = (signer, options = chunkMLDFKDMQ_js.mergeDefaultUpdateOptions({ ...chunkSYGGHKPN_js.const_blockNumberIntervalMedium })) => {
  const keys = [{ ...queryKey11, ...chunkMLDFKDMQ_js.providerKey(signer) }];
  const { data, refetch, status } = reactQuery.useQuery(
    keys,
    async (_keys) => {
      const chainId = await (signer == null ? void 0 : signer.getChainId());
      return chainId;
    },
    {
      ...chunkMLDFKDMQ_js.processQueryOptions(options)
    }
  );
  const blockNumber = useBlockNumberContext();
  useEthersUpdater(refetch, blockNumber, options);
  return [data, refetch, status];
};
var queryKey12 = { namespace: chunkSYGGHKPN_js.keyNamespace.signer, key: "useTimestamp" };
var useTimestamp = (options = chunkMLDFKDMQ_js.mergeDefaultUpdateOptions(), override = chunkMLDFKDMQ_js.mergeDefaultOverride()) => {
  const blockNumber = useBlockNumberContext();
  const ethersContext = useEthersAppContext(override.alternateContextKey);
  const { provider } = chunkMLDFKDMQ_js.ethersOverride(ethersContext, override);
  const keys = [{ ...queryKey12, ...chunkMLDFKDMQ_js.providerKey(provider) }];
  const { data, refetch, status } = reactQuery.useQuery(
    keys,
    async (_keys) => {
      const blockNumber2 = await (provider == null ? void 0 : provider.getBlockNumber());
      if (blockNumber2 != null) {
        const block = await (provider == null ? void 0 : provider.getBlock(blockNumber2));
        if ((block == null ? void 0 : block.timestamp) != null) {
          return block.timestamp;
        }
      }
      return 0;
    },
    {
      ...chunkMLDFKDMQ_js.processQueryOptions(options)
    }
  );
  useEthersUpdater(refetch, blockNumber, options);
  return [data ?? 0, refetch, status];
};
var useCheckIsMounted = () => {
  const data = usehooksTs.useIsMounted();
  if (data()) {
    console.log("is mounted");
  } else {
    console.log("not mounted");
  }
};

// src/context/ethers-app/useBlockNumberContext.tsx
var useBlockNumberContext = (chainId, override) => {
  const ethersContext = useEthersAppContext(override == null ? void 0 : override.alternateContextKey);
  const blockNumberState = useEthersAppStore((state) => state.blockNumberState);
  const setBlockNumber = useEthersAppStore((state) => state.setBlockNumber);
  let result = void 0;
  [result] = useBlockNumber(ethersContext.provider);
  react.useEffect(() => {
    if (ethersContext.chainId && result != null && result !== blockNumberState[ethersContext.chainId]) {
      setBlockNumber(result, ethersContext.chainId);
    }
  }, [blockNumberState, ethersContext.chainId, result, setBlockNumber]);
  if (chainId && chainId !== ethersContext.chainId) {
    if (blockNumberState[chainId] == null)
      tsInvariant.invariant.log(
        "blockNumberState[chainId] in the store is null, make sure to have a provider for this chain",
        chainId
      );
    result = blockNumberState[chainId] ?? 0;
  }
  return result;
};

// src/context/ethers-app/connectors/connectorErrors.ts
var connectorErrorText = {
  NoStaticJsonRPCProviderFoundError: "Could not find a static json-rpc provider.  Is it running?",
  NoEthereumProviderFoundError: "No web3 provider found",
  CouldNotActivateError: "Could not activate the web3 provider",
  UserClosedModalError: "Did not log in, the user did not select a web3 provider"
};
var UserClosedModalError = class extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = `EthersModalConnector: ${connectorErrorText.UserClosedModalError}.`;
  }
};
var CouldNotActivateError = class extends Error {
  constructor(error) {
    super();
    this.name = this.constructor.name;
    this.message = `EthersModalConnector: ${connectorErrorText.CouldNotActivateError}.  ${error ?? ""}`;
  }
};
var NoEthereumProviderFoundError = class extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = `EthersModalConnector: ${connectorErrorText.NoEthereumProviderFoundError}.`;
  }
};
var NoStaticJsonRPCProviderFoundError = class extends Error {
  constructor(error) {
    super();
    this.name = this.constructor.name;
    this.message = `EthersModalConnector: ${connectorErrorText.NoStaticJsonRPCProviderFoundError}.   ${error ?? ""}`;
  }
};
var _a;
var Web3Modal = ((_a = cts__namespace.default) == null ? void 0 : _a.default) ?? cts__namespace.default;

// src/context/ethers-app/connectors/EthersModalConnector.ts
var _EthersModalConnector = class extends abstractConnector.AbstractConnector {
  _options;
  _providerBase;
  _ethersProvider;
  _web3Modal;
  _id;
  _debug = false;
  _config;
  _signer;
  _theme;
  get config() {
    return this._config;
  }
  hasCachedProvider() {
    var _a2;
    return !!((_a2 = this._web3Modal) == null ? void 0 : _a2.cachedProvider);
  }
  constructor(web3modalOptions, config = { reloadOnNetworkChange: false, immutableProvider: false }, id, debug = false) {
    super();
    this._options = web3modalOptions;
    this._id = id;
    this._debug = debug;
    this._config = config;
    this._theme = web3modalOptions.theme ?? "light";
    this.handleChainChanged = this.handleChainChanged.bind(this);
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  log(...args) {
    if (this._debug) {
      console.log("\u{1F50C} ", args);
    }
  }
  maybeReload() {
    if (window && this._config.reloadOnNetworkChange) {
      window.location.reload();
    }
  }
  setEthersProvider() {
    if (this.isEthersProvider()) {
      this._ethersProvider = this._providerBase;
    } else {
      this._ethersProvider = new providers.Web3Provider(this._providerBase, this._config.immutableProvider ? "any" : void 0);
    }
  }
  handleChainChanged(chainId) {
    var _a2;
    this.log(`Handling chain changed to ${chainId}! updating providers`);
    this._signer = void 0;
    (_a2 = this.emitUpdate) == null ? void 0 : _a2.call(this, { chainId, provider: this._providerBase });
    this.setEthersProvider();
    void this.getSignerFromAccount();
    this.maybeReload();
  }
  handleAccountsChanged(accounts) {
    var _a2, _b;
    this.log(`Handling accounts changed`, accounts);
    if (accounts.length === 0) {
      (_a2 = this.emitDeactivate) == null ? void 0 : _a2.call(this);
    } else {
      const newAccount = accounts[0];
      void this.setSignerFromAccount(newAccount);
      (_b = this.emitUpdate) == null ? void 0 : _b.call(this, { account: accounts[0] });
    }
  }
  handleDisconnect(code, reason) {
    this.log(`Handling disconnected event`, code, reason);
    this.deactivate();
  }
  handleClose(code, reason) {
    this.log("Handling 'close' event", code, reason);
    this.deactivate();
  }
  loadWeb3Modal() {
    if (!this._web3Modal) {
      this._web3Modal = new Web3Modal({ ...this._options, theme: this._theme });
    }
  }
  async activate() {
    var _a2, _b, _c;
    try {
      this.loadWeb3Modal();
      if (this._web3Modal) {
        if (this._options.cacheProvider === false || !this.checkValidCachedProvider()) {
          this.resetModal();
        }
        _EthersModalConnector.isModalOpening = true;
        console.log("Open provider modal");
        await this._web3Modal.updateTheme(this._theme);
        if (this._id) {
          this._providerBase = await this._web3Modal.connectTo(this._id);
        } else {
          this._providerBase = await this._web3Modal.connect();
        }
        this._providerBase.on("chainChanged", this.handleChainChanged);
        this._providerBase.on("accountsChanged", this.handleAccountsChanged);
        this._providerBase.on("disconnect", this.handleDisconnect);
        this._providerBase.on("close", this.handleClose);
        this.setEthersProvider();
      }
      const account = ((_a2 = this._providerBase) == null ? void 0 : _a2.selectedAddress) ?? await this.getAccount();
      let chainId = ((_b = this._providerBase) == null ? void 0 : _b.networkVersion) ?? ethers.BigNumber.from(((_c = this._providerBase) == null ? void 0 : _c.chainId) ?? 0).toNumber();
      if (chainId === 0) {
        chainId = await this.getChainId();
      }
      this.setSignerFromAccount(account);
      _EthersModalConnector.isModalOpening = false;
      return { provider: this._providerBase, account, chainId };
    } catch (error) {
      this.resetModal();
      if (typeof error === "string" && ((error == null ? void 0 : error.includes(chunkSYGGHKPN_js.const_web3DialogClosedByUser)) || (error == null ? void 0 : error.includes(chunkSYGGHKPN_js.const_web3DialogUserRejected)))) {
        tsInvariant.invariant.log(error);
        this.deactivate();
        throw new UserClosedModalError();
      } else if (error instanceof NoStaticJsonRPCProviderFoundError) {
        tsInvariant.invariant.warn(`EthersModalConnector: ${connectorErrorText.NoStaticJsonRPCProviderFoundError}`);
        throw error;
      } else if (error instanceof NoEthereumProviderFoundError) {
        tsInvariant.invariant.warn(`EthersModalConnector: ${connectorErrorText.NoEthereumProviderFoundError}`);
        throw error;
      } else {
        tsInvariant.invariant.warn(`EthersModalConnector: ${connectorErrorText.CouldNotActivateError}`, error, this._providerBase);
        throw new CouldNotActivateError(error);
      }
    }
  }
  isEthersProvider() {
    return chunkMLDFKDMQ_js.isEthersProvider(this._providerBase);
  }
  deactivate() {
    var _a2, _b, _c, _d, _e, _f, _g;
    (_a2 = this.emitDeactivate) == null ? void 0 : _a2.call(this);
    (_b = this._providerBase) == null ? void 0 : _b.removeListener("disconnect", this.handleDisconnect);
    (_c = this._providerBase) == null ? void 0 : _c.removeListener("chainChanged", this.handleChainChanged);
    (_d = this._providerBase) == null ? void 0 : _d.removeListener("accountsChanged", this.handleAccountsChanged);
    (_e = this._providerBase) == null ? void 0 : _e.removeListener("close", this.handleClose);
    const provider = this._providerBase;
    (_f = provider == null ? void 0 : provider.disconnect) == null ? void 0 : _f.call(provider);
    (_g = provider == null ? void 0 : provider.close) == null ? void 0 : _g.call(provider);
    this.maybeReload();
  }
  getProvider() {
    return Promise.resolve(this._ethersProvider);
  }
  async getChainId() {
    var _a2, _b;
    return Promise.resolve(((_b = (_a2 = this._ethersProvider) == null ? void 0 : _a2.network) == null ? void 0 : _b.chainId) ?? 0);
  }
  async setSignerFromAccount(account) {
    var _a2, _b;
    if (account && ethers.utils.isAddress(account) && await ((_a2 = this._signer) == null ? void 0 : _a2.getAddress()) !== account) {
      this._signer = (_b = this._ethersProvider) == null ? void 0 : _b.getSigner(account);
    }
  }
  async getAccount() {
    var _a2;
    if (this._signer) {
      const account2 = await this._signer.getAddress();
      if (ethers.utils.isAddress(account2))
        return account2;
    }
    const accounts = await ((_a2 = this._ethersProvider) == null ? void 0 : _a2.listAccounts());
    const account = (accounts == null ? void 0 : accounts[0]) ?? null;
    await this.setSignerFromAccount(account);
    return Promise.resolve((accounts == null ? void 0 : accounts[0]) ?? null);
  }
  getSigner() {
    return this._signer;
  }
  async getSignerFromAccount() {
    var _a2;
    const account = await this.getAccount();
    await this.setSignerFromAccount(account);
    (_a2 = this.emitUpdate) == null ? void 0 : _a2.call(this, { account });
  }
  async changeSigner(signer) {
    var _a2, _b;
    const account = await signer.getAddress();
    if (ethers.utils.isAddress(account) && this.validState()) {
      this._signer = signer;
      this.handleAccountsChanged([account]);
      console.log(`changeSigner: provider chainId ${await this.getChainId()}`);
      console.log(`new signer chainId ${((_b = await ((_a2 = signer.provider) == null ? void 0 : _a2.getNetwork())) == null ? void 0 : _b.chainId) ?? ""}`);
    }
  }
  validState() {
    return this._providerBase != null && this._ethersProvider != null && this._web3Modal != null;
  }
  resetModal() {
    var _a2;
    if (this._web3Modal) {
      this._web3Modal.clearCachedProvider();
      this._providerBase = void 0;
      this._ethersProvider = void 0;
      this._signer = void 0;
      (_a2 = this.emitUpdate) == null ? void 0 : _a2.call(this, { account: void 0, provider: void 0, chainId: void 0 });
    }
  }
  setModalTheme(theme) {
    this._theme = theme;
  }
  checkValidCachedProvider() {
    if (_EthersModalConnector.isModalOpening) {
      return false;
    }
    const modal = this._web3Modal;
    if (modal != null) {
      if (!modal.getUserOptions().find((f) => f.id === modal.cachedProvider)) {
        return false;
      }
    }
    return true;
  }
};
var EthersModalConnector = _EthersModalConnector;
chunk6CZGM7JT_js.__publicField(EthersModalConnector, "isModalOpening", false);
var defaultQueryClient = new reactQuery.QueryClient();
var useEthersAppContext = (contextKey) => {
  if (contextKey === "primary")
    console.warn("Do not explicitly use primary contextKey, pass in undefined instead");
  const { connector, activate, library, account, deactivate, chainId, ...context } = core.useWeb3React(contextKey);
  if (!(connector instanceof EthersModalConnector || connector instanceof abstractConnector.AbstractConnector) && connector != null) {
    throw "Connector is not a EthersModalConnector";
  }
  const ethersConnector = connector;
  const openModal = react.useCallback(
    (ethersModalConnector, onError) => {
      if (context.active) {
        deactivate();
      }
      if (ethersModalConnector == null) {
        tsInvariant.invariant.error("A valid ethersModalConnector was not provided");
      }
      if (ethersModalConnector != null) {
        const onActivateError = (error) => {
          var _a2;
          try {
            (_a2 = connector == null ? void 0 : connector.deactivate) == null ? void 0 : _a2.call(connector);
            console.warn(error);
            onError == null ? void 0 : onError(error);
          } catch {
          }
        };
        void activate(ethersModalConnector, onActivateError);
      }
    },
    [context.active, deactivate, activate, connector]
  );
  const disconnectModal = react.useCallback(
    (onSuccess) => {
      ethersConnector.resetModal();
      deactivate();
      onSuccess == null ? void 0 : onSuccess();
    },
    [deactivate, ethersConnector]
  );
  const result = {
    connector: ethersConnector,
    provider: library,
    activate,
    deactivate,
    library,
    account: account ?? void 0,
    signer: ethersConnector == null ? void 0 : ethersConnector.getSigner(),
    chainId,
    changeSigner: ethersConnector == null ? void 0 : ethersConnector.changeSigner.bind(ethersConnector),
    openModal,
    disconnectModal,
    setModalTheme: ethersConnector == null ? void 0 : ethersConnector.setModalTheme.bind(ethersConnector),
    ...context
  };
  return result;
};
var useEthersContext = (contextKey) => {
  return useEthersAppContext(contextKey);
};
var getEthersAppProviderLibrary = (provider, connector) => {
  if (provider == null) {
    throw new NoEthereumProviderFoundError();
  }
  let anyNetwork = void 0;
  if (connector && connector instanceof EthersModalConnector) {
    anyNetwork = connector.config.immutableProvider ? "any" : void 0;
  }
  if (chunkMLDFKDMQ_js.isEthersProvider(provider)) {
    return provider;
  } else {
    return new providers.Web3Provider(provider, anyNetwork);
  }
};
var EthersAppContext = (props) => {
  if (props.secondaryWeb3ReactRoot != null) {
    tsInvariant.invariant(
      !!props.secondaryWeb3ReactRoot.contextKey,
      "When using alternate web3-react roots, you need to provide a valid contextKeyName"
    );
    tsInvariant.invariant(
      props.secondaryWeb3ReactRoot.web3ReactRoot != null,
      "When using alternate web3-react roots, you need to provide a valid web3ReactRoot"
    );
    tsInvariant.invariant(props.secondaryWeb3ReactRoot.contextKey !== "primary", "You cannot use primary for alternate roots");
    const alternateProvider = react.cloneElement(
      props.secondaryWeb3ReactRoot.web3ReactRoot,
      { getLibrary: props.customGetEthersAppProviderLibrary ?? getEthersAppProviderLibrary },
      /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {
        children: props.children
      })
    );
    return alternateProvider;
  }
  const element = /* @__PURE__ */ jsxRuntime.jsx(core.Web3ReactProvider, {
    getLibrary: props.customGetEthersAppProviderLibrary ?? getEthersAppProviderLibrary,
    children: props.children
  });
  if (props.disableDefaultQueryClientRoot) {
    return element;
  } else {
    return /* @__PURE__ */ jsxRuntime.jsx(reactQuery.QueryClientProvider, {
      client: defaultQueryClient,
      children: element
    });
  }
};
var ConnectToStaticJsonRpcProvider = async (_package, opts) => {
  const url = opts.rpc[opts.currentChainId];
  try {
    const provider = new providers.StaticJsonRpcProvider(url, opts.currentChainId);
    await provider.getNetwork();
    await provider.getBlockNumber();
    if (!(provider == null ? void 0 : provider.anyNetwork)) {
      console.warn(`ConnectToStaticJsonRpcProvider: could not connect to chain: ${opts.currentChainId} url: ${url}`);
    }
    return provider;
  } catch (e) {
    throw new NoStaticJsonRPCProviderFoundError(e);
  }
};

exports.ConnectToStaticJsonRpcProvider = ConnectToStaticJsonRpcProvider;
exports.CouldNotActivateError = CouldNotActivateError;
exports.EthersAppContext = EthersAppContext;
exports.EthersModalConnector = EthersModalConnector;
exports.NoEthereumProviderFoundError = NoEthereumProviderFoundError;
exports.NoStaticJsonRPCProviderFoundError = NoStaticJsonRPCProviderFoundError;
exports.UserClosedModalError = UserClosedModalError;
exports.connectorErrorText = connectorErrorText;
exports.contractsContextFactory = contractsContextFactory;
exports.createConnectorForExternalAbi = createConnectorForExternalAbi;
exports.createConnectorForExternalContract = createConnectorForExternalContract;
exports.createConnectorForFoundryContract = createConnectorForFoundryContract;
exports.createConnectorForHardhatContract = createConnectorForHardhatContract;
exports.defaultQueryClient = defaultQueryClient;
exports.getEthersAppProviderLibrary = getEthersAppProviderLibrary;
exports.useAreSignerEqual = useAreSignerEqual;
exports.useBalance = useBalance;
exports.useBlockNumber = useBlockNumber;
exports.useBlockNumberContext = useBlockNumberContext;
exports.useBurnerSigner = useBurnerSigner;
exports.useCheckIsMounted = useCheckIsMounted;
exports.useContractExistsAtAddress = useContractExistsAtAddress;
exports.useContractReader = useContractReader;
exports.useEthersAdaptorFromProviderOrSigners = useEthersAdaptorFromProviderOrSigners;
exports.useEthersAppContext = useEthersAppContext;
exports.useEthersContext = useEthersContext;
exports.useEthersUpdater = useEthersUpdater;
exports.useEventListener = useEventListener;
exports.useGasPrice = useGasPrice;
exports.useNonce = useNonce;
exports.useSignerAddress = useSignerAddress;
exports.useSignerChainId = useSignerChainId;
exports.useTimestamp = useTimestamp;
//# sourceMappingURL=chunk-DWHO2QUS.js.map