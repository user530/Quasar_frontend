<template>
    <q-page>
        <div class="main-wrapper q-py-xl">

            <div class="container">

                <div class="row">
                    <div class="col-4 q-pa-sm">
                        <div class="flex flex-center q-pa-lg" style="border: 1px solid black;">
                            <img src="https://dummyimage.com/450x600/000/fff" alt="img">
                        </div>
                    </div>
                    <div class="col-8 ">
                        <div class="about-wrapper flex justify-end items-start content-start q-pa-md">
                            <h2 class="q-mb-xl">About Us:</h2>
                            <p class='text-right'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto quasi
                                perspiciatis
                                dolorum
                                odio mollitia animi reprehenderit id minima in recusandae esse, veritatis repudiandae
                                similique
                                saepe iusto! Eius atque quis accusamus? Lorem ipsum dolor sit amet consectetur adipisicing
                                elit.
                                Magnam placeat, illo veniam hic pariatur eum ipsa veritatis odio a, beatae ratione ex?
                                Pariatur
                                reprehenderit natus, expedita eos animi explicabo inventore. Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Saepe sapiente eius laudantium officiis vero eveniet dolorum
                                sequi
                                enim fugiat quis! Eveniet sint illum libero a id reprehenderit vel quis perspiciatis!
                                Provident
                                impedit eligendi reiciendis quas natus debitis tempora iusto omnis minima obcaecati animi
                                placeat fuga, eius, velit dolore illum quia nesciunt? Obcaecati aperiam repudiandae quod
                                sunt
                                consequatur. Quasi, voluptate explicabo? Esse reprehenderit dolor, sequi facilis, laboriosam
                                ad
                                officiis accusantium autem facere exercitationem inventore numquam, consequuntur culpa?
                                Reiciendis cumque minima porro vero ab eligendi, alias culpa, natus, facilis totam
                                necessitatibus aspernatur.
                            </p>
                            <p class='text-right'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque eaque
                                blanditiis perferendis porro itaque sed placeat atque repellat culpa minima. Maxime maiores
                                vel
                                eveniet laudantium incidunt omnis officia repellendus eos! Omnis itaque repudiandae dolorum
                                libero necessitatibus facilis autem, dicta deleniti accusamus incidunt neque. A blanditiis
                                culpa
                                laborum voluptas, maiores excepturi fugit suscipit assumenda dolorem vel atque hic, sequi
                                dicta
                                ipsa? Laboriosam animi asperiores quidem eveniet. Doloribus assumenda deserunt voluptates
                                ab,
                                molestias recusandae corrupti ex maiores illum rerum necessitatibus natus provident
                                perspiciatis. Placeat eum non labore, itaque dolorem incidunt reiciendis perferendis. Quas
                                itaque perspiciatis dicta, natus, eligendi possimus aperiam iusto eos facilis unde, mollitia
                                sit
                                ex vero autem voluptates animi. Numquam nesciunt dolorem beatae adipisci sed eius quidem ut
                                ea
                                sapiente. Animi quam non architecto, cupiditate eligendi quis molestias. Quasi recusandae
                                quos
                                ipsum, repellat esse numquam ab harum eius praesentium reprehenderit quam dolore quod
                                perspiciatis nam necessitatibus provident accusamus deserunt in?
                            </p>
                        </div>
                    </div>
                </div>

                <div class="q-mt-xl">
                    <h2 class="text-center q-mb-xl">F.A.Q.</h2>
                    <q-list bordered>
                        <q-expansion-item v-for="(faq, ind) in faqs" :key="ind" group="faq" :label="faq.question"
                            :default-opened="ind === 0" header-class="bg-grey-7 text-grey-1">
                            <q-card>
                                <q-card-section>
                                    {{ faq.asnwer }}
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
                    </q-list>

                </div>

            </div>
        </div>
    </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { aboutFaqs } from '../data/data'

export default defineComponent({
    name: 'AboutUsPage',
    data() {
        return {
            faqs: aboutFaqs
        }
    }
});

</script>