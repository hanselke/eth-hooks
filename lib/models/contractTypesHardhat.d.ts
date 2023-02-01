import { z } from 'zod';
/**
 * #### Summary
 * Describes the structure of hardhat_contracts.json
 * - {chainIds: { networkNames: {contracts} }}, contains an record of contracts
 * - Used by {@link useContractLoader}
 *
 * @category Models
 */
export declare type TDeployedHardhatContractsJson = z.infer<typeof deployedHardhatContractsJsonSchema>;
/**
 * #### Summary
 * Zod Schema for {@link TBasicContractMap}
 */
export declare const deployedHardhatContractsJsonSchema: z.ZodRecord<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber]>, number, string | number>, z.ZodArray<z.ZodObject<{
    name: z.ZodString;
    chainId: z.ZodString;
    contracts: z.ZodRecord<z.ZodString, z.ZodObject<{
        address: z.ZodString;
        abi: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    }, "strip", z.ZodTypeAny, {
        abi?: any[] | undefined;
        address: string;
    }, {
        abi?: any[] | undefined;
        address: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    contracts: Record<string, {
        abi?: any[] | undefined;
        address: string;
    }>;
    chainId: string;
    name: string;
}, {
    contracts: Record<string, {
        abi?: any[] | undefined;
        address: string;
    }>;
    chainId: string;
    name: string;
}>, "many">>;
//# sourceMappingURL=contractTypesHardhat.d.ts.map