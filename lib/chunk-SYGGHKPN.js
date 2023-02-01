'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zod = require('zod');

// src/models/constants/common.ts
var const_web3DialogClosedByUser = "Modal closed by user";
var const_web3DialogUserRejected = "Error: User Rejected";

// src/models/constants/keyNamespace.ts
var keyNamespace = {
  network: "network",
  signer: "signer",
  contracts: "contracts",
  state: "state"
};
var contractDeploymentMapSchema = zod.z.record(
  zod.z.string({ description: "contractName" }),
  zod.z.object({
    config: zod.z.record(
      zod.z.number({ description: "chainId" }),
      zod.z.object({
        address: zod.z.string(),
        chainId: zod.z.number()
      })
    )
  })
);
var contractMapWithAbiSchema = zod.z.record(
  zod.z.string({ description: "contractName" }),
  zod.z.object({
    config: zod.z.record(
      zod.z.number({ description: "chainId" }),
      zod.z.object({
        address: zod.z.string(),
        chainId: zod.z.number()
      })
    ),
    abi: zod.z.array(zod.z.any())
  })
);
var externalContractAddressMap = zod.z.record(
  zod.z.union([zod.z.string({ description: "chainId" }), zod.z.number({ description: "chainId" })]).transform((s) => parseInt(s.toString())),
  zod.z.record(zod.z.string({ description: "contractName" }), zod.z.string({ description: "address" }))
);

// src/models/hookTypes.ts
var const_blockNumberIntervalShort = { blockNumberInterval: 10 };
var const_blockNumberIntervalMedium = { blockNumberInterval: 50 };
var const_blockNumberIntervalLong = { blockNumberInterval: 250 };
var defaultOverride = () => {
  return {
    adaptorEnabled: false,
    adaptor: void 0,
    alternateContextKey: void 0
  };
};
var defaultUpdateOptions = () => {
  return {
    blockNumberInterval: 1,
    refetchInterval: void 0,
    query: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: 3e4
    }
  };
};
var forgeTransactionDataSchema = zod.z.object({
  type: zod.z.string(),
  from: zod.z.string(),
  gas: zod.z.string(),
  value: zod.z.string(),
  data: zod.z.string(),
  nonce: zod.z.string(),
  accessList: zod.z.array(zod.z.string())
});
var forgeTransactionSchema = zod.z.object({
  hash: zod.z.string().nullable(),
  transactionType: zod.z.string(),
  contractName: zod.z.string(),
  contractAddress: zod.z.string(),
  function: zod.z.string().nullable(),
  arguments: zod.z.string().nullable(),
  transaction: forgeTransactionDataSchema
});
var forgeDeploymentBroadcastCollectionSchema = zod.z.record(
  zod.z.union([zod.z.number(), zod.z.string()], { description: "chainId" }).transform((t) => parseInt(t)),
  zod.z.object({
    transactions: zod.z.array(forgeTransactionSchema)
  })
);
var deployedHardhatContractsJsonSchema = zod.z.record(
  zod.z.union([zod.z.string(), zod.z.number()], { description: "chainId" }).transform((s) => parseInt(s.toString())),
  zod.z.object({
    name: zod.z.string({ description: "contractName" }),
    chainId: zod.z.string({ description: "chainId" }),
    contracts: zod.z.record(
      zod.z.string({ description: "contractName" }),
      zod.z.object({
        address: zod.z.string(),
        abi: zod.z.array(zod.z.any()).optional()
      })
    )
  }).array()
);

exports.const_blockNumberIntervalLong = const_blockNumberIntervalLong;
exports.const_blockNumberIntervalMedium = const_blockNumberIntervalMedium;
exports.const_blockNumberIntervalShort = const_blockNumberIntervalShort;
exports.const_web3DialogClosedByUser = const_web3DialogClosedByUser;
exports.const_web3DialogUserRejected = const_web3DialogUserRejected;
exports.contractDeploymentMapSchema = contractDeploymentMapSchema;
exports.contractMapWithAbiSchema = contractMapWithAbiSchema;
exports.defaultOverride = defaultOverride;
exports.defaultUpdateOptions = defaultUpdateOptions;
exports.deployedHardhatContractsJsonSchema = deployedHardhatContractsJsonSchema;
exports.externalContractAddressMap = externalContractAddressMap;
exports.forgeDeploymentBroadcastCollectionSchema = forgeDeploymentBroadcastCollectionSchema;
exports.forgeTransactionDataSchema = forgeTransactionDataSchema;
exports.forgeTransactionSchema = forgeTransactionSchema;
exports.keyNamespace = keyNamespace;
//# sourceMappingURL=chunk-SYGGHKPN.js.map