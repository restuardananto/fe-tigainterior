<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router';
import api from '@/Api'

const viewProject = reactive({
    detail: [],
    lastest: [],
    wa: []
})
const linkParams = useRoute()

const refreshWindow = () => {
    window.location.reload(true)
}

const getData = async () => {
    try {
        const detail = await api.get(`/project/${linkParams.params.id}`)
        Object.assign(viewProject.detail, detail.data)
        const latest = await api.get('/project/last')
        Object.assign(viewProject.lastest, latest.data)
        const whatsApp = await api.get('/social/whatsapp')
        Object.assign(viewProject.wa, whatsApp.data)
    } catch (error) {
        console.error('Fetching data error', error)
        error = 'Failed to fetch data'
    }
}

const askProject = (chat) => {
    const message = `Hallo, saya tertarik dengan produk No.${chat}`
    const encodeChat = encodeURIComponent(message)
    const waLink = `https://wa.me/${viewProject.wa.content}?text=${encodeChat}`
    window.open(waLink, "_blank")
}

onMounted(() => {
    getData()
})
</script>

<template>
    <h1 class="container w-full justify-start mt-2 text-utama font-bold text-[30px]">
        {{ 'No.' + viewProject.detail.id + ' ' + viewProject.detail.title }}
    </h1>
    <section class="container grid md:grid-cols-3 grid-cols-1 justify-center items-start gap-4 min-h-screen mt-4">
        <div class="flex flex-col col-span-2">
            <img :src="viewProject.detail.url" :alt="viewProject.detail.url" class="rounded-[25px]" />
            <div class="flex w-full justify-end py-2 px-4 items-center">
                <h1 class="text-black font-semibold text-[18px] mr-4">for information :</h1>
                <button @click="askProject(viewProject.detail.id + viewProject.detail.title)"
                    class="transition ease-in-out delay-40 bg-kedua hover:scale-110 hover:bg-kedua duration-200 py-1 px-3 rounded-[25px] drop-shadow-md font-bold text-white">
                    Ask Product
                </button>
            </div>
            <p class="text-black text-[18px] mt-2">{{
                viewProject.detail.deskripsi }}</p>
        </div>
        <div class="flex flex-col mb-4">
            <h1 class="text-utama font-semibold text-[25px]">Recent Project</h1>
            <div v-for="(latestPro, index) in viewProject.lastest" :key="index"
                class="effect flex w-full items-start gap-2 mt-2" @click="refreshWindow">
                <router-link :to="{ name: 'ProjectView', params: { id: latestPro.id } }">
                    <img :src="latestPro.url" :alt="latestPro.url"
                        class="w-[202px] min-w-[202px] max-w-[202px] rounded-[25px]" />
                </router-link>
                <div>
                    <h1 class="text-utama font-semibold text-[18px]">
                        {{ 'No.' + latestPro.id + ' ' + latestPro.title.slice(0, 10) + "..." }}
                    </h1>
                    <p class="text-black text-[15px] lg:text-[17px]">{{
                        latestPro.deskripsi.slice(0, 60) + ' ...' }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.effect:hover {
    @apply transition ease-in-out scale-105 duration-200 cursor-pointer
}
</style>