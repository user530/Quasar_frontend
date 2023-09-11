import { defineStore } from 'pinia';
import axios, { AxiosResponse } from 'axios';
import { CreateUserDTO, ResponseUserDTO, UserProfile } from 'src/data/models';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as ResponseUserDTO | null
  }),

  getters: {
    getUser(state): ResponseUserDTO | null {
      return state.user || null;
    },
  },

  actions: {
    setUser(newUserData: ResponseUserDTO | null): void {
      if (!newUserData)
        this.user = null;
      else {
        const { id, email, profile } = newUserData;
        this.user = { id, email, profile };
      }
    },

    async logIn(accountData: CreateUserDTO): Promise<ResponseUserDTO> {
      try {
        const res: AxiosResponse<ResponseUserDTO> = await axios.post('http://localhost:3000/auth/login', { ...accountData }, { withCredentials: true });

        console.log(res.data);

        return res.data;
      } catch (error) {
        throw error;
      }
    },

    async logOut(): Promise<void> {
      try {
        await axios.post('http://localhost:3000/auth/logout', null, { withCredentials: true });

        this.setUser(null);
      } catch (error) {
        throw error;
      }
    },

    async createAccount(accountData: CreateUserDTO): Promise<ResponseUserDTO> {
      try {
        const res = await axios.post('http://localhost:3000/users', { ...accountData });

        return res.data;
      } catch (error) {
        throw error;
      }
    },

    async updateAccount(id: string, accountData: CreateUserDTO): Promise<ResponseUserDTO> {
      try {
        const res = await axios.patch(`http://localhost:3000/users/${id}`, { ...accountData }, { withCredentials: true });

        return res.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async deleteAccount(id: string): Promise<AxiosResponse> {
      try {
        console.log('DELETE ACCOUNT FIRED!');

        const res = await axios.delete(`http://localhost:3000/users/${id}`, { withCredentials: true });

        console.log(res);

        return res
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async createProfile(accountId: string, profileData: UserProfile): Promise<UserProfile> {
      try {
        console.log('Create Profile Fired!');

        const res = await axios.post(`http://localhost:3000/users/${accountId}/profile`, { ...profileData }, { withCredentials: true });

        console.log(res);

        return res.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async updateProfile(accountId: string, profileData: UserProfile): Promise<unknown> {
      try {
        console.log('Update Profile Fired!');

        const res = await axios.patch(`http://localhost:3000/users/${accountId}/profile`, { ...profileData }, { withCredentials: true });

        console.log(res);

        return res.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async deleteProfile(accountId: string) {
      try {
        console.log('Update Profile Fired!');

        const res = await axios.delete(`http://localhost:3000/users/${accountId}/profile`, { withCredentials: true });

        console.log(res);

        return res.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }


  }
});
