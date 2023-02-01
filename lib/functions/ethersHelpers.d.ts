import { Signer } from 'ethers';
import { IEthersContext, TEthersAdaptor } from "../models";
/**
 * #### Summary
 * Is it a ethers compatable provider, used by {@link EthersModalConnector} and {@link useEthersProvider}
 *
 * @category Helpers
 *
 * @param providerBase
 * @returns
 */
export declare const isEthersProvider: (providerBase: unknown) => boolean;
export declare const signerHasNetwork: (signer: Signer | undefined) => boolean;
export declare const asEthersAdaptor: (ethersContext: IEthersContext) => Readonly<TEthersAdaptor>;
export declare const isValidEthersContext: (ethersContext: IEthersContext | undefined) => boolean;
export declare const isValidEthersAdaptor: (ethersAdaptor: TEthersAdaptor | undefined) => boolean;
export declare const isAdaptorEqual: (adaptor1: TEthersAdaptor | undefined, adaptor2: TEthersAdaptor | undefined) => boolean;
//# sourceMappingURL=ethersHelpers.d.ts.map