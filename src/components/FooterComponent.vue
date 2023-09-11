<template>
    <q-footer class="bg-grey-7 q-py-md">
        <div class="q-mx-auto" style="width: 40%;">

            <div class="row justify-center">

                <div class="col-6 q-px-md">
                    <h6 class="q-mb-sm">Footer heading</h6>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero perspiciatis debitis eaque facilis
                        maiores doloremque saepe, corrupti ipsam, illo natus esse iusto repellat assumenda? Aspernatur
                        cumque expedita maxime laboriosam eaque?</p>
                </div>

                <div class="col-3 q-px-md">
                    <h6 class="q-mb-sm">Navigation:</h6>

                    <q-tabs vertical justify-content="start">
                        <q-route-tab v-for="(link, ind) in links" :key="ind" :label="link.label" class="text-capitalize"
                            :to="link.path" align="left" style="justify-content: start;" />
                    </q-tabs>

                </div>

                <div class="col-3 q-px-md">
                    <h6 class="q-mb-sm">Contacts:</h6>

                    <div>
                        <a v-for="(contact, ind) in contacts" :key="ind" class="block q-mb-md" style="color: inherit;"
                            :href="contact.type === 'email' ? `mailto:${contact.information}` :
                                contact.type === 'phone' ? `tel:${contact.information}` : undefined">
                            {{ contact.information }}</a>
                    </div>

                </div>

            </div>

            <div class="row flex-center q-py-sm">
                <q-btn-group flat>
                    <q-btn v-for="(socialLink, ind) in social" :key="ind" :icon="socialLink.icon" :href="socialLink.link" />
                </q-btn-group>
            </div>

            <div class="row flex-center">
                (c) 2024 Copyright. Some important text nobody ever reads
            </div>
        </div>
    </q-footer>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { ContactInformation, NavLink, SocialMedia } from '../data/models';

export default defineComponent({
    name: 'FooterComponent',
    props: {
        links: {
            type: Array as PropType<NavLink[]>,
            required: true
        },
        contacts: {
            type: Array as PropType<ContactInformation[]>,
            required: true
        },
        social: {
            type: Array as PropType<SocialMedia[]>,
            required: true
        }
    }
})
</script>

