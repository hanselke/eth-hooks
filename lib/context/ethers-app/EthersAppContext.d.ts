import { ExternalProvider, JsonRpcFetchFunc } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { FC } from 'react';
import { TEthersProvider } from "../../models";
import { IEthersContext } from "../../models/ethersAppContextTypes";
/**
 * #### Summary
 * This Hook provides you with access to the current Ethers Provider Context.
 * This provider would be the one selected by using {@link EthersModalConnector} and Web3Modal
 *
 * ##### ✨ Features
 * Gives you access to consistent interface to get the current provider information {@link EthersModalConnector}
 * - ethers compatable provider {@link TEthersProvider}
 * - a callback to change the current account (signer)
 * - the current account, chainId and signer
 * - callbacks to open the web3Modal, logout or change theme
 *
 * ##### ✏️ Notes
 * - currently providerKey isnt being used
 *
 * @category EthersAppContext
 *
 * @param contextKey
 * @returns
 */
export declare const useEthersAppContext: (contextKey?: string) => IEthersContext;
/**
 * @deprecated Please use useEthersAppContext instead, this is a shim for backwards compatibility
 * #### Summary
 * This is just a shim around {@link useEthersAppContext} for backwards compatibility.  Will be removed later in a major update.
 *
 * @param contextKey
 * @returns
 */
export declare const useEthersContext: typeof useEthersAppContext;
/**
 * #### Summary
 * Props for context
 *
 * ##### ✏️ Notes
 * - allow you specify alternate web3ReactRoot [See docs](https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#createweb3reactroot).  You must provide both an alternate key and its root.
 * - allows you to use your own QueryClientProvider
 */
export declare type TEthersAppContextProps = {
    children?: React.ReactNode;
    /**
     * Props for context that allow you specify alternate web3ReactRoot [See docs](https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#createweb3reactroot).  You must provide both an alternate key and its root.
     */
    secondaryWeb3ReactRoot?: {
        contextKey: string;
        web3ReactRoot: JSX.Element;
    };
    /**
     * disables the local queryClientRoot and QueryClientProvider for react-query and allows you to use your own
     */
    disableDefaultQueryClientRoot?: boolean;
    /**
     * if you want to pass in your own provider.
     * Make sure it is compatable with ethers.js, see {@link TGetEthersAppProviderLibrary} for details
     */
    customGetEthersAppProviderLibrary?: TGetEthersAppProviderLibrary;
};
export declare type TGetEthersAppProviderLibrary = (provider: TEthersProvider | ExternalProvider | JsonRpcFetchFunc | any, connector?: AbstractConnector) => TEthersProvider;
/**
 * Convert the provider obtained from web3Modal into a ethers.web3provider
 *
 * @internal
 *
 * @param provider Should be either {@link TEthersProvider} or a {@link ExternalProvider} or {@link JsonRpcFetchFunc},
 * @param _connector
 * @returns
 */
export declare const getEthersAppProviderLibrary: TGetEthersAppProviderLibrary;
/**
 * #### Summary
 * Ethers App Context for your react app to be used with {@link useEthersAppContext}.
 * This is a wrapper around Web3ReactProvider that provides additional functionality such as a {@link BlockNumberContext} and access to {@link IEthersContext}.  See {@link TEthersAppContextProps} for more information on props for alternate context roots.
 *
 * @category EthersAppContext
 *
 * @param props {@link TEthersAppContextProps}
 * @returns
 */
export declare const EthersAppContext: FC<TEthersAppContextProps>;
//# sourceMappingURL=EthersAppContext.d.ts.map