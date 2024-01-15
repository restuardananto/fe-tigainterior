<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="w-full border flex justify-between">
        <router-link :to="{ path: '/admincarousel' }" style="text-decoration: none;">
            <h1>Carousel</h1>
        </router-link>
        <router-link :to="{ path: '/adminpromo' }" style="text-decoration: none;">
            <h1>Promo</h1>
        </router-link>
        <router-link :to="{ path: '/adminproject' }" style="text-decoration: none;">
            <h1>Project</h1>
        </router-link>
    </nav>
</template>