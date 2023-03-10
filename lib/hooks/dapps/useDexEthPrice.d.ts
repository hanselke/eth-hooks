import { THookResult, TNetworkInfo, TUpdateOptions } from "../../models";
import { TEthersProvider } from "../../models/providerTypes";
/**
 * #### Summary
 * Get the Exchange price of ETH/USD (extrapolated from WETH/DAI) from uniswap
 *
 * ##### ✏️ Notes
 * - uses useOnRepetition, does not use context
 *
 * @category Hooks
 *
 * @param mainnetProvider
 * @param targetNetworkInfo
 * @param pollTime if >0 use polling, else use instead of onBlock event
 * @returns price in USD
 */
export declare const useDexEthPrice: (mainnetProvider: TEthersProvider | undefined, targetNetworkInfo?: TNetworkInfo, options?: TUpdateOptions) => THookResult<number>;
//# sourceMappingURL=useDexEthPrice.d.ts.map