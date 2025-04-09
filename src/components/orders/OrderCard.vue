<template>
    <section class="order-card">
        <div>
            <div>
                ID: <span style="font-weight: bold;">{{ order.id }}</span>
            </div>
            <div>
                СТОИМОСТЬ: <span style="font-weight: bold;">{{ order.cost }}</span>
            </div>
            <div>
                <v-btn icon="mdi-food" color="green" variant="text" @click="openInfo"></v-btn>
            </div>
        </div>
        <div :class="getStatusClass">
            <div>
                {{ getStatus }}
            </div>
        </div>
    </section>
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
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { storeToRefs } from 'pinia';

    import { useAdminStore } from '../../store/modules/admin';

    import { OrderStatusEnum } from '../../interfaces/enums/OrderStatusEnum';
    import type { IOrder } from '../../interfaces/OrderInterface';
    
    const props = defineProps<{
        order: IOrder
    }>()

    const adminStore = useAdminStore();

    const { orderItems, products } = storeToRefs(adminStore);

    const dialog = ref(false);

    const getStatusClass = computed(() => {
        if (props.order.status === OrderStatusEnum.PROCESS) {
            return 'order-card-status process';
        } else if (props.order.status === OrderStatusEnum.ONTHEWAY) {
            return 'order-card-status ontheway';
        } else if (props.order.status === OrderStatusEnum.DELIVERED) {
            return 'order-card-status delivered';
        }
    });

    const getStatus = computed(() => {
        if (props.order.status === OrderStatusEnum.PROCESS) {
            return 'ГОТОВИТСЯ';
        } else if (props.order.status === OrderStatusEnum.ONTHEWAY) {
            return 'В ПУТИ';
        } else if (props.order.status === OrderStatusEnum.DELIVERED) {
            return 'ДОСТАВЛЕН';
        }
    });

    const productColumns = ref([
        { label: 'ID', field: 'id', align: 'center' },
        { label: 'Название', field: 'title', align: 'center' },
        { label: 'Количество', field: 'quantity', align: 'center' },
    ]);

    const openInfo = async() => {
        await adminStore.getOrderItemsByOrderId(props.order.id).then(() => {
            dialog.value = true;
        })
    }

</script>

<style scoped>

    .order-card {
        border: 1px solid #ccc;
        padding: 10px;
        margin: 10px;
        display: flex;
    }

    .order-card-status {
        margin-left: auto;
        font-weight: bold;
        color: #fff;
        padding: 10px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 300px;
        font-size: 25px;
    }

    .process {
        background-color: #FFC107;
    }

    .ontheway {
        background-color: #5b4caf;
    }

    .delivered {
        background-color: #4CAF50;
    }

</style>