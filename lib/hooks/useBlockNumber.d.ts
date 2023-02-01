import { TEthersProvider, THookResult, TUpdateOptions } from "../models";
/**
 * #### Summary
 * Get the current block number of the network. ✋🏽 @deprecated
 *
 * ##### ✏️ Notes
 * - ✋🏽 For app wide block number access use {@link useBlockNumberContext} instead.  See {@link BlockNumberContext} for more details, you get this as part of {@link EthersAppContext}
 * - uses the current provided block number
 *
 * @category Hooks
 *
 * @param provider
 * @returns block number
 */
export declare const useBlockNumber: (provider: TEthersProvider | undefined, callback?: ((blockNumber?: number) => void) | ((blockNumber?: number) => Promise<void>) | undefined, options?: TUpdateOptions) => THookResult<number>;
//# sourceMappingURL=useBlockNumber.d.ts.map