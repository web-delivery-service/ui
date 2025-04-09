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
                    v-for="product in products"
                    :key="product.id"
                    align="center"
                >
                    <td>{{ product.id }}</td>
                    <td>{{ product.title }}</td>
                    <td>{{ product.categoryId }}</td>
                    <td>{{ product.quantity }}</td>
                    <td>{{ product.cost }}</td>
                    <td>{{ product.info }}</td>
                    <td>
                        <div class="action-btns" style="text-align: center;">
                            <v-btn
                                variant="text"
                                color="primary"
                                icon="mdi-pencil"
                                @click="editProduct(product)"
                            />
                            <v-btn
                                variant="text"
                                color="red"
                                icon="mdi-delete"
                                @click="deleteProduct(product.id)"
                            />
                        </div>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <CreateProductForm v-if="dialog" :dialog="dialog" @close-dialog="closeDialog"></CreateProductForm>
        <UpdateProductForm v-if="editDialog" :dialog="editDialog" :product="editingProduct" @close-dialog="closeDialog"></UpdateProductForm>
    </section>
</template>

<script setup lang="ts">

    import { ref, onMounted } from 'vue';
    import { storeToRefs } from 'pinia';

    import { useAdminStore } from '../../store/modules/admin';

    import CreateProductForm from '../../components/admin/CreateProductForm.vue';
    import UpdateProductForm from '../../components/admin/UpdateProductForm.vue';

    import type { IProduct } from '../../interfaces/ProductInterface';

    const columns = [
        {
            name: 'id',
            label:  'ID',
            field: 'id',
        },
        {
            name: 'title',
            label: 'Название',
            field: 'title',
        },
        {
            name: 'category',
            label: 'Категория',
            field: 'category',
        },
        {
            name: 'quantity',
            label: 'Кол-во',
            field: 'quantity',
        },
        {
            name: 'cost',
            label: 'Стоимость',
            field: 'cost',
        },
        {
            name: 'info',
            label: 'Информация',
            field: 'info',
        },
        {
            name: 'action',
            label: 'Действие',
            field: 'action',
        },
    ];

    const adminStore = useAdminStore();
    const { products } = storeToRefs(adminStore);

    const dialog = ref(false);
    const editDialog = ref(false);
    const editingProduct = ref<IProduct | null>(null);

    const closeDialog = () => {
        dialog.value = false;
        editDialog.value = false;
    }

    const deleteProduct = async (productId: number) => {
        await adminStore.deleteProductImage(productId).then(() => {
            adminStore.deleteProduct(productId);
        })
    }

    const editProduct = (product: IProduct) => {
        editingProduct.value = product;
        editDialog.value = true;
    }
</script>

<style scoped>

    .admin-member-wrapper {
        padding: 10px;
    }

</style>