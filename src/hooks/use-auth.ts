import { useMutation } from '@tanstack/react-query';

import { authApi } from '#services/auth-api';

export const useSignUpMutation = () => useMutation({ mutationFn: authApi.signUp });

export const useConfirmEmailMutation = () => useMutation({ mutationFn: authApi.confirmEmail });

export const useResendEmailMutation = () => useMutation({ mutationFn: authApi.resendEmail });

export const useLoginMutation = () => useMutation({ mutationFn: authApi.login });
