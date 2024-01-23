<script setup>
import { reactive, onMounted } from 'vue'
import api from '@/Api'

const promo = reactive({})

const getPromo = async () => {
    try {
        const response = await api.get('/displaypromo')
        Object.assign(promo, response.data)
    } catch (error) {
        console.log({ msg: error.message })
    }
}

onMounted(() => {
    getPromo()
})
</script>

<template>
    <div class="w-full flex flex-col items-start py-2">
        <h1 class="text-start text-utama font-semibold text-[25px]">Penawaran Spesial</h1>
        <p class="text-start text-black text-[15px]">
            Waktu Terbatas! Jangan lewatkan kesempatan terbatas ini untuk memiliki interior istimewa dari Tiga Interior
        </p>
    </div>
    <div class="max-w-full min-w-full flex scroll scroll-smooth overflow-x-scroll scrollbar-hide mb-10">
        <div class="flex items-start gap-4">
            <div v-for="(Promos, index) in promo" :key="index" class="w-[525px] min-w-[525px] max-w-[525px] py-2">
                <img :src="Promos.url" alt="promo"
                    class="w-[525px] min-w-[525px] max-w-[525px] max-h-[180px] min-h-[180px] h-[180px] rounded-[25px]" />
            </div>
        </div>
    </div>
</template>