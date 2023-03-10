import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorUpdate } from '@web3-react/types';
import { Signer } from 'ethers';
import { ICoreOptions, ThemeColors } from 'web3modal';
import { Web3Modal } from "../../../helpers/esm-fixtures/web3modal";
import { TEthersProvider } from "../../../models";
declare type TEthersModalConfig = {
    /**
     * when network (chain) or provider changes reload the page
     */
    reloadOnNetworkChange: boolean;
    /**
     * #### Summary
     * ethers.io recomments an immutable provider, and by default doesn't allow
     * network changes (i.e.) metamask changing chains.
     * - if immutableProvider is true, it will follow the default behaviour
     * - if immutableProvider is false, it will allow network changes
     *
     * ##### ✏️ Notes
     * see https://github.com/ethers-io/ethers.js/discussions/1480
     */
    immutableProvider: boolean;
};
declare type TWeb3ModalTheme = 'light' | 'dark';
/**
 * #### Summary
 * An interface implemented by {@link EthersModalConnector} in addition to AbstractConnector
 */
export interface ICommonModalConnector {
    setModalTheme(theme: TWeb3ModalTheme | ThemeColors): void;
    resetModal(): void;
    hasCachedProvider(): boolean;
    loadWeb3Modal: () => void;
    getSigner: () => Signer | undefined;
    changeSigner(signer: Signer): Promise<void>;
}
export declare type TEthersModalConnector = ICommonModalConnector & AbstractConnector;
/**
 * #### Summary
 * This is a connector for [web3-react](https://github.com/NoahZinsmeister/web3-react) that allows it to interface with [web3Modal](https://github.com/Web3Modal/web3modal).
 * The provider selected by user via web3modal is interfaced to the web3-react context.
 *
 * ##### ✨ Features
 * - This connector used with {@link useEthersContext} allows the app and all the hooks to effortlessly access the current network, provider, signer, address information {@link IEthersContext}
 * - The connector centralizes and takes care of management of the web3 interaction and provides a consistent exprience for your app.
 *
 * ##### ✏️ Notes
 * - inherits from web3-react class AbstractConnector
 *
 * @category EthersAppContext
 */
export declare class EthersModalConnector extends AbstractConnector implements ICommonModalConnector {
    protected _options: Partial<ICoreOptions>;
    protected _providerBase?: any;
    protected _ethersProvider?: TEthersProvider;
    protected _web3Modal?: typeof Web3Modal;
    protected _id: string | undefined;
    protected _debug: boolean;
    protected _config: Readonly<TEthersModalConfig>;
    protected _signer: Signer | undefined;
    protected _theme: TWeb3ModalTheme | ThemeColors;
    static isModalOpening: boolean;
    get config(): Readonly<TEthersModalConfig>;
    hasCachedProvider(): boolean;
    /**
     * @param web3modalOptions see [web3modal docs](https://github.com/Web3Modal/web3modal#provider-options) for details.  You can also check the [scaffold-eth-typescript web3config](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/next/packages/vite-app-ts/src/config/web3ModalConfig.ts) for an example.
     * @param config Configuration for EthersModalConnector
     * @param id allows you to connect directly to a specific provider.  [See docs](https://github.com/Web3Modal/web3modal#connect-to-specific-provider)
     * @param debug turn on debug logging
     */
    constructor(web3modalOptions: Partial<ICoreOptions>, config?: TEthersModalConfig, id?: string, debug?: boolean);
    protected log(...args: any[]): void;
    private maybeReload;
    private setEthersProvider;
    private handleChainChanged;
    private handleAccountsChanged;
    private handleDisconnect;
    private handleClose;
    loadWeb3Modal(): void;
    /**
     * #### Summary
     * Inherits from AbstractConnector.  This activates web3Modal and opens the modal.
     *
     * ##### ✏️ Notes
     * Once the user selects a provider
     * - this will activate the provider and attach the appropriate event listeners.
     * - get the account and signer
     * - gets the ethers compatable provider
     *
     * ##### ⚠️ Errors
     * - {@link UserClosedModalError}
     * - {@link CouldNotActivateError}
     * @returns
     */
    activate(): Promise<ConnectorUpdate>;
    private isEthersProvider;
    /**
     * #### Summary
     * Safely deactivates the current provider and removes all event listeners
     */
    deactivate(): void;
    getProvider(): Promise<TEthersProvider | undefined>;
    getChainId(): Promise<number | string>;
    private setSignerFromAccount;
    getAccount(): Promise<null | string>;
    getSigner(): Signer | undefined;
    getSignerFromAccount(): Promise<void>;
    /**
     * #### Summary
     * Change the current signer and account used by the connector
     * @param signer
     */
    changeSigner(signer: Signer): Promise<void>;
    protected validState(): boolean;
    /**
     * #### Summary
     * Resets the web3Modal and clears the cache
     */
    resetModal(): void;
    /**
     * #### Summary
     * Sets the web3modal theme: light | dark | ThemeColors
     * @param theme
     */
    setModalTheme(theme: TWeb3ModalTheme | ThemeColors): void;
    checkValidCachedProvider(): boolean;
}
export {};
//# sourceMappingURL=EthersModalConnector.d.ts.map