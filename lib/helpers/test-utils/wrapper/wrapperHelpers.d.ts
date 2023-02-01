import { JsonRpcSigner } from '@ethersproject/providers';
import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { MockProvider } from 'ethereum-waffle';
import { Signer } from 'ethers';
import { MockConnector } from "./MockConnector";
export declare const isActive: (connector: MockConnector) => Promise<boolean>;
export declare const waitForActivation: (callback: () => Promise<boolean>) => Promise<void>;
export declare type THardhatAccountsNames = 'deployer' | 'user1' | 'user2' | 'user3' | 'user4' | 'user5' | 'governance';
export declare type THardhatAccounts = Record<THardhatAccountsNames, SignerWithAddress>;
export declare const getTestAccounts: (provider: MockProvider) => Promise<{
    deployer: string;
    user1: string;
    user2: string;
    user3: string;
    user4: string;
    user5: string;
    governance: string;
}>;
export declare const getTestSigners: (provider: MockProvider) => Promise<{
    deployer: JsonRpcSigner;
    user1: JsonRpcSigner;
    user2: JsonRpcSigner;
    user3: JsonRpcSigner;
    user4: JsonRpcSigner;
    user5: JsonRpcSigner;
    governance: JsonRpcSigner;
}>;
export declare const getHardhatAccount: (provider: MockProvider, hardhatAccountIndex: number) => Promise<string>;
export declare const getHardhatSigner: (provider: MockProvider, hardhatAccountIndex: number) => Promise<Signer>;
//# sourceMappingURL=wrapperHelpers.d.ts.map