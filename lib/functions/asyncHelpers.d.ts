/**
 * #### Summary
 * js .some function that can be used with async predicates
 *
 * @category Helpers
 *
 * @param arr
 * @param predicate
 * @returns
 */
export declare const asyncSome: <T>(arr: T[], predicate: (item: T) => Promise<boolean>) => Promise<T | undefined>;
export declare const asyncForEach: <T>(array: T[], callback: (item: T, index: number) => Promise<void>) => Promise<void>;
//# sourceMappingURL=asyncHelpers.d.ts.map