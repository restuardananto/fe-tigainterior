<script setup>
import Carousel from '@/components/Carousel.vue'
import SubLogo from '@/assets/tiga-sublogo.svg'
import Explain from '@/assets/explain.svg'
import LastProject from '@/components/LastProject.vue'
import Promo from '@/components/Promo.vue'

const wa = "6282158570575"
const chat = "Halo TigaInterior - Bagaimana cara saya memesan jasa Tiga Interior"

const handleWhatsapp = () => {
    const encodeChat = encodeURIComponent(chat)
    const waLink = `https://wa.me/${wa}?text=${encodeChat}`
    window.open(waLink, "_blank")
}
</script>

<template>
    <div class="container flex flex-col items-center">
        <h1 class="text-utama font-bold text-[25px] lg:text-[50px] mb-[10px] text-center">
            Designing Dreams, Building Realities
        </h1>
        <Carousel />
        <section class="flex justify-center gap-0 my-4">
            <img :src="SubLogo" alt="SubLogo" />
            <div class="flex flex-col items-start justify-center ml-4 max-w-[50vw]">
                <h1 class="text-utama text-[15px] lg:text-[25px]">
                    Welcome to Tiga Interior where creativity meets craftsmanship. Explore our world of innovative interior
                    design and precision construction
                </h1>
                <button @click="handleWhatsapp"
                    class="transition ease-in-out delay-40 border border-kedua hover:scale-110 hover:border-kedua duration-200 py-1 px-3 rounded-[25px] drop-shadow-md font-bold text-kedua">Book
                    Now</button>
            </div>
        </section>
        <section class="justify-center flex items-center gap-0 my-4">
            <div class="flex flex-col items-end mr-4">
                <h1 class="text-end text-utama font-bold text-[20px] md:text-[32px] md:max-w-[40vw]">Elevate your living
                    spaces with our
                    bespoke interior design solutions</h1>
                <h2 class="text-end text-black text-[12px] md:text-[18px] md:max-w-[40vw]">Get to know Tiga Interior,
                    your partner in
                    crafting exceptional interiors and
                    constructing dreams into
                    reality</h2>
            </div>
            <img :src="Explain" alt="explain image" class="lg:w-[402px] w-[202px]" />
        </section>
        <LastProject />
        <Promo />
    </div>
    <section class="w-full flex flex-col justify-center items-center py-[10vh] bg-abuabu">
        <h1 class="lg:w-[50vw] text-center text-utama text-[35px] font-bold">Crafted with exelent material</h1>
        <h2 class="lg:w-[50vw] text-center text-black text-[18px]">Part of the Tiga Putera Konstruksi where this company
            is
            more specialized in
            assisting clients in providing the
            best design and material selection from aesthetic to functional.</h2>
    </section>
</template>