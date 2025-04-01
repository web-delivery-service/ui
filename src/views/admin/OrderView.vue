<template>
    <section class="admin-member-wrapper">
        <div class="add-member-btn">
            <v-btn color="green" @click="dialog = true" prepend-icon="mdi-plus">
                Добавить
            </v-btn>
        </div>
        
        <v-table fixed-header height="100vh">
            <thead>
                <tr>
                    <th 
                    v-for="col in columns" 
                    :key="col.field"
                    style="text-align: center;"
                    >
                    {{ col.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="order in orders"
                    :key="order.id"
                    align="center"
                >
                    <td>{{ order.id }}</td>
                    <td>{{ order.user.name }}</td>
                    <td style="max-width: 100px;">{{ order.user.address }}</td>
                    <td>{{ order.cost }}</td>
                    <td>
                        <div class="status" :class="order.status" style="text-align: center;">
                            {{ order.status }}
                        </div>
                    </td>
                    <td>
                        <div class="info" style="text-align: center;">
                            <v-btn icon="mdi-food" color="green" variant="text" @click="openInfo(order)"></v-btn>
                        </div>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <v-dialog
            v-model="dialog"
            max-width="600"
        >
            <v-card>
                <v-card-title>Товары</v-card-title>
                <v-card-text>
                    <v-table fixed-header height="100%">
                        <thead>
                            <tr>
                                <th 
                                v-for="col in productColumns" 
                                :key="col.field"
                                style="text-align: center;"
                                >
                                {{ col.label }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="item in orderItemsProducts"
                                :key="item['id']"
                                align="center"
                            >
                                <td>{{ item['id'] }}</td>
                                <td>{{ item['title'] }}</td>
                                <td>{{ item['quantity'] }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green"
                        variant="text"
                        @click="dialog = false"
                    >
                        Закрыть
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </section>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { storeToRefs } from 'pinia';

    import { useAdminStore } from '../../store/modules/admin';

    const adminStore = useAdminStore();

    const { orders, orderItems, products } = storeToRefs(adminStore);

    const dialog = ref(false);

    const columns = [
        {
            name: 'id',
            label: 'ID',
            field: 'id',
        },
        {
            name: 'name',
            label: 'Имя',
            field: 'name',
        },
        {
            name: 'address',
            label: 'Адрес',
            field: 'address',
        },
        {
            name: 'cost',
            label: 'Стоимость',
            field: 'cost',
        },
        {
            name: 'status',
            label: 'Статус',
            field: 'status',
        },
        {
            name: 'info',
            label: 'Товары',
            field: 'info',
        },
    ];

    const productColumns = [
        {
            name: 'id',
            label: 'ID',
            field: 'id',
        },
        {
            name: 'title',
            label: 'Название',
            field: 'title',
        },
        {
            name: 'quantity',
            label: 'Кол-во',
            field: 'quantity',
        },
    ];

    const orderItemsProducts = computed(() => {
        return orderItems.value.map(item => {
            return products.value.find(product => product.id === item.productId);
        })
    })

    const openInfo = async(order: any) => {
        await adminStore.getOrderItemsByOrderId(order.id).then(() => {
            dialog.value = true;
        })
    }

</script>

<style scoped>

    .admin-member-wrapper {
        padding: 10px;
    }

</style>