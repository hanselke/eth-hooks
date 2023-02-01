import { BaseContract } from 'ethers';
import { THookResult, TUpdateOptions } from "../models";
/**
 * #### Summary
 * Checks whether a contract exists on the blockchain
 *
 * ##### ✏️ Notes
 * - uses the ethers.Contract object's provider to access the network
 * - checks the contract address to see if the contract is deployed
 *
 * @category Hooks
 *
 * @param contract ethers.BaseContract class
 * @returns
 */
export declare const useContractExistsAtAddress: <GContract extends BaseContract>(contract: GContract | undefined, options?: TUpdateOptions<boolean>) => THookResult<boolean>;
//# sourceMappingURL=useContractExistsAtAddress.d.ts.map