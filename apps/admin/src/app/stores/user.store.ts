import type { AuthCredentials } from '@lib/shared';
import { defineStore } from 'pinia';


export const useUserStore = defineStore('user', {
  state: () => ({
    authenticated: <boolean>false,
    credentials: <AuthCredentials>{
      userId: 0,
      userName: '',
      accessToken: '',
    }
  }),
  actions: {
    /**
     * Updates the authenticated state in the store.
     * @param value - boolean indicating if the user is authenticated or not.
     */
    updateAuthenticated(value: boolean) {
      this.authenticated = value;
    },
    /**
     * Updates the credentials in the store.
     * @param value - The new credentials to be stored.
     */
    updateCredentials(value: AuthCredentials) {
      this.credentials = value;
    }
  }
});
