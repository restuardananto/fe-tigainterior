<script setup>
import api from "@/Api"
import { reactive, ref, onMounted } from "vue"
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authstore'

const auth = useAuthStore()
const router = useRouter()
const dataCarousel = reactive([])
const title = ref("")
const file = ref(null)

const getCarousel = async () => {
    try {
        const response = await api.get('/hero')
        Object.assign(dataCarousel, response.data)
    } catch (error) {
        console.log({ msg: message.error })
    }
}

const deleteCarousel = async (id) => {
    try {
        await api.delete(`/hero/${id}`)
        window.location.reload()
    } catch (error) {
        console.log({ msg: error.message })
    }
}

const fileChange = (e) => {
    file.value = e.target.files[0]
}

const submitPost = async () => {
    try {
        const formData = new FormData()
        formData.append('title', title.value)
        formData.append('hero', file.value)
        const response = await api.post('/hero', formData)
        console.log(response.data)
        window.location.reload()
    } catch (error) {
        console.log({ msg: error.response.data })
    }
}

const clearForm = () => {
    title.value = ""
    file.value = null
}

onMounted(async () => {
    await auth.userInfo()
    if (auth.isLogin === false) {
        router.push("/login")
    } else {
        getCarousel()
    }
})

</script>

<template>
    <main class="container flex flex-col items-center">

        <form @submit.prevent="submitPost">
            <div id="carousel-title" label="Title for carousel :" label-for="input-title">
                <input id="input-title" v-model="title" type="text" placeholder="Title for identity carousel" required />
            </div>
            <div id="carousel-file" label="Choose carousel :" label-for="input-image">
                <input id="input-image" @change="fileChange" type="file" required />
            </div>
            <button @click="clearForm" variant="outline-secondary">Cancel</button>
            <button type="submit" variant="success">Submit</button>
        </form>

        <h1>Data Carousel</h1>
        <!-- <section v-for="(hero, index) in dataCarousel" :key="index" class="flex justify-between items-start gap-2">
            <BAccordion flush class="w-full border">
                <BAccordionItem :title="'#' + hero.id + ' ' + hero.title">
                    <BImg :src="hero.url" fluid :alt="hero.title" />
                </BAccordionItem>
            </BAccordion>
            <BButton @click="deleteCarousel(hero.id)" variant="danger" class="mt-2">delete</BButton>
        </section> -->
        <div v-for="(hero, index) in dataCarousel" :key="index"
            class="effect w-[202px] min-w-[202px] max-w-[202px] pb-2 flex flex-col justify-between">
            <img :src="hero.url" :alt="hero.title" class="w-[202px] min-w-[202px] max-w-[202px] rounded-[25px]" />
            <div class="block bg-gray rounded-[25px] mt-4 py-2">
                <h1 class="text-utama text-center font-semibold text-[18px]">
                    {{ 'No.' + hero.id }}
                </h1>
                <h1 class="w-[202px] min-w-[202px] max-w-[202px] text-black text-center font-semibold text-[18px]">
                    {{ hero.title.slice(0, 15) + ' ...' }}
                </h1>
            </div>
            <button @click="deleteCarousel(hero.id)" variant="danger">delete</button>
        </div>
    </main>
</template>