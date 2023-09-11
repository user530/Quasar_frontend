<template>
    <q-layout view="hHh lpr fff">

        <HeaderComponent :links="navigationLinks" />

        <q-page-container>
            <router-view />
        </q-page-container>

        <FooterComponent :links="navigationLinks" :contacts="footerContacts" :social="socialMediaLinks" />

    </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { HeaderComponent, FooterComponent } from 'src/components';
import { footerContacts, navigationLinks, socialMediaLinks } from 'src/data/data';


export default defineComponent({
    name: 'MainLayout',
    data() {
        return {
            footerContacts,
            navigationLinks,
            socialMediaLinks
        }
    },
    components: {
        HeaderComponent,
        FooterComponent
    }
})
</script>