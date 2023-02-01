import { TEthersProviderOrSigner, THookResult, TUpdateOptions } from "../models";
import { TEthersAdaptor } from "../models/ethersAppContextTypes";
/**
 * #### Summary
 * Gets the user {@link TEthersUser} for a signer or wallet
 *
 * @category Hooks
 *
 * @param providerOrSigner input signer
 * @returns
 */
export declare const useEthersAdaptorFromProviderOrSigners: (providerOrSigner: TEthersProviderOrSigner | undefined, options?: TUpdateOptions) => THookResult<TEthersAdaptor | undefined>;
//# sourceMappingURL=useEthersAdaptorFromProviderOrSigners.d.ts.map