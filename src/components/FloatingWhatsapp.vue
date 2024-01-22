<template>
    <button @click="handleWhatsapp"
        class="fixed bottom-0 right-0 w-[80px] m-4 transition ease-in-out delay-40 hover:scale-110 duration-200 cursor-pointer">
        <img :src="waIcon" alt="whatsapp">
    </button>
</template>

<script setup>
import waIcon from "@/assets/wa-ori.svg"
import { reactive, onMounted } from 'vue'
import api from '@/Api'


const whatsApp = reactive({
    number: [],
    message: []
})

const getDataWa = async () => {
    try {
        const wa = await api.get('/social/whatsapp')
        Object.assign(whatsApp.number, wa.data)
        const chat = await api.get('/social/navbar')
        Object.assign(whatsApp.message, chat.data)
    } catch (error) {
        console.error('Fetching data error', error)
        error = 'Failed to fetch data'
    }
}

const handleWhatsapp = () => {
    const encodeChat = encodeURIComponent(whatsApp.message.content)
    const waLink = `https://wa.me/${whatsApp.number.content}?text=${encodeChat}`
    window.open(waLink, "_blank")
}

onMounted(() => {
    getDataWa()
})
</script>