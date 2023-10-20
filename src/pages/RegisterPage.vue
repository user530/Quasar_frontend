<template>
    <q-page>
        <div class="container q-py-xl">
            <q-form class="q-mx-auto q-pa-lg shadow-2" style="max-width: 600px; border: 1px solid #232323;"
                @submit="createAccountHandler" @reset="resetHandler">

                <h2 class="text-center q-mb-xl">Register new account:</h2>

                <q-input v-model="userAccount.email" class="q-mb-lg" outlined label="Your email *" clearable lazy-rules
                    :rules="[
                        val => val !== null && val !== '' || 'Please, enter the email!',
                        val => emailRegex.test(val) || 'Please, enter valid email!'
                    ]" />

                <q-input v-model="userAccount.password" class="q-mb-lg" outlined label="Your password *"
                    :type="hidePwd ? 'password' : 'text'" clearable lazy-rules :rules="[
                        val => val !== null && val !== '' || 'Please, enter the password!',
                        val => passRegex.test(val) || 'Password should include at least one uppercase character, one lowercase character, one number and one symbol and be at least 6 characters long!'
                    ]">
                    <template v-slot:append>
                        <q-icon :name="hidePwd ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                            @click="hidePwd = !hidePwd" />
                    </template>
                </q-input>

                <q-item tag="label" class="q-mb-lg bg-grey-4">
                    <q-items-section>
                        <q-checkbox v-model="accept" color="positive" />
                    </q-items-section>

                    <q-items-section>
                        <q-item-label class="text-bold">I agree to terms and conditions.</q-item-label>
                        <q-item-label caption class="text-grey-10">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum pariatur assumenda quia
                            asperiores provident.
                        </q-item-label>
                    </q-items-section>
                </q-item>

                <div class="flex justify-between">
                    <q-btn label="Submit" type="submit" color="positive" class="q-px-xl" />
                    <q-btn label="Reset" type="reset" color="negative" flat />
                </div>
            </q-form>
        </div>
    </q-page>
</template>

<script lang="ts">
import { Ref, defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { CreateUserDTO, emailRegex, passRegex } from 'src/data/models';
import { useAuthStore } from 'src/stores/auth';
import axios from 'axios';

export default defineComponent({
    name: 'RegisterPage',
    setup() {
        const $q = useQuasar();
        const authStore = useAuthStore();
        const {  createAccount } = authStore;

        const userAccount: Ref<CreateUserDTO> = ref({ email: '', password: '' });
        const accept: Ref<boolean> = ref(false);
        const hidePwd = ref(true);

        const createAccountHandler = async (): Promise<void> => {
            if (!accept.value)
                $q.notify(
                    {
                        color: 'red-7',
                        textColor: 'white',
                        icon: 'warning',
                        message: 'You need to accept terms and conditions!'
                    })
            else {
                try {
                    await createAccount({ ...userAccount.value });

                    resetHandler();

                    $q.notify(
                        {
                            color: 'green-4',
                            textColor: 'white',
                            message: 'Your account is successfully created!\nLog-in to get access to your data.'
                        }
                    )
                } catch (error) {
                    let errMsg = 'We encountered unexpected error! Please try again later.';

                    if (axios.isAxiosError(error) && error.response?.data.message)
                        errMsg = error.response?.data.message;

                    resetHandler();

                    $q.notify(
                        {
                            color: 'red-7',
                            textColor: 'white',
                            icon: 'warning',
                            message: errMsg,
                        }
                    )
                }
            }
        };

        const resetHandler = (): void => {
            userAccount.value = { email: '', password: '' };
            accept.value = false;
        }

        return {
            emailRegex,
            passRegex,
            userAccount,
            hidePwd,
            accept,
            createAccountHandler,
            resetHandler
        }
    }
}) 
</script>

