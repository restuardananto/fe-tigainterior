<script setup>
import { reactive, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import api from '@/Api'
import logo from '@/assets/TigaLogo.svg'

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

<template>
    <div class="flex justify-between items-center w-full px-10">
        <router-link :to="{ name: 'Home' }"><img :src='logo' alt="logo"></router-link>
        <router-link :to="{ name: 'Projects' }"
            class="transition ease-in-out delay-40 font-semibold text-utama hover:scale-110 duration-200">
            Projects
        </router-link>
        <button @click="handleWhatsapp"
            class="transition ease-in-out delay-40 bg-kedua hover:scale-110 hover:bg-kedua duration-200 py-1 px-3 rounded-[25px] drop-shadow-md font-bold text-white">Contact</button>
    </div>
</template>