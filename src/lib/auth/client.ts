'use client';

import type { User } from '@/types/user';
import axios from 'axios';


function generateToken(): string {
  const arr = new Uint8Array(12);
  globalThis.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}


export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface VerifyCodeParams {
  email: string;
  code: string;
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

export type newPasswordParams = {
  email: string;
  newPassword: string;
  // other properties if any
};


export type profileParams = {
  email: string;
  phone: string;
  address: string;
  state: string;
  city: string;
  pincode: string;

  
  
  // other properties if any
};


class AuthClient {
  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');
    return {};
  }
  
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    try {
      const response = await axios.post('http://localhost:4000/user', params);
      const { token } = response.data;
      if (token) {
        localStorage.setItem('custom-auth-token', token);
        return {};
      }
      return { error: 'No token received' };
    } catch (error: any) {
      return { error: error.response?.data?.error || 'Sign up failed' };
    }
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    try {
      const response = await axios.post('http://localhost:4000/user-data', params);
      const {token} = response.data;
      //console.log('Response from signInWithPassword:', {token});
      if (token) {
        localStorage.setItem('custom-auth-token', token);
        return {
           
        };
      }
      return { error: 'No token received' };
    } catch (error: any) {
      return { error: error.response?.data?.error || 'Sign in failed' };
    }
  }

  async resetPassword(params: ResetPasswordParams): Promise<{ error?: string }> {
    try {
      //console.log('Resetting password with params:', params);
      await axios.post('http://localhost:4000/reset', params);
      return {};
    } catch (error: any) {
      return { error: error.response?.data?.error || 'Password reset failed' };
    }
  }

 async verifyCode(params: VerifyCodeParams): Promise<{ error?: string }> {
    try {
      console.log('Resetting password code with params:', params);
      const response = await axios.post('http://localhost:4000/verify-code', params);
      // You can handle token or other data here if your backend returns it
      return {};
    } catch (error: any) {
      return { error: error.response?.data?.error || 'Verification failed' };
    }
  }
 async newUpdatePassword(params: newPasswordParams): Promise<{ error?: string }> {
    try {
      await axios.post('http://localhost:4000/newPassword', params);
      return {};
    } catch (error: any) {
      return { error: error.response?.data?.error || 'Update password failed' };
    }
  }

 
async profile(params: profileParams): Promise<{ error?: string }> {
  //console.log('Updating profile with params:', params);
    try {
      await axios.post('http://localhost:4000/update_profile', params);
      return {};
    } catch (error: any) {
      return { error: error.response?.data?.error || 'Update data failed' };
    }
  }

  async updatePassword(params: ResetPasswordParams): Promise<{ error?: string }> {
    try {
      await axios.post('/api/auth/update-password', params);
      return {};
    } catch (error: any) {
      return { error: error.response?.data?.error || 'Update password failed' };
    }
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    try {
      const token = localStorage.getItem('custom-auth-token');
      if (!token) {
        return { data: null };
      }
      const response = await axios.get('http://localhost:4000/protected', {
        headers: { Authorization: `Bearer ${token}` }
      });
      //console.log('Response from getUser:', response.data.user);
      if (!response.data.user) {
        return { data: null, error: 'User not found' };
      }
      if (response.data.user == "Token expired") {
        authClient.signOut();
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/sign-in';
        }
        return { data: null, error: 'Token expired' };
      }
      return { data: response.data.user };
    } catch (error: any) {
      return { error: error.response?.data?.error || 'Failed to fetch user', data: null };
    }
  }

  
}

export const authClient = new AuthClient();


