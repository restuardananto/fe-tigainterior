<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authstore'

const auth = useAuthStore()
const router = useRouter()
const user = reactive({
    email: "",
    password: ""
})

const onSubmit = async (event) => {
    event.preventDefault()
    await auth.loginUser({ email: user.email, password: user.password })
    if (auth.isLogin === true) {
        router.push("/admincarousel")
    }
}
</script>

<template>
    <main class="flex justify-center items-center w-screen h-screen">
        <form @submit="onSubmit" class="flex flex-col gap-2 border rounded-md p-4">
            <div id="login-email" label="Email address:" label-for="input-email">
                <input id="input-email" v-model="user.email" type="email" placeholder="Enter email" required />
            </div>
            <div id="login-password" label="Your Name:" label-for="input-password">
                <input id="input-password" v-model="user.password" type="password" placeholder="********" required />
            </div>
            <button type="submit" variant="primary">Sign In</button>
        </form>
    </main>
</template>