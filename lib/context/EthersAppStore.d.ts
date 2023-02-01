import { default as create, StoreApi, UseBoundStore } from 'zustand';
import { IBlockNumberState } from "./EthersAppState";
interface IStore {
    blockNumberState: IBlockNumberState;
    setBlockNumber: (blocknumber: number, chainId: number) => void;
}
export declare type TEthersAppStore = UseBoundStore<StoreApi<IStore>>;
export type { create, StoreApi, UseBoundStore };
export declare const useEthersAppStore: UseBoundStore<StoreApi<IStore>>;
//# sourceMappingURL=EthersAppStore.d.ts.map