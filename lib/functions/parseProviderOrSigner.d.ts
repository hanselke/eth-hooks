import { TEthersProviderOrSigner } from "../models";
import { TEthersAdaptor } from "../models/ethersAppContextTypes";
export declare const isProvider: (providerOrSigner: TEthersProviderOrSigner | undefined) => boolean;
/**
 * #### Summary
 * Parse {@link TEthersProviderOrSigner} to {@link TEthersUser}
 * Get the TEthersUser from a provider or signer
 *
 * @category Helpers
 *
 * @param providerOrSigner TEthersProviderOrSigner
 * @returns TProviderAndSigner
 */
export declare const parseProviderOrSigner: (providerOrSigner: TEthersProviderOrSigner | undefined) => Promise<Readonly<TEthersAdaptor> | undefined>;
//# sourceMappingURL=parseProviderOrSigner.d.ts.map