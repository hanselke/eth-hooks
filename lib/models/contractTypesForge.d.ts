import { z, ZodType } from 'zod';
export declare type TForgeTransactionData = z.infer<typeof forgeTransactionDataSchema>;
export declare const forgeTransactionDataSchema: z.ZodObject<{
    type: z.ZodString;
    from: z.ZodString;
    gas: z.ZodString;
    value: z.ZodString;
    data: z.ZodString;
    nonce: z.ZodString;
    accessList: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    value: string;
    data: string;
    type: string;
    from: string;
    nonce: string;
    accessList: string[];
    gas: string;
}, {
    value: string;
    data: string;
    type: string;
    from: string;
    nonce: string;
    accessList: string[];
    gas: string;
}>;
export declare type TForgeTransaction = {
    hash: string | null;
    transactionType: 'CREATE' | Omit<string, 'CREATE'>;
    contractName: string;
    contractAddress: string;
    function: string | null;
    arguments: string | null;
    transaction: TForgeTransactionData;
};
export declare const forgeTransactionSchema: ZodType<TForgeTransaction>;
export declare type TForgeBroadcastJson = {
    transactions: TForgeTransaction[];
};
export declare type TForgeDeploymentBroadcastCollection = {
    [chainId: number]: TForgeBroadcastJson;
};
export declare const forgeDeploymentBroadcastCollectionSchema: ZodType<TForgeDeploymentBroadcastCollection>;
//# sourceMappingURL=contractTypesForge.d.ts.map