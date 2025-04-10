<template>
    <header class="header" style="background-color: white;">
        <div @click="goHome">
            <img class="header-logo" src="/logo.png" width="44" alt="logo">
        </div>
        <div>
            <h1 style="opacity: 0.9">DELIVERY SERVICE</h1>
        </div>
    </header>
</template>

<script setup lang="ts">

    import router from '../../router';

    const goHome = () => {
        router.push({ name: 'Catalog' });    
    }
    
</script>

<style scoped>

    .header {
        position: fixed;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        width: 100%;
        padding: 10px 20px;
        font-family: 'Courier New', Courier, monospace;
        display: flex;
        gap: 20px;
    }

    .header-logo:hover {
        cursor: pointer;
        transform: scale(1.1);
        transition: all 0.2s;
    }

</style>