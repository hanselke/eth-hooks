import { TContractConnectorBase, TContractConnector, TContractConnectFunc, TExternalContractsAddressMap, TBasicContractDeployment, TDeployedHardhatContractsJson, TForgeDeploymentBroadcastCollection, TBaseContractExtended } from "../../models";
/**
 * ##### Summary
 * Creates a connector for any of your hardhat contracts
 *
 * @category ContractAppContext
 * @param contractName
 * @param typechainFactory
 * @param deployedHardhatContractJson
 * @returns
 */
export declare const createConnectorForHardhatContract: <GContractNames extends string, GBaseContract extends TBaseContractExtended<GContractNames>>(contractName: GContractNames, typechainFactory: Readonly<{
    connect: TContractConnectFunc<GBaseContract>;
    abi: readonly Record<string, any>[];
}>, deployedHardhatContractJson: TDeployedHardhatContractsJson) => Readonly<{
    contractName: GContractNames;
    config: TBasicContractDeployment;
} & Readonly<{
    connect: TContractConnectFunc<GBaseContract>;
    abi: readonly Record<string, any>[];
}>>;
/**
 * ##### Summary
 * Creates a connector for any of your Foundry contracts, deployed forge scripts and forge broadcast output
 *
 * @category ContractAppContext
 * @param contractName
 * @param typechainFactory
 * @param forgeBroadcastJson
 * @returns
 */
export declare const createConnectorForFoundryContract: <GContractNames extends string, GBaseContract extends TBaseContractExtended<GContractNames>>(contractName: GContractNames, typechainFactory: Readonly<{
    connect: TContractConnectFunc<GBaseContract>;
    abi: readonly Record<string, any>[];
}>, forgeBroadcastJson: TForgeDeploymentBroadcastCollection) => Readonly<{
    contractName: GContractNames;
    config: TBasicContractDeployment;
} & Readonly<{
    connect: TContractConnectFunc<GBaseContract>;
    abi: readonly Record<string, any>[];
}>>;
/**
 * #### Summary
 * Creates a contract connector for any external contract
 *
 * ##### ✏️ Notes
 * - As an example you could use this for an external contract such as DAI
 *
 * @category ContractAppContext
 * @param contractName
 * @param typechainFactory
 * @param deployedContractJson
 * @returns
 */
export declare const createConnectorForExternalContract: <GContractNames extends string, GBaseContract extends TBaseContractExtended<GContractNames>>(contractName: GContractNames, typechainFactory: Readonly<{
    connect: TContractConnectFunc<GBaseContract>;
    abi: readonly Record<string, any>[];
}>, deployedContractJson: TExternalContractsAddressMap) => Readonly<{
    contractName: GContractNames;
    config: TBasicContractDeployment;
} & Readonly<{
    connect: TContractConnectFunc<GBaseContract>;
    abi: readonly Record<string, any>[];
}>>;
/**
 * #### Summary
 * Create a contract connector from a ABI.
 *
 * ##### ✏️ Notes
 * - This can be used for unverified external contracts
 *
 * @category ContractAppContext
 * @param contractName
 * @param config
 * @param abi
 * @param connectFunc
 * @returns
 */
export declare const createConnectorForExternalAbi: <GContractNames extends string, GBaseContractExtended extends TBaseContractExtended<GContractNames> = TBaseContractExtended<GContractNames>>(contractName: GContractNames, config: {
    [chainId: number]: {
        address: string;
    };
}, abi: Record<string, any>[], connectFunc?: TContractConnectFunc<GBaseContractExtended> | undefined) => Readonly<{
    contractName: GContractNames;
    config: TBasicContractDeployment;
} & Readonly<{
    connect: TContractConnectFunc<GBaseContractExtended>;
    abi: readonly Record<string, any>[];
}>>;
//# sourceMappingURL=contractConnectors.d.ts.map