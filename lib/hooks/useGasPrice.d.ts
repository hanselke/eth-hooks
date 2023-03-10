import { TOverride, TNetworkInfo, TUpdateOptions, THookResult } from "../models";
/**
 * Preset speeds for Eth Gas Station API
    - fast: Recommended fast(expected to be mined in < 2 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
    - fastest: Recommended fastest(expected to be mined in < 30 seconds) gas price in x10 Gwei(divite by 10 to convert it to gwei)
    - safeLow: Recommended safe(expected to be mined in < 30 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)
    - average: Recommended average(expected to be mined in < 5 minutes) gas price in x10 Gwei(divite by 10 to convert it to gwei)

    @category Hooks
 */
export declare type TGasStationSpeed = 'fast' | 'fastest' | 'safeLow' | 'average';
/**
 * #### Summary
 * Gets the gas price for the current network as gwei
 * - uses EthGasStation for mainnet
 * - uses ethers.estimateGas other networks
 * - can use currentNetworkInfo {@link TNetworkInfo.gasPrice} gasPrice as fallback
 *
 * ##### ✏️ Notes
 * - if the gas price is unknown it returns undefined
 * - updates triggered by {@link BlockNumberContext}
 * - uses the current provider {@link ethersProvider} from {@link useEthersContext}
 *
 * @category Hooks
 *
 * @param speed
 * @param currentNetworkInfo uses gasPrice as a fallback
 * @returns gas as gwei
 */
export declare const useGasPrice: (chainId: number | undefined, speed: TGasStationSpeed, currentNetworkInfo?: TNetworkInfo, options?: TUpdateOptions, override?: TOverride) => THookResult<number | undefined>;
//# sourceMappingURL=useGasPrice.d.ts.map