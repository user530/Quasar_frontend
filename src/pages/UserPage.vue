<template>
    <q-page>
        <div class="container q-py-xl">
            <q-form class="q-mx-auto q-pa-lg shadow-2"
                style="max-width: 600px; border: 1px solid #232323; margin-bottom: 100px; " @submit="updateAccountHandler">

                <h2 class="text-center q-mb-xl">User Account:</h2>

                <q-input v-model="userAccount.email" class="q-mb-lg" outlined label="User Email"
                    :readonly="!isEditingAccount" :bg-color="!isEditingAccount ? 'grey-4' : 'none'" lazy-rules :rules="[
                        val => val !== null && val !== '' || 'Please, enter the email!',
                        val => emailRegex.test(val) || 'Please, enter valid email!'
                    ]" />

                <q-input v-model="userAccount.password" class="q-mb-lg" outlined label="User Password"
                    :readonly="!isEditingAccount" :type="hidePwd ? 'password' : 'text'"
                    :bg-color="!isEditingAccount ? 'grey-4' : 'none'" lazy-rules :rules="[
                        val => val !== null && val !== '' || 'Please, enter the password!',
                        val => passRegex.test(val) || 'Password should include at least one uppercase character, one lowercase character, one number and one symbol and be at least 6 characters long!'
                    ]">
                    <template v-slot:append>
                        <q-icon :name="hidePwd ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                            @click="hidePwd = !hidePwd" />
                    </template>
                </q-input>

                <div class="q-mb-lg">
                    <q-toggle v-model="isEditingAccount" label="Edit account" checked-icon="check" unchecked-icon="clear" />
                </div>

                <div class="flex justify-between">
                    <q-btn type="submit" color="positive" :disable="!isEditingAccount" label="Update account data"
                        class="q-px-xl" />
                    <q-btn @click="deleteAccountHandler" color="negative" label="Delete account" />
                </div>
            </q-form>

            <q-form class="q-mx-auto q-pa-lg shadow-2" style="max-width: 600px; border: 1px solid #232323;"
                @submit="updateProfileHandler">

                <h2 class="text-center q-mb-xl">User Profile:</h2>

                <q-input v-model="userProfile.name" class="q-mb-lg" outlined label="Name" :readonly="!isEditingProfile"
                    :bg-color="!isEditingProfile ? 'grey-4' : 'none'" lazy-rules :rules="[
                        val => val !== null && val !== '' || 'Please, enter the name!'
                    ]" />

                <q-input v-model="userProfile.phone" class="q-mb-lg" outlined label="Phone" :readonly="!isEditingProfile"
                    :bg-color="!isEditingProfile ? 'grey-4' : 'none'" lazy-rules :rules="[
                        val => val !== null && val !== '' || 'Please, enter the phone!'
                    ]" />

                <q-input v-model="userProfile.address" class="q-mb-lg" outlined label="Address"
                    :readonly="!isEditingProfile" :bg-color="!isEditingProfile ? 'grey-4' : 'none'" lazy-rules :rules="[
                        val => val !== null && val !== '' || 'Please, enter the address!'
                    ]" />

                <div class="q-mb-lg">
                    <q-toggle v-model="isEditingProfile" label="Edit profile" checked-icon="check" unchecked-icon="clear" />
                </div>

                <div class="flex justify-between">
                    <q-btn v-if="!userAccount.hasProfile" @click="addProfileHandler" color="positive"
                        :disable="!isEditingProfile" label="Add profile data" />
                    <q-btn v-else @click="updateProfileHandler" color="positive" :disable="!isEditingProfile"
                        label="Update profile data" />

                    <q-btn @click="deleteProfileHandler" :disable="!userAccount.hasProfile" color="negative"
                        label="Delete profile" />
                </div>
            </q-form>
        </div>
    </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { defineComponent, ref } from 'vue';
import { UserProfile, ResponseUserDTO } from '../data/models'
import { useAuthStore } from '../stores/auth'
import { UserAccount, emailRegex, passRegex } from '../data/models';
import axios from 'axios';

export default defineComponent({
    name: 'UserPage',
    setup() {
        const $q = useQuasar();
        const router = useRouter();

        const { getUser, logOut, updateAccount, updateProfile, deleteAccount, deleteProfile, createProfile } = useAuthStore();

        if (!getUser) {
            router.push('/login');
        }

        const userData = getUser as ResponseUserDTO;

        let accountData: UserAccount & { hasProfile: boolean };
        let profileData: UserProfile;

        accountData = { id: userData.id, email: userData.email, password: '', hasProfile: getUser?.profile !== null }
        profileData = userData.profile || { address: '', name: '', phone: '' };

        const userAccount = ref(accountData);
        const userProfile = ref(profileData);

        const hidePwd = ref(true);

        const isEditingAccount = ref(false);
        const isEditingProfile = ref(userData.profile === null);

        const updateAccountHandler = async (): Promise<void> => {
            try {
                await updateAccount(userAccount.value.id, { ...userAccount.value });

                isEditingAccount.value = false;

                $q.notify(
                    {
                        color: 'green-4',
                        textColor: 'white',
                        message: 'Your account is successfully updated!'
                    }
                );
            } catch (error) {
                let errMsg = 'We encountered unexpected error! Please try again later.';

                if (axios.isAxiosError(error) && error.response?.data.message)
                    errMsg = error.response?.data.message;

                $q.notify(
                    {
                        color: 'red-7',
                        textColor: 'white',
                        icon: 'warning',
                        message: errMsg
                    }
                );
            }
        };

        const deleteAccountHandler = (): void => {
            $q.notify({
                type: 'warning',
                message: 'This action will completely delete your account! Are you sure you want to proceed?',
                actions: [
                    {
                        label: 'DELETE', color: 'red',
                        handler: confirmAccountDelete
                    }
                ],
                closeBtn: 'DISMISS',
                multiLine: true

            });
        };

        const addProfileHandler = async (): Promise<void> => {
            try {
                await createProfile(userAccount.value.id, { ...userProfile.value });

                userProfile.value = getUser?.profile as UserProfile;
                userAccount.value.hasProfile = true;
                isEditingProfile.value = false;

                $q.notify(
                    {
                        color: 'green-4',
                        textColor: 'white',
                        message: 'Profile information added to your account!'
                    }
                );
            } catch (error) {
                let errMsg = 'We encountered unexpected error! Please try again later.';

                if (axios.isAxiosError(error) && error.response?.data.message)
                    errMsg = error.response?.data.message;

                $q.notify(
                    {
                        color: 'red-7',
                        textColor: 'white',
                        icon: 'warning',
                        message: errMsg
                    }
                );
            }

        }

        const updateProfileHandler = async (): Promise<void> => {
            try {
                await updateProfile(userAccount.value.id, { ...userProfile.value });

                isEditingProfile.value = !isEditingProfile.value;

                $q.notify(
                    {
                        color: 'green-4',
                        textColor: 'white',
                        message: 'Your profile is successfully updated!'
                    }
                );

            } catch (error) {
                let errMsg = 'We encountered unexpected error! Please try again later.';

                if (axios.isAxiosError(error) && error.response?.data.message)
                    errMsg = error.response?.data.message;

                $q.notify(
                    {
                        color: 'red-7',
                        textColor: 'white',
                        icon: 'warning',
                        message: errMsg
                    }
                );
            }
        }

        const deleteProfileHandler = async (): Promise<void> => {
            $q.notify({
                type: 'warning',
                message: 'This action will completely delete your user profile! Are you sure you want to proceed?',
                actions: [
                    {
                        label: 'DELETE', color: 'red', handler: confirmProfileDelete
                    }
                ],
                closeBtn: 'DISMISS',
                multiLine: true
            })
        }

        const confirmAccountDelete = async (): Promise<void> => {
            try {
                await deleteAccount(userAccount.value.id)

                await logOut();

                router.push('/');
            } catch (error) {
                let errMsg = 'We encountered unexpected error! Please try again later.';

                if (axios.isAxiosError(error) && error.response?.data.message)
                    errMsg = error.response?.data.message;

                $q.notify(
                    {
                        color: 'red-7',
                        textColor: 'white',
                        icon: 'warning',
                        message: errMsg
                    }
                );
            }

        }

        const confirmProfileDelete = async (): Promise<void> => {
            try {
                await deleteProfile(userAccount.value.id);

                profileResetHandler();

                $q.notify(
                    {
                        color: 'green-4',
                        textColor: 'white',
                        message: 'PROFILE DELETED!'
                    }
                );

            } catch (error) {
                let errMsg = 'We encountered unexpected error! Please try again later.';

                if (axios.isAxiosError(error) && error.response?.data.message)
                    errMsg = error.response?.data.message;

                $q.notify(
                    {
                        color: 'red-7',
                        textColor: 'white',
                        icon: 'warning',
                        message: errMsg
                    }
                );
            }
        }

        const profileResetHandler = (): void => {
            userProfile.value = { name: '', address: '', phone: '' };
            userAccount.value.hasProfile = false;
            isEditingProfile.value = false;
        }

        return {
            emailRegex,
            passRegex,
            userAccount,
            userProfile,
            hidePwd,
            isEditingAccount,
            isEditingProfile,
            updateAccountHandler,
            deleteAccountHandler,
            addProfileHandler,
            updateProfileHandler,
            deleteProfileHandler
        }
    }
})
</script>