export declare type TExpectExpression = (() => Promise<void>) | (() => void);
export declare const sleep: (ms: number) => Promise<void>;
export declare const waitForCondition: (untilCondition: (() => Promise<boolean>) | (() => boolean), { timeout, interval }: {
    timeout?: number | undefined;
    interval?: number | undefined;
}) => Promise<void>;
export declare const waitForExpect: (expectExpression: TExpectExpression, { timeout, interval }: {
    timeout?: number | undefined;
    interval?: number | undefined;
}) => Promise<void>;
//# sourceMappingURL=mochaHelpers.d.ts.map