export declare const connectorErrorText: {
    readonly NoStaticJsonRPCProviderFoundError: "Could not find a static json-rpc provider.  Is it running?";
    readonly NoEthereumProviderFoundError: "No web3 provider found";
    readonly CouldNotActivateError: "Could not activate the web3 provider";
    readonly UserClosedModalError: "Did not log in, the user did not select a web3 provider";
};
/**
 * @category EthersAppContext
 */
export declare class UserClosedModalError extends Error {
    constructor();
}
/**
 * @category EthersAppContext
 */
export declare class CouldNotActivateError extends Error {
    constructor(error: unknown);
}
/**
 * @category EthersAppContext
 */
export declare class NoEthereumProviderFoundError extends Error {
    constructor();
}
/**
 * @category EthersAppContext
 */
export declare class NoStaticJsonRPCProviderFoundError extends Error {
    constructor(error: unknown);
}
//# sourceMappingURL=connectorErrors.d.ts.map