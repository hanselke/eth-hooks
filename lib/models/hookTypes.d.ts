import { QueryObserverOptions, QueryStatus } from 'react-query';
import { TEthersAdaptor } from './ethersAppContextTypes';
import { DeepPartial } from "./utilityTypes";
/**
 * #### Summary
 * An constant for block number interval of 10 blocks
 */
export declare const const_blockNumberIntervalShort: DeepPartial<TUpdateOptions>;
/**
 * #### Summary
 * An constant for block number interval of 50 blocks
 */
export declare const const_blockNumberIntervalMedium: DeepPartial<TUpdateOptions>;
/**
 * #### Summary
 * An constant for block number interval of 250 blocks
 */
export declare const const_blockNumberIntervalLong: DeepPartial<TUpdateOptions>;
export declare type TQueryOptions<GResult> = Omit<QueryObserverOptions<GResult, any>, 'refetchInterval' | 'notifyOnChangeProps' | 'notifyOnChangePropsExclusions' | 'useErrorBoundary' | 'refetchOnWindowFocus' | 'refetchOnMount' | 'refetchOnReconnect'> & {
    refetchOnWindowFocus?: boolean | 'always';
    refetchOnMount?: boolean | 'always';
    refetchOnReconnect?: boolean | 'always';
};
/**
 * #### Summary
 * Options for hooks that describe the behviour of updates.
 * By default, depending on the hook, it will update every block.
 *
 * ##### ✏️ Notes
 * The following options are available:
 * - interval: interval in blocknumber to update in (default 1) see {@link TUpdateOptions.blockNumberInterval}
 * - polling: in ms, should be over 10000ms.  This is set by {@link TUpdateOptions.query.refetchInterval}
 */
export declare type TUpdateOptions<GResult = any> = {
    /**
     * The interval in blocknumber for the hook to update in (default 1)
     */
    blockNumberInterval: number | undefined;
    refetchInterval?: number;
    query?: TQueryOptions<GResult>;
};
/**
 * #### Summary
 * Ethers Provider options.  By default, the context provider is used by the hook.  If you want to use a different provider, you can:
 * - pass in an {@link TEthersAdaptor} to override the provider
 * - give the alternateContextKey for a secondary context provider.
 *
 * ##### ✏️ Notes
 * Adaptor
 * - To create a adaptor from a provider/signer see {@link useGetEthersAdaptorFromSignerOrProvider}
 * - You need to set adaptorEnabled to true
 *
 * Alternate Context Key
 * - For more info on alternateContextKey, see {@link TEthersAppContextProps} and [web3-react docs](https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#createweb3reactroot).
 */
export declare type TOverride = {
    /**
     * An enable override adaptor (ethers provider) for this hook
     */
    adaptorEnabled: boolean;
    /**
     * The alternate adaptor to use.  See {@link TEthersAdaptor}
     */
    adaptor: TEthersAdaptor | undefined;
    /**
     * The alternate context key to use.  See {@link TEthersAppContextProps}
     */
    alternateContextKey?: string;
};
/**
 * An helper to create the default override settings for hooks
 * @returns {TOverride}
 */
export declare const defaultOverride: () => TOverride;
/**
 * A helper to create default update options for hooks
 * @returns {TUpdateOptions}
 */
export declare const defaultUpdateOptions: <GResult = any>() => TUpdateOptions<GResult>;
/**
 * #### Summary
 * This type describes the tuple that is returned by most hooks
 * 1. result: the result of the hook
 * 2. update: a callback will refresh the results of hook manually
 * 3. status: the status of the query.  From react-query: 'idle' | 'loading' | 'error' | 'success'. You can use this for UX purposes, see {@link QueryStatus}.
 */
export declare type THookResult<T> = [result: T, update: () => void, status: QueryStatus];
//# sourceMappingURL=hookTypes.d.ts.map