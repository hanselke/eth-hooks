import { Provider } from '@ethersproject/providers';
import { BaseContract, Event, Signer } from 'ethers';
import { Result } from 'ethers/lib/utils';
import { QueryClient } from 'react-query';
import { invariant } from 'ts-invariant';

import { isValidEthersAdaptor } from '~~/functions';
import { TEthersAdaptor, TEthersProvider, TEthersProviderOrSigner, TypedEvent } from '~~/models';

export type TRequiredKeys = {
  namespace: string;
  key: string;
};

export type TKeyTypes = {
  provider?: string;
  adaptor?: string;
  contract?: string;
  contractFunc?: string;
};

/**
 * Get a react-query query key fo ethers provider
 * @param providerOrSigner
 * @returns
 */
export const providerKey = (
  providerOrSigner: TEthersProviderOrSigner | undefined
): Record<'provider' | 'signer', string> => {
  if (providerOrSigner == null) return { provider: 'undefined provider', signer: 'undefined signer' };

  if (Provider.isProvider(providerOrSigner)) {
    const provider = providerOrSigner as TEthersProvider;

    return {
      provider: `${provider?.network?.chainId}_${provider?.network?.name}_${provider?.connection.url.substring(0, 25)}`,
      signer: 'isProvider',
    };
  } else {
    const provider = (providerOrSigner as Signer).provider as TEthersProvider;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const signerStr: string = (providerOrSigner as any)?.address ?? '';
    if (provider && provider?.network && Signer.isSigner(providerOrSigner)) {
      return {
        signer: `isSigner_${providerOrSigner._isSigner}_${signerStr}`,
        provider: `${provider?.network?.chainId}_${provider?.network?.name}_${provider?.connection.url.substring(
          0,
          25
        )}`,
      };
    }
  }

  return { provider: 'unknown provider', signer: 'unknown signer' };
};

/**
 * Get a react-query query key
 * @param adaptor
 * @returns
 */
export const adaptorKey = (adaptor: TEthersAdaptor | undefined): Partial<Record<'adaptor' | 'provider', string>> => {
  if (adaptor == null && !isValidEthersAdaptor(adaptor)) return { adaptor: 'undefined adaptor' };

  if (adaptor?.signer != null && adaptor.account != null && adaptor.provider != null) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return { adaptor: `${adaptor.chainId?.toString()}_${adaptor?.account}_${providerKey(adaptor?.provider ?? '')}` };
  } else if (adaptor?.provider) {
    return providerKey(adaptor?.provider);
  }
  return { adaptor: 'unknown adaptor' };
};

/**
 * Get a react-query query key
 * @param m
 * @returns
 */
export const eventKey = (m: Event | TypedEvent<Result>): string => {
  return `${m.transactionHash}_${m.logIndex}`;
};

/**
 * Get a react-query query key
 * @param contract
 * @returns
 */
export const contractKey = (contract: BaseContract | undefined): Partial<Record<'contract' | 'provider', string>> => {
  if (contract == null) return { contract: 'undefined contract' };

  const address = contract.address;
  const provider = providerKey(contract.provider as TEthersProvider | undefined);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const signerStr: string = (contract.signer as any)?.address ?? '';
  const fragments = contract.interface.fragments
    .map((m) => m.name)
    .reduce((oldValue, current) => {
      let newValue = oldValue;
      if (newValue == null) {
        newValue = '';
      }
      newValue += `${current},`;
      return newValue;
    }, '');

  return { contract: `${address}_${signerStr}_${fragments}`, ...provider };
};

/**
 * Get a react-query query key
 * @param contract
 * @param func
 * @returns
 */
export const contractFuncKey = (
  contract: BaseContract | undefined,
  func: ((...args: any[]) => Promise<any>) | undefined
): Record<'contractFunc', string> => {
  if (contract == null || func == null) return { contractFunc: 'undefined contract or contractFunc' };

  let methodName: string | undefined = undefined;
  Object.getOwnPropertyNames(contract).forEach((prop) => {
    // @ts-expect-error
    if (contract[prop] === func) {
      methodName = prop;
    }
  });

  if (methodName !== null) {
    return { contractFunc: methodName ?? 'unknown contractFunc', ...contractKey(contract) };
  }
  return { contractFunc: 'unknown contractFunc', ...contractKey(contract) };
};

export const invalidateCache = (
  queryClient: QueryClient,
  namespace: string,
  otherKeys: TKeyTypes & { key?: string } = {},
  variables: Record<string, any> = {}
): void => {
  void queryClient?.invalidateQueries?.([{ namespace, ...otherKeys }, variables]);
};

export const logQueryCache = (
  queryClient: QueryClient,
  namespace: string,
  otherKeys: TKeyTypes & { key?: string } = {},
  variables: Record<string, any> = {}
): void => {
  invariant.log(queryClient.getQueriesData([{ namespace, ...otherKeys }, variables]));
};
