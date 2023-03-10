import { BytesLike, Signer } from 'ethers';
import { TEthersProvider } from "../models";
/**
 * #### Summary
 * Return type of useBurnerSigner:
 *
 * ##### ✏️ Notes
 * - provides signer
 * - methods of interacting with burner signer
 * - methods to save and loadd signer from local storage
 *
 * @category Hooks
 */
export declare type TBurnerSigner = {
    signer: Signer | undefined;
    account: string | undefined;
    /**
     * save to local storage
     */
    saveBurner: () => void;
    /**
     * load from local storage, or if it doesn't exist, create
     */
    loadOrGenerateBurner: () => void;
    /**
     * create a new burner signer
     */
    generateBurnerSigner: () => void;
    /**
     * get your current burner pk
     */
    getBurnerPrivateKey: () => BytesLike | undefined;
};
/**
 * #### Summary
 * A hook that creates a burner signer/address and provides ways of interacting with
 * and updating the signer
 *
 * @category Hooks
 *
 * @param localProvider localhost provider
 * @returns IBurnerSigner
 */
export declare const useBurnerSigner: (localProvider: TEthersProvider | undefined) => TBurnerSigner;
//# sourceMappingURL=useBurnerSigner.d.ts.map