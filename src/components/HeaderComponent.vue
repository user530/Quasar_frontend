<template>
    <q-header elevated class="bg-grey-7 q-pb-md">

        <div class="flex flex-center" style="height: 120px;">

            <div class="container">

                <q-toolbar>

                    <q-avatar>
                        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                    </q-avatar>

                    <q-toolbar-title>Quasar Framework</q-toolbar-title>

                    <q-btn v-if="!user" flat dense icon="login" to="login" />
                    <q-btn v-if="user" flat dense icon="account_circle">
                        <q-menu>
                            <q-list class="bg-grey-7 text-grey-1" style="min-width: 100px;">
                                <q-item clickable v-close-popup active-class="bg-grey-6 text-grey-1" to="user">
                                    <q-item-section>User page</q-item-section>
                                </q-item>

                                <q-item clickable v-close-popup>
                                    <q-item-section @click="logOutHandler">Log out</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>

                </q-toolbar>

                <q-tabs v-model="currentTab">

                    <q-route-tab v-for="(link, id) of links" :key="id" :name="link.name" :label="link.label"
                        :to="link.path" />

                </q-tabs>

            </div>

        </div>

    </q-header>
</template>

<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import { NavLink } from '../data/models';
import { useAuthStore } from '../stores/auth'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'HeaderComponent',
    props: {
        links: {
            type: Array as PropType<NavLink[]>,
            required: true
        }
    },
    setup({ links }) {
        const authStore = useAuthStore();
        const { getMe, logOut } = authStore;
        const { user } = storeToRefs(authStore);
        const router = useRouter();

        // Restore session attempt
        getMe().catch(() => { return });

        const logOutHandler = async (): Promise<void> => {
            logOut();

            if (router.currentRoute.value.path === '/user')
                router.push('/')
        }

        return {
            currentTab: ref(links[0].name),
            user,
            logOutHandler
        }
    }
});
</script>
