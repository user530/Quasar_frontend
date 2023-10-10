import { defineStore } from 'pinia';
import axios from 'axios';
import { CreateUserDTO, ResponseUserDTO, UserProfile } from 'src/data/models';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as ResponseUserDTO | null
  }),

  getters: {
    getUser(state): ResponseUserDTO | null {
      return state.user || null;
    }
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

    setProfile(newProfileData: UserProfile | null): void {
      if (!this.user) return;

      if (!newProfileData) this.user.profile = null;
      else this.user.profile = newProfileData
    },

    async logIn(accountData: CreateUserDTO): Promise<void> {
      try {
        const res = await axios.post<ResponseUserDTO>('http://localhost:3000/auth/login', { ...accountData }, { withCredentials: true });

        this.setUser(res.data);
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

    async createAccount(accountData: CreateUserDTO): Promise<void> {
      try {
        await axios.post<ResponseUserDTO>('http://localhost:3000/users', { ...accountData });
      } catch (error) {
        throw error;
      }
    },

    async updateAccount(id: string, accountData: CreateUserDTO): Promise<void> {
      try {
        const res = await axios.patch<ResponseUserDTO>(`http://localhost:3000/users/${id}`, { ...accountData }, { withCredentials: true });

        this.setUser(res.data)
      } catch (error) {
        throw error;
      }
    },

    async deleteAccount(id: string): Promise<void> {
      try {
        await axios.delete(`http://localhost:3000/users/${id}`, { withCredentials: true });
      } catch (error) {
        throw error;
      }
    },

    async createProfile(accountId: string, profileData: UserProfile): Promise<void> {
      try {
        const res = await axios.post<UserProfile>(`http://localhost:3000/users/${accountId}/profile`, { ...profileData }, { withCredentials: true });

        this.setProfile(res.data);
      } catch (error) {
        throw error;
      }
    },

    async updateProfile(accountId: string, profileData: UserProfile): Promise<void> {
      try {
        const res = await axios.patch<UserProfile>(`http://localhost:3000/users/${accountId}/profile`, { ...profileData }, { withCredentials: true });

        this.setProfile(res.data);
      } catch (error) {
        throw error;
      }
    },

    async deleteProfile(accountId: string): Promise<void> {
      try {
        await axios.delete<void>(`http://localhost:3000/users/${accountId}/profile`, { withCredentials: true });

        this.setProfile(null)
      } catch (error) {
        throw error;
      }
    }
  }
});
