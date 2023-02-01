import { TOverride } from "../../models";
/**
 * #### Summary
 * A hook that gets you the current blocknumber and saves it to the store
 * - can be shared by your whole app.
 *
 * ##### ❔Use
 * Make sure to wrap your main app with the {@link EthersAppContext}.
 * - See [scaffold-eth-typescript example](https://github.com/scaffold-eth/scaffold-eth-typescript/blob/next/packages/vite-app-ts/src/components/routes/App.tsx#L38)
 *
 *
 * ##### ✏️ Notes
 * - this extensively used by eth-hooks to trigger hooks when a new block arrives
 * - uses the current provider {@link ethersProvider} from {@link useEthersContext}
 *
 * @category EthersAppContext
 *
 * @returns current block number
 */
export declare const useBlockNumberContext: (chainId?: number, override?: TOverride) => number;
//# sourceMappingURL=useBlockNumberContext.d.ts.map