import { TOverride, IEthersContext, TEthersAdaptor, TUpdateOptions } from "../models";
import { DeepPartial } from "../models/utilityTypes";
export declare const ethersOverride: (context: IEthersContext, options: TOverride) => Readonly<TEthersAdaptor>;
/**
 * #### Summary
 * Hook that will verify update options are valid
 *
 * @param update Options for updating to be verified
 */
export declare const checkUpdateOptions: (update: TUpdateOptions) => void;
export declare const mergeDefaultOverride: (...overrides: DeepPartial<TOverride>[]) => TOverride;
export declare const mergeDefaultUpdateOptions: <GResult = any>(...overrides: DeepPartial<TUpdateOptions<GResult>>[]) => TUpdateOptions<GResult>;
export declare const setContextOverride: (adaptor: TEthersAdaptor | undefined, enabled?: boolean) => TOverride;
export declare const processQueryOptions: <GResult>(options: TUpdateOptions<GResult>) => Omit<import("react-query").QueryObserverOptions<GResult, any, GResult, GResult, import("react-query").QueryKey>, "refetchInterval" | "notifyOnChangeProps" | "notifyOnChangePropsExclusions" | "useErrorBoundary" | "refetchOnWindowFocus" | "refetchOnMount" | "refetchOnReconnect"> & {
    refetchOnWindowFocus?: boolean | "always" | undefined;
    refetchOnMount?: boolean | "always" | undefined;
    refetchOnReconnect?: boolean | "always" | undefined;
} & {
    refetchInterval?: number | undefined;
};
//# sourceMappingURL=hookHelpers.d.ts.map