import { z, ZodType } from 'zod';
/**
 * #### Summary
 * Describes the basic structure of each contract
 *
 * @category Models
 */
export declare type TBasicContract = {
    contractName: string;
    address: string;
    abi?: Readonly<Record<string, any>[]>;
};
/**
 * #### Summary
 * Describes a basic contract data record.
 * A record of key:chainId.  value:{address, chainId}
 * @category Models
 */
export declare type TBasicContractDeployment = {
    [chainId: number]: {
        chainId: number;
        address: string;
    };
};
/**
 * #### Summary
 * Contracts by contract name
 * - A record key: contractNames, values: {@link TBasicContractDeployment}
 */
export declare type TContractDeploymentMap = {
    [contractName: string]: {
        config: TBasicContractDeployment;
    };
};
/**
 * #### Summary
 * Zod Schema for {@link TContractDeploymentMap}
 */
export declare const contractDeploymentMapSchema: ZodType<TContractDeploymentMap>;
/**
 * #### Summary
 * Contracts by contract name, used by eth-hooks to connect and load contracts
 * - A record of key:{contract names}, values: Hardhat contract json
 * - includes chain id
 */
export declare type TContractMapWithAbi = {
    [contractName: string]: {
        config: TBasicContractDeployment;
        abi: Readonly<Record<string, any>[]>;
    };
};
/**
 * #### Summary
 * Zod Schema for {@link TContractMapWithAbi}
 */
export declare const contractMapWithAbiSchema: ZodType<TContractMapWithAbi>;
/**
 * {chainId: {contract: address}}, contains an record of contracts
 * #### Summary
 * A type for external contracts
 * - it is a record of contract names and their deployed address
 * - this data type is used by {@link ContractsAppContext} to connect to external contracts
 *
 * @category Models
 */
export declare type TExternalContractsAddressMap = z.infer<typeof externalContractAddressMap>;
/**
 * #### Summary
 * Zod Schema for {@link TExternalContractsAddressMap}
 */
export declare const externalContractAddressMap: z.ZodRecord<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber]>, number, string | number>, z.ZodRecord<z.ZodString, z.ZodString>>;
//# sourceMappingURL=contractTypes.d.ts.map