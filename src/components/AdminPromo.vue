<script setup>
import api from "@/Api"
import { reactive, onMounted } from "vue"
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authstore'

const auth = useAuthStore()
const router = useRouter()
const dataPromo = reactive({})
const dataInput = reactive({
    title: "",
    file: null
})

const getPromo = async () => {
    try {
        const response = await api.get('/promo')
        Object.assign(dataPromo, response.data)
    } catch (error) {
        console.log({ msg: message.error })
    }
}

const deletePromo = async (id) => {
    try {
        await api.delete(`/promo/${id}`)
        window.location.reload()
    } catch (error) {
        console.log({ msg: error.message })
    }
}

const fileChange = (e) => {
    dataInput.file = e.target.files[0]
}

const submitPost = async () => {
    try {
        const formData = new FormData()
        formData.append('title', dataInput.title)
        formData.append('promo', dataInput.file)
        const response = await api.post('/promo', formData)
        console.log(response.data)
        console.log(dataInput.file)
        window.location.reload()
    } catch (error) {
        console.log({ msg: error.response.data })
    }
}

const clearForm = () => {
    dataInput.title = ""
    dataInput.file = null
}

onMounted(async () => {
    await auth.userInfo()
    if (auth.isLogin === false) {
        router.push("/login")
    } else {
        getPromo()
    }
})
</script>

<template>
    <main class="container flex flex-col items-center">
        <form @submit.prevent="submitPost">
            <div id="promo-title" label="Title for promo :" label-for="input-title">
                <input id="input-title" type="text" v-model="dataInput.title" placeholder="Title for identity promo"
                    required />
            </div>
            <div id="promo-file" label="Choose image promo :" label-for="input-image">
                <input id="input-image" type="file" @change="fileChange" required />
            </div>
            <button @click="clearForm" variant="outline-secondary">Cancel</button>
            <button type="sumbit" variant="success">Submit</button>
        </form>

        <h1>Data Promo</h1>
        <!-- <section v-for="(promo, index) in dataPromo" :key="index" class="flex justify-between items-start gap-2">
            <BAccordion flush class="w-full">
                <BAccordionItem :title="promo.title">
                    <BImg :src="promo.url" fluid :alt="promo.title" />
                </BAccordionItem>
            </BAccordion>
            <button variant="danger" @click="deletePromo(promo.id)">delete</button>
        </section> -->
        <div v-for="(promo, index) in dataPromo" :key="index"
            class="effect w-[202px] min-w-[202px] max-w-[202px] pb-2 flex flex-col justify-between">
            <img :src="promo.url" :alt="promo.title" class="w-[202px] min-w-[202px] max-w-[202px] rounded-[25px]" />
            <div class="block bg-gray rounded-[25px] mt-4 py-2">
                <h1 class="text-utama text-center font-semibold text-[18px]">
                    {{ 'No.' + promo.id }}
                </h1>
                <h1 class="w-[202px] min-w-[202px] max-w-[202px] text-black text-center font-semibold text-[18px]">
                    {{ promo.title.slice(0, 15) + ' ...' }}
                </h1>
            </div>
            <button @click="deletePromo(promo.id)" variant="danger">delete</button>
        </div>
    </main>
</template>