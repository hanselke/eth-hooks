import { useEffect } from 'react';
import { useQuery } from 'react-query';

import {
  isAdaptorEqual,
  isValidEthersAdaptor,
  mergeDefaultUpdateOptions,
  parseProviderOrSigner,
  processQueryOptions,
  providerKey,
  TRequiredKeys,
} from '~~/functions';
import { TEthersProviderOrSigner, THookResult, TUpdateOptions } from '~~/models';
import { keyNamespace } from '~~/models/constants';
import { TEthersAdaptor } from '~~/models/ethersAppContextTypes';

const queryKey: TRequiredKeys = {
  namespace: keyNamespace.network,
  key: 'useGetEthersAdaptorFromProviderOrSigners',
} as const;

/**
 * #### Summary
 * Gets the user {@link TEthersUser} for a signer or wallet
 *
 * @category Hooks
 *
 * @param providerOrSigner input signer
 * @returns
 */
export const useEthersAdaptorFromProviderOrSigners = (
  providerOrSigner: TEthersProviderOrSigner | undefined,
  options: TUpdateOptions = mergeDefaultUpdateOptions()
): THookResult<TEthersAdaptor | undefined> => {
  const keys = [{ ...queryKey, ...providerKey(providerOrSigner) }] as const;
  const { data, refetch, status } = useQuery(
    keys,
    async (_keys): Promise<TEthersAdaptor | undefined> => {
      const result = await parseProviderOrSigner(providerOrSigner);
      return result;
    },
    {
      ...processQueryOptions<TEthersAdaptor | undefined>(options),
      isDataEqual: (oldData, newData) => isAdaptorEqual(oldData, newData),
    }
  );

  const validAdaptorState = isValidEthersAdaptor(data);

  // if the adaptor is not valid, refetch when the network is obtained
  useEffect(() => {
    if (data != null && !validAdaptorState) {
      console.log('not valid');
      if (data.provider) {
        void data.provider
          .getNetwork()
          .then(() => refetch())
          .catch();
      } else if (data.signer && data.account) {
        void data.signer.provider
          ?.getNetwork()
          .then(() => refetch())
          .catch();
      }
    }
  }, [data, refetch, validAdaptorState]);

  return [data, refetch, status];
};
