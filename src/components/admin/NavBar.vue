<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer
                theme="dark"
            >
                <v-list nav>
                    <v-list-item 
                        v-for="menuItem in menuList" 
                        :prepend-icon="menuItem.icon" 
                        :title="menuItem.title"
                        :to="{ name: menuItem.route }"
                    ></v-list-item>
                </v-list>

                <template v-slot:append>
                    <div class="pa-2">
                        <v-btn color="red" :to="{ name: 'Home' }" block>
                        Выйти
                        </v-btn>
                    </div>
                </template>
            </v-navigation-drawer>
            <v-main style="height: 100vh">
                <router-view></router-view>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup lang="ts">

    import { ref } from 'vue';

    const menuList = [
        {
            icon: 'mdi-list-box',
            title: 'Категории',
            route: 'Categories',
        },
        {
            icon: 'mdi-food',
            title: 'Еда',
            route: 'Products',
        },
        {
            icon: 'mdi-package-check',
            title: 'Заказы',
            route: 'Orders',
        },
        {
            icon: 'mdi-chart-bar',
            title: 'Статистика',
            route: 'Stats',
        },
    ]

</script>

<style scoped>

</style>