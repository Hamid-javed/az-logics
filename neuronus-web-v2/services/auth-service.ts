import loginApiClient from '@/lib/loginApiClient';

export const authService = {
  registerSeeds: async (userData: any) => {
    const response = await loginApiClient.post('/auth/register/', userData);
    return response.data;
  },
  
  generateToken: async (credentials: any) => {
    const response = await loginApiClient.post('/auth/login/', credentials);
    const { is_2fa } = response.data;

    if (typeof localStorage !== 'undefined' && is_2fa !== undefined) {
      localStorage.setItem('is_2fa', String(is_2fa));
    }

    return response.data;
  },

  tokenverify: async () => {
    const response = await loginApiClient.post('/auth/token/verify/');
    return response.data;
  },

  generateTotp: async () => {
    const response = await loginApiClient.post('/auth/totp/generate/');
    return response.data;
  },

  manageTotp: async (use_totp: boolean, token: string): Promise<any> => {
    const response = await loginApiClient.post('/auth/totp/manage/', { use_totp, token });
    return response.data;
  },
};