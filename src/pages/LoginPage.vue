<template>
    <q-page>
        <div class="container q-py-xl">
            <q-form class="q-mx-auto q-pa-lg shadow-2" style="max-width: 600px; border: 1px solid #232323;"
                @submit="logInHandler" @reset="resetHandler">

                <h2 class="text-center q-mb-xl">Log-in:</h2>

                <q-input v-model="loginData.email" class="q-mb-lg" outlined label="Your email *" lazy-rules="ondemand"
                    :rules="[
                        val => val !== null && val !== '' || 'Please, enter the email!',
                        val => emailRegex.test(val) || 'Please, enter valid email!'
                    ]" />

                <q-input v-model="loginData.password" class="q-mb-lg" outlined label="Your password *"
                    :type="hidePwd ? 'password' : 'text'" lazy-rules="ondemand" :rules="[
                        val => val !== null && val !== '' || 'Please, enter the password!',
                        val => passRegex.test(val) || 'Password should include at least one uppercase character, one lowercase character, one number and one symbol and be at least 6 characters long!'
                    ]">
                    <template v-slot:append>
                        <q-icon :name="hidePwd ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                            @click="hidePwd = !hidePwd" />
                    </template>
                </q-input>

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
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar';
import { CreateUserDTO, emailRegex, passRegex } from 'src/data/models';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';
import { storeToRefs } from 'pinia';


export default defineComponent({
    name: 'RegisterPage',
    setup() {
        const $q = useQuasar();
        const router = useRouter();
        const authStore = useAuthStore();
        const { logIn } = authStore;
        const { getUser } = storeToRefs(authStore);

        if (getUser.value) router.push('user');

        const loginData: Ref<CreateUserDTO> = ref({ email: '', password: '' });
        const hidePwd: Ref<boolean> = ref(true);

        const logInHandler = async (): Promise<void> => {
            try {
                await logIn({ ...loginData.value });

                router.push('user');
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
                        message: errMsg
                    }
                )
            }
        };

        const resetHandler = (): void => {
            loginData.value = { email: '', password: '' };
        }

        return {
            emailRegex,
            passRegex,
            loginData,
            hidePwd,
            logInHandler,
            resetHandler
        }
    }
}) 
</script>

