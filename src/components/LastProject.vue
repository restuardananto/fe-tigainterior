<script setup>
import { reactive, onMounted } from 'vue'
import api from '@/Api'
import { RouterLink } from 'vue-router'

const lastProject = reactive({})

const getLastProject = async () => {
    try {
        const response = await api.get('/project/last')
        Object.assign(lastProject, response.data)
    } catch (error) {
        console.log(error.message)
    }
}

onMounted(() => {
    getLastProject()
})

</script>

<template>
    <div class="w-full flex flex-col items-start py-2">
        <h1 class="text-center text-utama font-semibold text-[25px]">Latest Projects</h1>
        <p class="text-center text-black text-[15px]">Become's our latest projects</p>
    </div>
    <div class="max-w-full min-w-[50vw] justify-center flex scroll scroll-smooth overflow-scroll scrollbar-hide py-4 px-4">
        <div class="flex items-end gap-4">
            <div v-for="(lastPro, index) in lastProject" :key="index"
                class="effect w-[202px] min-w-[202px] max-w-[202px] pb-2 flex flex-col justify-between">
                <router-link :to="{ name: 'ProjectView', params: { id: lastPro.id } }">
                    <img :src="lastPro.url" :alt="lastPro.title"
                        class="w-[202px] min-w-[202px] max-w-[202px] rounded-[25px]" />
                    <div class="block bg-gray rounded-[25px] mt-4 py-2">
                        <h1 class="text-utama text-center font-semibold text-[18px]">
                            {{ 'No.' + lastPro.id }}
                        </h1>
                        <h1
                            class="w-[202px] min-w-[202px] max-w-[202px] text-black text-center font-semibold text-[18px]">
                            {{ lastPro.title.slice(0, 15) + ' ...' }}
                        </h1>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.effect:hover {
    @apply transition ease-in-out scale-110 duration-200 cursor-pointer
}
</style>