import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { IAbstractConnectorOptions } from 'web3modal';
/**
 * #### Summary
 * A web3modal CustomProvider Options
 * - Options for web3modal that allows you to connect to a StaticJsonRpcProvider such as localhost
 *
 * @category EthersAppContext
 */
export interface IStaticJsonRpcProviderConnectorOptions extends IAbstractConnectorOptions {
    rpc: {
        [chainId: number]: string;
    };
    currentChainId: number;
}
/**
 * #### Summary
 * A connector that can be used by apps to connect to a StaticJsonRpcProvider
 * - For example you can use this to connect to a localhost provider
 *
 * ##### ✏️ Notes
 * See scaffold-eth-typescript for an example that uses it to connect to a localhost burner wallet.
 * - [scaffold-eth-typescript example](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/next/packages/vite-app-ts/src/config/web3ModalConfig.ts#L86)
 *
 * @category EthersAppContext
 *
 * @param _package not used
 * @param opts
 * @returns
 */
export declare const ConnectToStaticJsonRpcProvider: (_package: unknown, opts: IStaticJsonRpcProviderConnectorOptions) => Promise<StaticJsonRpcProvider | undefined>;
//# sourceMappingURL=StaticJsonRpcProviderConnector.d.ts.map