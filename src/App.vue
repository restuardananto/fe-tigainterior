<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Foot from '@/components/Footer.vue'
</script>

<template>
  <header class="flex justify-center max-w-screen py-1">
    <NavBar />
  </header>
  <main class="flex flex-col items-center max-w-screen">
    <RouterView />
  </main>
  <footer class="flex justify-center max-w-screen bg-gray">
    <Foot />
  </footer>
</template>
