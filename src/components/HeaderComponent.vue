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
                    <q-btn v-if="user" flat dense icon="account_circle" to="user" />

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

        const { user } = storeToRefs(authStore);

        return {
            currentTab: ref(links[0].name),
            user,
        }
    }
});
</script>
