<template>
    <q-page>

        <div>

            <q-img src="https://dummyimage.com/2360x350/000/fff" :ratio="16 / 9" style="width: 100%; height: 300px;"
                fit="cover" />

            <div class="container">

                <q-banner color="primary" inline-actions>

                    <div class="banner-content">

                        <div class="content-block column no-wrap justify-start items-center q-py-xl">
                            <h2 class="q-mb-xl">Test Quasar App</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                                itaque veritatis officia atque eaque sed magnam dolore molestias earum nam eius ipsum
                                non, maiores minima aliquam mollitia libero impedit provident! Sapiente natus molestias
                                commodi adipisci inventore labore tempora, alias beatae non quae. Pariatur quis, facere a
                                veritatis illum repellendus, dignissimos tempora odit, quidem sunt doloremque? Soluta ipsa
                                neque numquam possimus. Vel amet fugit dolore incidunt cupiditate quibusdam ad mollitia nam
                                ea corrupti animi consequuntur veniam error a qui voluptatibus, adipisci dolores. Nulla,
                                magni odio magnam quibusdam ipsum suscipit maiores fuga? Accusantium, pariatur magni labore
                                tempore laborum perspiciatis animi. Ut, tempora, natus itaque modi adipisci dolores
                                quaerat quis cumque et asperiores aspernatur quam reprehenderit eos ipsum dignissimos culpa
                                similique reiciendis ea! Fugit incidunt inventore quam voluptas, ad veniam ipsa maiores
                                temporibus hic aliquam minima sint nam, officiis maxime voluptates vel ipsam consectetur
                                eius, eum vero velit eligendi quos harum repellendus! Molestiae?</p>

                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque modi dolorem corrupti itaque
                                temporibus tempora necessitatibus, delectus dignissimos obcaecati reiciendis consectetur
                                provident repellendus dolores magni veritatis totam vitae. Facilis, provident? Neque
                                praesentium nostrum accusantium illo, eius blanditiis et, repellat aperiam, in molestiae
                                ducimus? Quasi placeat rerum saepe nisi aperiam culpa ea dignissimos aliquam quas
                                corporis iure, suscipit, fugiat consequuntur quis! Consequuntur exercitationem illo
                                consequatur eligendi velit voluptate accusantium, sequi modi culpa molestiae minus nemo
                                excepturi alias quia ipsam perferendis officia illum. Voluptates itaque molestiae saepe
                                repellendus, amet nobis ad dignissimos? Quasi nam deleniti temporibus enim natus inventore,
                                vero quidem qui ut. Doloremque asperiores, rem officiis deleniti, ad facere alias
                                reprehenderit, dignissimos distinctio incidunt delectus. A voluptate similique ad facere
                                officiis? Hic, fugit? Mollitia animi, nobis dolorem provident a est molestias laudantium
                                praesentium fugit vitae recusandae. Praesentium, quidem earum quod magnam iusto dolores rem,
                                vero aliquam eum sint ducimus nihil itaque.</p>
                        </div>

                        <div class="content-block column no-wrap justify-start items-center q-py-xl">

                            <h2 class="q-mb-xl">Advantages</h2>

                            <div class="row">

                                <div v-for="(advantage, ind) in advantages" :key="ind" class="col-4">
                                    <div class="text-center q-mb-xl">
                                        <q-icon :name="advantage.icon" size="64px" />

                                        <h5 class="q-my-sm">{{ advantage.heading }}</h5>

                                        <p>{{ advantage.text }}</p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </q-banner>

            </div>

        </div>

    </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mainAdvantages } from '../data/data';

export default defineComponent({
    name: 'Main-Page',
    data() {
        return {
            advantages: mainAdvantages
        }
    }
})

</script>