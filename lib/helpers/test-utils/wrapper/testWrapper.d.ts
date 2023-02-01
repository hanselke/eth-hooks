import { RenderHookResult } from '@testing-library/react-hooks';
import { MockProvider } from 'ethereum-waffle';
export declare type TTestHookResult<TCallbackToHook extends (input: any) => any> = Omit<RenderHookResult<Parameters<TCallbackToHook>, ReturnType<TCallbackToHook>>, 'rerender'> & {
    mockProvider: MockProvider;
    rerender: (input: Parameters<TCallbackToHook>[0]) => void;
};
/**
 * Created a test hook with a Web3Wrapper
 * @param callbackToHook callback to init hook
 * @see renderHook from @link testing-library/react-hooks
 * @returns (TTestHookResult)
 */
export declare const hookTestWrapper: <TCallbackToHook extends (input: any) => any>(callbackToHook: TCallbackToHook) => Promise<TTestHookResult<TCallbackToHook>>;
//# sourceMappingURL=testWrapper.d.ts.map