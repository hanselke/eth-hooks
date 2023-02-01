import { TUpdateOptions } from "../models";
/**
 * #### Summary
 * A hook that invokes an update callback function based on update options and ethers network state (i.e. block number)
 *
 * @param update Function to call when update
 * @param blockNumber Current block number
 * @param options Options for how often and when to update
 * @param allowBlockNumberUpdate Boolean of if updating using this hook is allowed
 */
export declare const useEthersUpdater: (update: (() => void) | (() => Promise<void>), blockNumber: number | undefined, options: TUpdateOptions, allowBlockNumberUpdate?: boolean) => void;
//# sourceMappingURL=useEthersUpdater.d.ts.map