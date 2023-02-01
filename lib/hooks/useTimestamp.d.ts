import { THookResult, TOverride, TUpdateOptions } from "../models";
/**
 * #### Summary
 * Get the current timestamp from the latest block
 *
 * ##### ✏️ Notes
 * - updates triggered by {@link BlockNumberContext}
 * - uses the current provider {@link ethersProvider} from {@link useEthersContext}
 *
 * @category Hooks
 *
 * @param pollTime
 * @returns
 */
export declare const useTimestamp: (options?: TUpdateOptions, override?: TOverride) => THookResult<number>;
//# sourceMappingURL=useTimestamp.d.ts.map