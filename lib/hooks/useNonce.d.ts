import { THookResult, TOverride, TUpdateOptions } from "../models";
/**
 * #### Summary
 * Get the current nonce for the address provided
 *
 * ##### ✏️ Notes
 * - updates triggered by {@link BlockNumberContext}
 * - uses the current provider {@link ethersProvider} from {@link useEthersContext}
 *
 * @category Hooks
 *
 * @param address
 * @returns
 */
export declare const useNonce: (address: string | undefined, options?: TUpdateOptions, override?: TOverride) => THookResult<number>;
//# sourceMappingURL=useNonce.d.ts.map