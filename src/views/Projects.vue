<script setup>
import { RouterLink } from 'vue-router'
import AllProject from '@/components/AllProject.vue'
</script>

<template>
    <div class="flex flex-col items-center gap-2">
        <h1 class="text-utama font-bold text-[25px] lg:text-[50px] text-center">Our Projects</h1>
        <h1 className="lg:w-[60vw] text-center text-kedua text-[15px] lg:text-[22px]">
            "The harmony of space creates a balance of beauty, much like a sturdy
            foundation elevating dreams to new heights. In interior design and
            civil engineering, we blend aesthetics and strength to craft spaces
            that not only function but also inspire life"
        </h1>
        <h1 class="text-utama font-bold">
            <router-link :to="{ path: '/login' }" style="text-decoration: none;" class="cursor-text">
                - Tiga Interior -
            </router-link>
        </h1>
        <AllProject />
    </div>
</template>

