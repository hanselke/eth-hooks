import { BigNumber } from 'ethers';
import { THookResult, TOverride, TUpdateOptions } from "../models";
/**
 * @internal
 * #### Summary
 * A conditional type for useBalance result based on input parameters.  It is either a BigNumber or a Record<string, BigNumber> depending on the input addres being a string or string[]
 */
declare type TUseBalanceResult<GAddress extends string | string[]> = GAddress extends string[] ? Record<string, BigNumber> : BigNumber;
/**
 * #### Summary
 * Gets your balance in ETH for the given address.
 *
 * ##### ✏️ Notes
 * - updates triggered by {@link BlockNumberContext}
 * - uses the current provider {@link provider} from {@link useEthersContext}
 *
 * @category Hooks
 *
 * @param addresses Addresses of wallets to get balance for
 * @param override Options to override adapters and context
 * @param options Options for how often and when to update
 * @returns current balance
 */
export declare const useBalance: <GAddress extends string | string[]>(addresses: GAddress | undefined, options?: TUpdateOptions, override?: TOverride) => THookResult<TUseBalanceResult<GAddress>>;
export {};
//# sourceMappingURL=useBalance.d.ts.map