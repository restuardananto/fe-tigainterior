<script setup>
import { onMounted } from 'vue'
import Navbar from '@/components/NavAdmin.vue'
import { RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authstore'

const auth = useAuthStore()
const router = useRouter()

onMounted(async () => {
    await auth.userInfo()
    if (auth.isLogin === false) {
        router.push("/login")
    }
})

const handleLogout = async () => {
    await auth.logoutUser()
    if (auth.isLogin === false) {
        router.push("/login")
    }
}
</script>

<template>
    <header class="flex justify-between items-center p-2">
        <Navbar />
        <button @click="handleLogout"
            class="ml-4 transition ease-in-out delay-40 border border-kedua hover:scale-110 duration-200 py-1 px-3 rounded-[25px] drop-shadow-md font-bold text-kedua">
            {{ auth.user.name + ' Logout' }}
        </button>
    </header>
    <main>
        <router-view />
    </main>
</template>