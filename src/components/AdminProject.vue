<script setup>
import api from '@/Api'
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authstore'

const auth = useAuthStore()
const router = useRouter()
const dataProject = reactive({})
const dataInput = reactive({
    id: "",
    title: "",
    deskripsi: "",
    file: null,
    kategori: "Choose project category"
})

const getProject = async () => {
    try {
        const response = await api.get('/project')
        Object.assign(dataProject, response.data)
    } catch (error) {
        console.log({ msg: message.error })
    }
}

const fileChange = (e) => {
    dataInput.file = e.target.files[0]
}

const clearForm = () => {
    dataInput.id = ""
    dataInput.title = ""
    dataInput.deskripsi = ""
    dataInput.kategori = "Choose project category"
    dataInput.file = null
}

const submitPost = async () => {
    if (dataInput.id !== "") {
        try {
            const formData = new FormData()
            formData.append('title', dataInput.title)
            formData.append('deskripsi', dataInput.deskripsi)
            formData.append('kategori', dataInput.kategori)
            const response = await api.patch(`/project/${dataInput.id}`, formData)
            console.log(response.data)
            clearForm()
            window.location.reload()
        } catch (error) {
            console.log({ msg: error.response.data })
        }
    } else {
        try {
            const formData = new FormData()
            formData.append('title', dataInput.title)
            formData.append('deskripsi', dataInput.deskripsi)
            formData.append('foto', dataInput.file)
            formData.append('kategori', dataInput.kategori)
            const response = await api.post('/project', formData)
            console.log(response.data)
            clearForm()
            window.location.reload()
        } catch (error) {
            console.log({ msg: error.response.data })
        }
    }
}

const deleteProject = async (id) => {
    try {
        await api.delete(`/project/${id}`)
        window.location.reload()
    } catch (error) {
        console.log({ msg: error.response.data })
    }
}

const editProject = (id, title, deskripsi, kategori) => {
    dataInput.id = id
    dataInput.title = title
    dataInput.deskripsi = deskripsi
    dataInput.kategori = kategori
}

onMounted(async () => {
    await auth.userInfo()
    if (auth.isLogin === false) {
        router.push("/login")
    } else {
        getProject()
    }
})
</script>

<template>
    <main class="container flex flex-col items-center">
        <form @submit.prevent="submitPost">
            <div id="project-title" label="Title for project :" label-for="input-title">
                <input id="input-title" type="text" v-model="dataInput.title" placeholder="Title for identity carousel"
                    required />
            </div>
            <label id="project-deskripsi" label="Description for project :" label-for="input-deskripsi">
                <input id="input-deskripsi" type="text" v-model="dataInput.deskripsi"
                    placeholder="Description for explain project" required />
            </label>
            <div id="project-file" label="Choose photo :" label-for="input-image">
                <div class="flex">
                    <input id="input-image" type="file" @change="fileChange" />
                    <div class="btn-group">
                        <button type="button" class="dropdown-toggle" data-toggle="dropdown">
                            <span v-text="dataInput.kategori"></span>
                            <span class="caret"></span>
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#" @click="dataInput.kategori = 'desain'">Desain</a>
                            <a class="dropdown-item" href="#" @click="dataInput.kategori = 'proses'">Proses</a>
                            <a class="dropdown-item" href="#" @click="dataInput.kategori = 'hasil'">Hasil</a>
                        </div>
                    </div>
                </div>
            </div>
            <button @click="clearForm" variant="outline-secondary">Cancel</button>
            <button type="submit" variant="success">Submit</button>
        </form>

        <h1>Data Project</h1>
        <!-- <section v-for="(project, index) in dataProject.result" :key="index" class="flex justify-between items-start gap-2">
            <div class="w-full accordion">
                <div class="accordion-item" :title="project.title + ' (' + project.kategori + ')'">
                    <p>{{ project.deskripsi }}</p>
                    <img :src="project.url" fluid :alt="project.title" />
                </div>
            </div>
            <button @click="editProject(project.id, project.title, project.deskripsi, project.kategori)"
                variant="outline-warning">edit
            </button>
            <button @click="deleteProject(project.id)" variant="danger">delete</button>
        </section> -->
        <div
            class="max-w-full min-w-[50vw] justify-center flex scroll scroll-smooth overflow-scroll scrollbar-hide py-4 px-4">
            <div class="flex items-end gap-4">
                <div v-for="(project, index) in dataProject.result" :key="index"
                    class="effect w-[202px] min-w-[202px] max-w-[202px] pb-2 flex flex-col justify-between">
                    <img :src="project.url" :alt="project.title"
                        class="w-[202px] min-w-[202px] max-w-[202px] rounded-[25px]" />
                    <div class="block bg-gray rounded-[25px] mt-4 py-2">
                        <h1 class="text-utama text-center font-semibold text-[18px]">
                            {{ 'No.' + project.id }}
                        </h1>
                        <h1 class="w-[202px] min-w-[202px] max-w-[202px] text-black text-center font-semibold text-[18px]">
                            {{ project.title.slice(0, 15) + ' ...' }}
                        </h1>
                    </div>
                    <div class="flex w-full justify-center gap-2">
                        <button @click="editProject(project.id, project.title, project.deskripsi, project.kategori)"
                            variant="outline-warning">edit
                        </button>
                        <button @click="deleteProject(project.id)" variant="danger">delete</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>