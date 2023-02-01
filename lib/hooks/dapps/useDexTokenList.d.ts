import { TokenInfo } from '@uniswap/token-lists';
import { THookResult, TUpdateOptions } from "../../models";
/**
 * #### Summary
 * Gets a tokenlist from uniswap ipfs tokenlist
 *
 * ##### ✏️ Notes
 * - you can also point it to another URI
 *
 * @category Hooks
 *
 * @param tokenListUri
 * @param chainId optional, you can filter by a particular chainId
 * @returns (TokenInfo[]) from '@uniswap/token-lists'
 */
export declare const useDexTokenList: (tokenListUri?: string, chainId?: number, options?: TUpdateOptions) => THookResult<TokenInfo[]>;
//# sourceMappingURL=useDexTokenList.d.ts.map