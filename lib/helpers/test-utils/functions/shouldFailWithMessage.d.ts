/**
 * Wrapped around a function to ensure that it fails with the correct message
 * and doesn't pass successfully
 *
 * @param failingFunction Function expect to fail
 * @param errorMessage Error message expect to fail with
 */
export declare const shouldFailWithMessage: (failingFunction: () => Promise<any>, errorMessage: string) => Promise<void>;
//# sourceMappingURL=shouldFailWithMessage.d.ts.map