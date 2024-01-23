<script setup>
const { text, icon } = defineProps({
    text: {
        type: String,
        default: "Icon Popup"
    },
    icon: {
        type: String,
        default: ""
    }
})
</script>

<template>
    <button class="icon whatsapp">
        <h1 class="tooltip">{{ text }}</h1>
        <span>
            <img :src="icon" alt="WA-Icon">
        </span>
    </button>
</template>

<style scoped>
.icon {
    margin: 0 10px;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    z-index: 2;
    transition: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.icon span {
    display: block;
    height: 60px;
    width: 60px;
    background: #fff;
    border-radius: 50%;
    position: relative;
    z-index: 2;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
    transition: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.icon span img {
    line-height: 60px;
    font-size: 25px;
}

.icon .tooltip {
    position: absolute;
    top: 0;
    z-index: 1;
    background: #fff;
    color: #fff;
    padding: 10px 18px;
    font-size: 18px;
    font-weight: 500;
    border-radius: 25px;
    opacity: 0;
    pointer-events: none;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
    transition: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.icon:hover .tooltip {
    top: -100%;
    opacity: 1;
    pointer-events: auto;
}

.icon .tooltip:before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    background: #fff;
    left: 50%;
    bottom: -6px;
    transform: translateX(-50%) rotate(45deg);
    transition: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.icon:hover span {
    color: #fff;
}

.icon:hover span,
.icon:hover .tooltip {
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.4);
}

.whatsapp:hover span,
.whatsapp:hover .tooltip,
.whatsapp:hover .tooltip:before {
    background: #303670;
}
</style>