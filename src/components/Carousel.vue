<script setup>
import { ref, onMounted } from 'vue';
import api from '@/Api';

const heroes = ref([])
const currentSlide = ref(0)

const getDisplayHero = async () => {
    try {
        const response = await api.get('/displayhero')
        heroes.value = response.data
    } catch (error) {
        console.log({ msg: error.message })
    }
}

const next = () => {
    if (currentSlide.value === heroes.value.length - 1) {
        currentSlide.value = 0
    } else {
        currentSlide.value++
    }
}

onMounted(() => {
    getDisplayHero()
    setInterval(next, 5000)
})
</script>

<template>
    <div class="w-[80vw] overflow-hidden">
        <div class="flex items-center">
            <div v-for="(hero, index) in heroes" :key="index" v-show="index === currentSlide"
                class="lg:w-[80vw] lg:min-w-[80vw] lg:max-w-[80vw]">
                <img :src="hero.url" alt="" class="rounded-[25px] w-[80vw] h-[60vh] object-fill" />
            </div>
        </div>
    </div>
</template>