import { z } from 'zod';

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
var contractDeploymentMapSchema = z.record(
  z.string({ description: "contractName" }),
  z.object({
    config: z.record(
      z.number({ description: "chainId" }),
      z.object({
        address: z.string(),
        chainId: z.number()
      })
    )
  })
);
var contractMapWithAbiSchema = z.record(
  z.string({ description: "contractName" }),
  z.object({
    config: z.record(
      z.number({ description: "chainId" }),
      z.object({
        address: z.string(),
        chainId: z.number()
      })
    ),
    abi: z.array(z.any())
  })
);
var externalContractAddressMap = z.record(
  z.union([z.string({ description: "chainId" }), z.number({ description: "chainId" })]).transform((s) => parseInt(s.toString())),
  z.record(z.string({ description: "contractName" }), z.string({ description: "address" }))
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
var forgeTransactionDataSchema = z.object({
  type: z.string(),
  from: z.string(),
  gas: z.string(),
  value: z.string(),
  data: z.string(),
  nonce: z.string(),
  accessList: z.array(z.string())
});
var forgeTransactionSchema = z.object({
  hash: z.string().nullable(),
  transactionType: z.string(),
  contractName: z.string(),
  contractAddress: z.string(),
  function: z.string().nullable(),
  arguments: z.string().nullable(),
  transaction: forgeTransactionDataSchema
});
var forgeDeploymentBroadcastCollectionSchema = z.record(
  z.union([z.number(), z.string()], { description: "chainId" }).transform((t) => parseInt(t)),
  z.object({
    transactions: z.array(forgeTransactionSchema)
  })
);
var deployedHardhatContractsJsonSchema = z.record(
  z.union([z.string(), z.number()], { description: "chainId" }).transform((s) => parseInt(s.toString())),
  z.object({
    name: z.string({ description: "contractName" }),
    chainId: z.string({ description: "chainId" }),
    contracts: z.record(
      z.string({ description: "contractName" }),
      z.object({
        address: z.string(),
        abi: z.array(z.any()).optional()
      })
    )
  }).array()
);

export { const_blockNumberIntervalLong, const_blockNumberIntervalMedium, const_blockNumberIntervalShort, const_web3DialogClosedByUser, const_web3DialogUserRejected, contractDeploymentMapSchema, contractMapWithAbiSchema, defaultOverride, defaultUpdateOptions, deployedHardhatContractsJsonSchema, externalContractAddressMap, forgeDeploymentBroadcastCollectionSchema, forgeTransactionDataSchema, forgeTransactionSchema, keyNamespace };
//# sourceMappingURL=chunk-NGVXFKGX.mjs.map