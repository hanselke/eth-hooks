import { BaseContract, Event } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { QueryClient } from 'react-query';
import { TEthersAdaptor, TEthersProviderOrSigner, TypedEvent } from "../models";
export declare type TRequiredKeys = {
    namespace: string;
    key: string;
};
export declare type TKeyTypes = {
    provider?: string;
    adaptor?: string;
    contract?: string;
    contractFunc?: string;
};
/**
 * Get a react-query query key fo ethers provider
 * @param providerOrSigner
 * @returns
 */
export declare const providerKey: (providerOrSigner: TEthersProviderOrSigner | undefined) => Record<'provider' | 'signer', string>;
/**
 * Get a react-query query key
 * @param adaptor
 * @returns
 */
export declare const adaptorKey: (adaptor: TEthersAdaptor | undefined) => Partial<Record<'adaptor' | 'provider', string>>;
/**
 * Get a react-query query key
 * @param m
 * @returns
 */
export declare const eventKey: (m: Event | TypedEvent<Result>) => string;
/**
 * Get a react-query query key
 * @param contract
 * @returns
 */
export declare const contractKey: (contract: BaseContract | undefined) => Partial<Record<'contract' | 'provider', string>>;
/**
 * Get a react-query query key
 * @param contract
 * @param func
 * @returns
 */
export declare const contractFuncKey: (contract: BaseContract | undefined, func: ((...args: any[]) => Promise<any>) | undefined) => Record<'contractFunc', string>;
export declare const invalidateCache: (queryClient: QueryClient, namespace: string, otherKeys?: TKeyTypes & {
    key?: string;
}, variables?: Record<string, any>) => void;
export declare const logQueryCache: (queryClient: QueryClient, namespace: string, otherKeys?: TKeyTypes & {
    key?: string;
}, variables?: Record<string, any>) => void;
//# sourceMappingURL=keyHelpers.d.ts.map