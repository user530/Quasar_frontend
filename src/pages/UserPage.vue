<template>
    <q-page>
        <div v-if="getUser" class="container q-py-xl">
            <q-form class="q-mx-auto q-pa-lg shadow-2"
                style="max-width: 600px; border: 1px solid #232323; margin-bottom: 100px; " @submit="updateAccountHandler">

                <h2 class="text-center q-mb-xl">User Account:</h2>

                <q-input v-model="accountFormData.accountData!.email" class="q-mb-lg" outlined label="User Email"
                    :readonly="!accountFormData.editingAccount"
                    :bg-color="!accountFormData.editingAccount ? 'grey-4' : 'none'" lazy-rules="ondemand" :rules="[
                        val => val !== null && val !== '' || 'Please, enter the email!',
                        val => emailRegex.test(val) || 'Please, enter valid email!'
                    ]" />

                <q-input v-model="accountFormData.accountData!.password" class="q-mb-lg" outlined label="User Password"
                    :readonly="!accountFormData.editingAccount" :type="accountFormData.hidePwd ? 'password' : 'text'"
                    :bg-color="!accountFormData.editingAccount ? 'grey-4' : 'none'" lazy-rules="ondemand" :rules="[
                        val => val !== null && val !== '' || 'Please, enter the password!',
                        val => passRegex.test(val) || 'Password should include at least one uppercase character, one lowercase character, one number and one symbol and be at least 6 characters long!'
                    ]">
                    <template v-slot:append>
                        <q-icon :name="accountFormData.hidePwd ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                            @click="accountFormData.hidePwd = !accountFormData.hidePwd" />
                    </template>
                </q-input>

                <div class="q-mb-lg">
                    <q-toggle v-model="accountFormData.editingAccount" label="Edit account" checked-icon="check"
                        unchecked-icon="clear" />
                </div>

                <div class="flex justify-between">
                    <q-btn type="submit" color="positive" :disable="!accountFormData.editingAccount"
                        label="Update account data" class="q-px-xl" />

                    <q-btn @click="deleteAccountHandler" color="negative" label="Delete account" />
                </div>
            </q-form>

            <q-form class="q-mx-auto q-pa-lg shadow-2" style="max-width: 600px; border: 1px solid #232323;"
                @submit="profileFormCallback" @reset="profileResetHandler">

                <h2 class="text-center q-mb-xl">User Profile:</h2>

                <q-input v-model="profileFormData.profileData.name" class="q-mb-lg" outlined label="Name"
                    :readonly="!profileFormData.editingProfile"
                    :bg-color="!profileFormData.editingProfile ? 'grey-4' : 'none'" clearable lazy-rules="ondemand"
                    :rules="[val => val !== null && val !== '' || 'Please, enter the name!']" />

                <q-input v-model="profileFormData.profileData.phone" class="q-mb-lg" outlined label="Phone"
                    :readonly="!profileFormData.editingProfile"
                    :bg-color="!profileFormData.editingProfile ? 'grey-4' : 'none'" clearable lazy-rules="ondemand" :rules="[
                        val => val !== null && val !== '' || 'Please, enter the phone!'
                    ]" />

                <q-input v-model="profileFormData.profileData.address" class="q-mb-lg" outlined label="Address"
                    :readonly="!profileFormData.editingProfile"
                    :bg-color="!profileFormData.editingProfile ? 'grey-4' : 'none'" clearable lazy-rules="ondemand" :rules="[
                        val => val !== null && val !== '' || 'Please, enter the address!'
                    ]" />

                <q-input v-model="profileFormData.profileData.about" class="q-mb-lg" filled type="textarea"
                    label="Additional user information" :readonly="!profileFormData.editingProfile"
                    :bg-color="!profileFormData.editingProfile ? 'grey-4' : 'none'" clearable lazy-rules="ondemand" :rules="[
                        val => val !== null && val !== '' || 'Please, enter the information about you!'
                    ]" />

                <div class="q-mb-lg">
                    <q-toggle v-model="profileFormData.editingProfile" label="Edit profile" checked-icon="check"
                        unchecked-icon="clear" />
                </div>

                <div class="flex justify-between">
                    <q-btn v-if="!getUser.profile" type="submit" color="positive" :disable="!profileFormData.editingProfile"
                        label="Add profile data" />

                    <q-btn v-else type="submit" color="positive" :disable="!profileFormData.editingProfile"
                        label="Update profile data" />

                    <q-btn type="reset" color="negative" :disable="!profileFormData.editingProfile" flat label="Reset" />

                    <q-btn v-if="getUser.profile" @click="deleteProfileHandler" :disable="!getUser.profile" color="negative"
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
import { AccountFormData, ProfileFormData } from '../data/models'
import { useAuthStore } from '../stores/auth'
import { emailRegex, passRegex } from '../data/models';
import axios from 'axios';
import { storeToRefs } from 'pinia';

export default defineComponent({
    name: 'UserPage',
    setup() {
        const $q = useQuasar();
        const router = useRouter();

        const authStore = useAuthStore();

        const { logOut, updateAccount, updateProfile, deleteAccount, deleteProfile, createProfile } = authStore;
        const { getUser } = storeToRefs(authStore);

        const defaultAccountData: AccountFormData = {
            accountData: {
                id: getUser.value?.id || '',
                email: getUser.value?.email || '',
                password: ''
            },
            editingAccount: false,
            hidePwd: true,
        };

        const defaultProfileData: ProfileFormData = {
            profileData: {
                name: getUser.value?.profile?.name || '',
                address: getUser.value?.profile?.address || '',
                phone: getUser.value?.profile?.phone || '',
                about: getUser.value?.profile?.about || '',
            },
            editingProfile: false
        }

        const accountFormData = ref(defaultAccountData);
        const profileFormData = ref(defaultProfileData);

        const createResponseHandler = (options: {
            cb: () => Promise<void>,
            successMsg: string,
            defaultErrMsg?: string
        }) => async (): Promise<void> => {
            let { cb, successMsg, defaultErrMsg } = options;

            if (!defaultErrMsg) defaultErrMsg = 'We encountered unexpected error! Please try again later.'

            try {
                await cb();

                $q.notify({
                    color: 'green-4',
                    textColor: 'white',
                    message: successMsg,
                })

            } catch (error) {
                let errMsg = defaultErrMsg;

                if (axios.isAxiosError(error) && error.response?.data.message) {
                    const { message } = error.response?.data;

                    if (message instanceof Array)
                        errMsg = message.join(', \n');
                    else
                        errMsg = message;
                }

                $q.notify(
                    {
                        color: 'red-7',
                        textColor: 'white',
                        icon: 'warning',
                        message: errMsg,
                        multiLine: true
                    }
                );
            }

        };

        const updateAccountHandler = createResponseHandler(
            {
                cb: async () => {
                    const { accountData: { id, email, password } } = accountFormData.value;

                    await updateAccount(id, { email, password });

                    accountFormData.value.editingAccount = false;
                },
                successMsg: 'Your account is successfully updated!',
            })

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

        const addProfileHandler = createResponseHandler({
            cb: async () => {
                const { accountData: { id } } = accountFormData.value;
                const { profileData } = profileFormData.value;
                
                await createProfile(id, { ...profileData });

                profileFormData.value.editingProfile = false;
            },
            successMsg: 'Profile information added to your account!',
        });

        const updateProfileHandler = createResponseHandler({
            cb: async () => {
                const { accountData: { id } } = accountFormData.value;
                const { profileData } = profileFormData.value;
                
                await updateProfile(id, { ...profileData });

                profileFormData.value.editingProfile = false;
            },
            successMsg: 'Your profile is successfully updated!',
        })

        const deleteProfileHandler = (): void => {
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

        const confirmAccountDelete = createResponseHandler({
            cb: async () => {
                const { accountData: { id } } = accountFormData.value;

                await deleteAccount(id)

                await logOut();

                router.push('/');
            },
            successMsg: 'Account deleted!',
        })

        const confirmProfileDelete = createResponseHandler({
            cb: async () => {
                const { accountData: { id } } = accountFormData.value;

                await deleteProfile(id);

                profileResetHandler();
            },
            successMsg: 'Your profile is successfully deleted!'
        })

        const profileResetHandler = (): void => {

            profileFormData.value = {
                profileData: {
                    name: '',
                    address: '',
                    phone: '',
                    about: '',
                },
                editingProfile: true
            };
        }

        const profileFormCallback = () => {
            return !(getUser.value?.profile) ? addProfileHandler() : updateProfileHandler();
        }

        return {
            getUser,
            emailRegex,
            passRegex,
            accountFormData,
            profileFormData,
            updateAccountHandler,
            deleteAccountHandler,
            addProfileHandler,
            updateProfileHandler,
            deleteProfileHandler,
            profileFormCallback,
            profileResetHandler
        }
    }
})
</script>