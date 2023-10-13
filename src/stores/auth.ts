import { defineStore } from 'pinia';
import { CreateUserDTO, ResponseUserDTO, UserProfile } from 'src/data/models';
import axiosInstance from 'src/axios';

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
        const res = await axiosInstance.post<ResponseUserDTO>('/auth/login', { ...accountData });

        this.setUser(res.data);
      } catch (error) {
        throw error;
      }
    },

    async logOut(): Promise<void> {
      try {
        await axiosInstance.delete<void>('/auth/logout');

        this.setUser(null);
      } catch (error) {
        throw error;
      }
    },

    async createAccount(accountData: CreateUserDTO): Promise<void> {
      try {
        await axiosInstance.post<ResponseUserDTO>('/users', { ...accountData });
      } catch (error) {
        throw error;
      }
    },

    async updateAccount(id: string, accountData: CreateUserDTO): Promise<void> {
      try {
        const res = await axiosInstance.patch<ResponseUserDTO>(`/users/${id}`, { ...accountData });

        this.setUser(res.data)
      } catch (error) {
        throw error;
      }
    },

    async deleteAccount(id: string): Promise<void> {
      try {
        await axiosInstance.delete<void>(`/users/${id}`);
      } catch (error) {
        throw error;
      }
    },

    async createProfile(accountId: string, profileData: UserProfile): Promise<void> {
      try {
        const res = await axiosInstance.post<UserProfile>(`/users/${accountId}/profile`, { ...profileData });

        this.setProfile(res.data);
      } catch (error) {
        throw error;
      }
    },

    async updateProfile(accountId: string, profileData: UserProfile): Promise<void> {
      try {
        const res = await axiosInstance.patch<UserProfile>(`/users/${accountId}/profile`, { ...profileData });

        this.setProfile(res.data);
      } catch (error) {
        throw error;
      }
    },

    async deleteProfile(accountId: string): Promise<void> {
      try {
        await axiosInstance.delete<void>(`/users/${accountId}/profile`);

        this.setProfile(null)
      } catch (error) {
        throw error;
      }
    },

    async getMe(): Promise<void> {
      try {
        const user = await axiosInstance.get<ResponseUserDTO>('/auth/getme');

        this.setUser(user.data);
      } catch (error) {
        throw error;
      }
    }
  }
});
