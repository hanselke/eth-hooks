import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorUpdate } from '@web3-react/types';
import { MockProvider } from 'ethereum-waffle';
import { Signer } from 'ethers';
import sinon from 'ts-sinon';
import { ThemeColors } from 'web3modal';
import { ICommonModalConnector } from "../../../context";
import { TEthersProvider } from "../../../models";
export declare class MockConnector extends AbstractConnector implements ICommonModalConnector {
    protected provider: MockProvider;
    protected mockChainId: number;
    protected mockSigner: Signer | undefined;
    protected mockAccount: string | undefined;
    spyResetModal: this["resetModal"] extends (...args: infer TArgs) => infer TReturnValue ? sinon.SinonStub<TArgs, TReturnValue> : sinon.SinonStub<any[], any>;
    spySetModalTheme: this["setModalTheme"] extends (...args: infer TArgs) => infer TReturnValue ? sinon.SinonStub<TArgs, TReturnValue> : sinon.SinonStub<any[], any>;
    spyChangeSigner: this["changeSigner"] extends (...args: infer TArgs) => infer TReturnValue ? sinon.SinonStub<TArgs, TReturnValue> : sinon.SinonStub<any[], any>;
    spyActivate: sinon.SinonStub<any[], any>;
    spyDeactivate: sinon.SinonStub<any[], any>;
    constructor(provider: MockProvider);
    loadWeb3Modal(): void;
    replaceWithSpies(): void;
    hasCachedProvider(): boolean;
    getSigner(): Signer | undefined;
    setModalTheme(_theme: ('light' | 'dark') | ThemeColors): void;
    resetModal(): void;
    changeSigner(_signer: Signer): Promise<void>;
    private providerPromise;
    activate: () => Promise<ConnectorUpdate>;
    getProvider: () => Promise<MockProvider | TEthersProvider>;
    getChainId: () => Promise<number>;
    getAccount(): Promise<string>;
    setMockAccount(hardhatAccountIndex: number): Promise<string>;
    deactivate(): void;
}
//# sourceMappingURL=MockConnector.d.ts.map