import { BigNumber } from '@ethersproject/bignumber';
import { BaseContract } from '@ethersproject/contracts';
import { THookResult, TUpdateOptions } from "../../models";
declare type ERC20 = {
    balanceOf: (address: string) => Promise<BigNumber>;
};
/**
 * #### Summary
 * Get the balance of an ERC20 token in an address
 *
 * ##### ✏️ Notes
 * - uses the ethers.Contract object's provider to access the network
 *
 * @category Hooks
 *
 * @param contract ERC20 token to get the balance of
 * @param address Address of wallet that holds the tokens
 * @param options Options for how often and when to update
 * @returns
 */
export declare const useTokenBalance: <GContract extends BaseContract & ERC20>(contract: GContract, address: string, options?: TUpdateOptions) => THookResult<BigNumber>;
export {};
//# sourceMappingURL=useTokenBalance.d.ts.map