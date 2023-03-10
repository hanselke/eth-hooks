/**
 * #### Summary
 * Similar to [partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) int typescript but allows deep partial types.
 *
 * @category Models
 */
export declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
//# sourceMappingURL=utilityTypes.d.ts.map