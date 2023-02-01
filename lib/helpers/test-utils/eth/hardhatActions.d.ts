import { MockProvider } from 'ethereum-waffle';
export declare const mineBlock: (mockProvider: MockProvider) => Promise<void>;
export declare const setAutoMine: (mockProvider: MockProvider, enabled: boolean) => Promise<void>;
/**
 * #### Summary
 * mine block until the a condition is met or a maximumNumberOfBlocks is reached
 * @param mockProvider
 * @param untilCondition
 * @param maxNumberOfBlocks
 * @returns [success, currentBlockNumber]
 */
export declare const mineBlockUntil: (mockProvider: MockProvider, maxNumberOfBlocks: number, untilCondition: ((currentBlockNumber: number) => Promise<boolean>) | ((currentBlockNumber: number) => boolean) | ((currentBlockNumber: number) => Promise<void>)) => Promise<[success: boolean, currentBlockNumber: number]>;
//# sourceMappingURL=hardhatActions.d.ts.map