import { defineStore } from 'pinia';
import type { AuthCredentials } from '@lib/shared';


export const useUserStore = defineStore('user', {
  state: () => ({
    authorized: <boolean>false,
    credentials: <AuthCredentials>{
      username: '',
      access_token: '',
    }
  }),
  actions: {
    /**
     * Updates the authorized state in the store.
     * @param value - boolean indicating if the user is authorized or not.
     */
    updateAuthorized(value: boolean) {
      this.authorized = value;
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
