<script setup>
import { reactive, onMounted, ref, watch } from 'vue';
import api from '@/Api';
import { RouterLink } from 'vue-router'
import SearchIcon from '@/assets/search.svg'

const katProject = reactive({})
const searchQuery = ref("")

const interiorProject = async ({ kategori, }) => {
    try {
        const response = await api.get(`/project/kategori?search=${kategori}`)
        Object.assign(katProject, response.data)
    } catch (error) {
        console.error('Fetching data error', error)
        error = 'Failed to fetch data'
    }
}

const searchProject = async () => {
    const response = await api.get(`/project?search=${searchQuery.value}`)
    Object.assign(katProject, response.data)
}

watch(searchQuery, () => {
    searchProject()
})

onMounted(() => {
    interiorProject({ kategori: `` })
})
</script>

<template>
    <div class="w-[50vw] max-w-[50vw] min-w-[50vw] border border-utama rounded-[25px] h-fit flex px-4 py-2">
        <img :src="SearchIcon" alt="S" />
        <input id="search_project" v-model="searchQuery" placeholder="Search Project ..."
            class="w-full focus:outline-none text-utama font-semibold">
    </div>
    <div class="flex justify-center items-center py-2 gap-8">
        <button @click="interiorProject({ kategori: `` })"
            class="text-utama rounded-[25px] bg-abuabu py-1 px-4 hover:bg-aksen hover:scale-110 transition ease-in-out delay-40 font-bold">
            All
        </button>
        <button @click="interiorProject({ kategori: `interior` })"
            class="text-utama rounded-[25px] bg-abuabu py-1 px-4 hover:bg-aksen hover:scale-110 transition ease-in-out delay-40 font-bold">
            Interior
        </button>
        <button @click="interiorProject({ kategori: `building` })"
            class="text-utama rounded-[25px] bg-abuabu py-1 px-4 hover:bg-aksen hover:scale-110 transition ease-in-out delay-40 font-bold">
            Building
        </button>
        <button @click="interiorProject({ kategori: `design` })"
            class="text-utama rounded-[25px] bg-abuabu py-1 px-4 hover:bg-aksen hover:scale-110 transition ease-in-out delay-40 font-bold">
            Design
        </button>
    </div>
    <div class="max-w-full min-w-full flex flex-col justify-start py-4">
        <!-- <div class="grid grid-cols-5 justify-items-center gap-5"> -->
        <div class="flex flex-wrap justify-center items-start gap-5">
            <div v-for="(allPro, index) in katProject.result" :key="index"
                class="effect w-[202px] min-w-[202px] max-w-[202px] pb-2 flex flex-col justify-end">
                <router-link :to="{ name: 'ProjectView', params: { id: allPro.id } }">
                    <img :src="allPro.url" :alt="allPro.title"
                        class="w-[202px] min-w-[202px] max-w-[202px] rounded-[25px]" />
                    <div class="block bg-abuabu rounded-[25px] mt-4 py-2">
                        <h1 class="text-utama text-center font-semibold text-[18px]">
                            {{ 'No.' + allPro.id }}
                        </h1>
                        <h1
                            class="w-[202px] min-w-[202px] max-w-[202px] text-black text-center font-semibold text-[18px]">
                            {{ allPro.title }}
                        </h1>
                        <h2 class="w-[202px] min-w-[202px] max-w-[202px] text-black text-center text-[15px]">{{
                            allPro.deskripsi.slice(0, 60) + ' ...'
                        }}
                        </h2>
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