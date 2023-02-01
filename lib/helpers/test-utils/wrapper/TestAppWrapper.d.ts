import React, { FC } from 'react';
import { TCreateEthersModalConnector } from "../../../models/ethersAppContextTypes";
interface IMockProps {
    children?: React.ReactNode;
    createMockConnector: TCreateEthersModalConnector;
    contractContext?: FC;
}
/**
 * This is a wrapper for tests
 * @param props
 * @returns
 */
export declare const TestAppWrapper: FC<IMockProps>;
export {};
//# sourceMappingURL=TestAppWrapper.d.ts.map