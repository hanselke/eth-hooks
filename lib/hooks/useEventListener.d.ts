import { EventFilter, BaseContract } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { THookResult, TUpdateOptions, TypedEvent } from "../models";
/**
 * #### Summary
 * Tracks the events of associated with a contract
 *
 * ##### ✏️ Notes
 * - updates triggered through ethers event listener
 * - uses the current provider {@link ethersProvider} from {@link useEthersContext}
 *
 * @category Hooks
 *
 * @param contract ethers.Contract
 * @param eventName
 * @param startBlock
 * @returns
 */
export declare const useEventListener: <GTypedEvent extends TypedEvent<Result>>(contract: BaseContract | undefined, eventFilter: string | EventFilter | undefined, startBlock: number, toBlock?: number | undefined, options?: TUpdateOptions<GTypedEvent[]>) => THookResult<GTypedEvent[]>;
//# sourceMappingURL=useEventListener.d.ts.map