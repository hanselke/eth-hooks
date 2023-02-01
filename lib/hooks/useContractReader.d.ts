import { BaseContract, EventFilter } from 'ethers';
import { THookResult, TUpdateOptions } from "../models";
/**
 * #### Summary
 * Enables you to call a contract function with arguments and receive the output.  You can use this to easily track of contract outputs in react states
 *
 * ##### ✏️ Notes
 * - uses the ethers.Contract object's provider to access the network
 * - formatter is a function that can change the format of the output
 * @param contract Contract reading from
 * @param contractFunc Contract variable or function to read
 * @param args Typed tuple argument to contract function or variable
 * @param funcEventFilter Optional if only want contract to update on event
 * @param options Options for how often and when to update
 * @returns
 */
export declare const useContractReader: <GContract extends BaseContract, GContractFunc extends (...args: any[]) => Promise<any>>(contract: GContract | undefined, contractFunc: GContractFunc | undefined, args?: Parameters<GContractFunc> | undefined, funcEventFilter?: EventFilter | undefined, options?: TUpdateOptions) => THookResult<Awaited<ReturnType<GContractFunc>> | undefined>;
//# sourceMappingURL=useContractReader.d.ts.map