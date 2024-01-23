<script setup>
import { reactive, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import api from '@/Api'
import logo from '@/assets/TigaLogo.svg'
import whatsApp from '@/assets/wa-ori.svg'
import instagram from '@/assets/instagram-ori.svg'
import maps from '@/assets/maps-gps.svg'
import IconPopup from './IconPopup.vue'

const dataSocial = reactive({
    maps: [],
    number: [],
    message: [],
    instagram: []
})

const getDataSocial = async () => {
    try {
        const wa = await api.get('/social/whatsapp')
        Object.assign(dataSocial.number, wa.data)
        const chat = await api.get('/social/footer')
        Object.assign(dataSocial.message, chat.data)
        const ig = await api.get('/social/instagram')
        Object.assign(dataSocial.instagram, ig.data)
        const map = await api.get('/social/maps')
        Object.assign(dataSocial.maps, map.data)
    } catch (error) {
        console.error('Fetching data error', error)
        error = 'Failed to fetch data'
    }
}

const openMaps = () => {
    window.open(dataSocial.maps.content, "_blank")
}

const handleWhatsapp = () => {
    const encodeChat = encodeURIComponent(dataSocial.message.content)
    const waLink = `https://wa.me/${dataSocial.number.content}?text=${encodeChat}`
    window.open(waLink, "_blank")
}

const handleInstagram = () => {
    window.open(dataSocial.instagram.content, 'instagram')
}

onMounted(() => {
    getDataSocial()
})
</script>

<template>
    <div class="w-full flex justify-between bg-abuabu items-center py-[10vh] px-10">
        <div class="flex flex-col">
            <router-link :to="{ name: 'Home' }"><img :src='logo' alt="logo"></router-link>
        </div>
        <div class="flex flex-col w-[252px] min-w-[252px] max-w-[252px] gap-2">
            <div class="flex w-full py-2 justify-center">
                <icon-popup @click="handleWhatsapp" text="WhatsApp" :icon="whatsApp" />
                <icon-popup @click="handleInstagram" text="Instagram" :icon="instagram" />
                <icon-popup @click="openMaps" text="Maps" :icon="maps" />
            </div>
            <p class="text-center">Jl. Jrobang Selatan No.II, Ngesrep, Kec. Banyumanik, Kota Semarang, Jawa Tengah 50261</p>
            <!-- <button @click="openMaps"
                class="transition ease-in-out delay-40 border border-kedua hover:scale-110 hover:border-kedua duration-200 py-1 px-3 rounded-[25px] drop-shadow-md font-bold text-kedua">Open
                Map</button> -->
        </div>
    </div>
</template>