<template>
    <section class="admin-member-wrapper">        
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
                        <div :class="order.status" style="text-align: center;" @click="updateStatus(order)">
                            {{ getStatusTitle(order.status) }}
                        </div>
                        <span>
                            <v-btn :disabled="order.status != 'DELIVERED'" icon="mdi-delete" color="red" variant="text" @click="deleteOrder(order)"></v-btn>
                        </span>
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
                                v-for="item in orderItems"
                                :key="item.productId"
                                align="center"
                            >
                                <td>{{ item.productId }}</td>
                                <td>{{ products.find(product => product.id === item.productId)?.title }}</td>
                                <td>{{ item.quantity }}</td>
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
    import { OrderStatusEnum } from '../../interfaces/enums/OrderStatusEnum';

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

    const getStatusTitle = (status: string) => {
        switch (status) {
            case 'PROCESS':
                return 'ГОТОВИТСЯ';
            case 'ONTHEWAY':
                return 'В ПУТИ';
            case 'DELIVERED':
                return 'ДОСТАВЛЕН';
        }
    }

    const openInfo = async(order: any) => {
        await adminStore.getOrderItemsByOrderId(order.id).then(() => {
            dialog.value = true;
        })
    }

    const updateStatus = async(order: any) => {
        let status: OrderStatusEnum = order.status;
        switch (order.status) {
            case OrderStatusEnum.PROCESS:
                status = OrderStatusEnum.ONTHEWAY;
                break;
            case OrderStatusEnum.ONTHEWAY:
                status = OrderStatusEnum.DELIVERED;
                break;
            case OrderStatusEnum.DELIVERED:
                return;
        }
        
        await adminStore.updateStatus(order.id, status);
    }

    const deleteOrder = async(order: any) => {
        await adminStore.deleteOrder(order.id);
    }

</script>

<style scoped>

    .admin-member-wrapper {
        padding: 10px;
    }

    .PROCESS {
        background-color: #FFC107;
        color: #fff;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        display: inline-block;
        width: 250px;
    }

    .ONTHEWAY {
        background-color: #5b4caf;
        color: #fff;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        display: inline-block;
        width: 250px;
    }

    .DELIVERED {
        background-color: #4CAF50;
        color: #fff;
        padding: 10px;
        border-radius: 5px;
        opacity: 0.5;
        display: inline-block;
        width: 250px;
    }

</style>