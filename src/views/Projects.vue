<script setup>
import { RouterLink } from 'vue-router'
import AllProject from '@/components/AllProject.vue'
</script>

<template>
    <div class="flex flex-col items-center gap-2">
        <h1 class="text-utama font-bold text-[25px] lg:text-[50px] text-center">Karya Kami</h1>
        <h1 className="lg:w-[60vw] text-center text-kedua text-[15px] lg:text-[22px]">
            "Keharmonisan ruang menciptakan keseimbangan keindahan, seperti pondasi yang kokoh yang mengangkat impian ke
            tingkat baru. Dalam desain interior dan teknik sipil, kami menyatukan estetika dan kekuatan untuk menciptakan
            ruang yang tidak hanya berfungsi tetapi juga menginspirasi kehidupan. Rasakan perpaduan sempurna antara bentuk
            dan fungsi dengan Tiga Interior."
        </h1>
        <h1 class="text-utama font-bold">
            <router-link :to="{ path: '/login' }" style="text-decoration: none;" class="cursor-text">
                - Tiga Interior -
            </router-link>
        </h1>
        <AllProject />
    </div>
</template>

