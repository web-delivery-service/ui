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
                    v-for="category in categories"
                    :key="category.id"
                    align="center"
                >
                    <td>{{ category.id }}</td>
                    <td>{{ category.title }}</td>
                    <td>
                        <div class="action-btns" style="text-align: center;">
                            <v-btn
                                variant="text"
                                color="primary"
                                icon="mdi-pencil"
                                @click="editCategory(category)"
                            />
                            <v-btn
                                variant="text"
                                color="red"
                                icon="mdi-delete"
                                @click="deleteCategory(category.id)"
                            />
                        </div>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <CreateCategoryForm v-if="dialog" :dialog="dialog" @close-dialog="closeDialog"></CreateCategoryForm>
        <UpdateCategoryForm v-if="editDialog" :dialog="editDialog" :category="editingCategory" @close-dialog="closeDialog"></UpdateCategoryForm>
    </section>
</template>

<script setup lang="ts">

    import { ref, onMounted } from 'vue';
    import { storeToRefs } from 'pinia';

    import CreateCategoryForm from '../../components/admin/CreateCategoryForm.vue';
    import UpdateCategoryForm from '../../components/admin/UpdateCategoryForm.vue';

    import { useAdminStore } from '../../store/modules/admin';

    import type { ICategory } from '../../interfaces/CategoryInterface';

    const columns = [
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
            name: 'action',
            label: 'Действие',
            field: 'action',
        },
    ];

    const adminStore = useAdminStore();

    const { categories } = storeToRefs(adminStore);

    const dialog = ref(false);
    const editDialog = ref(false);
    const editingCategory = ref<ICategory | null>(null);

    const closeDialog = () => {
        dialog.value = false;
        editDialog.value = false;
    }

    const deleteCategory = async (categoryId: number) => {
        await adminStore.deleteCategory(categoryId);
    }

    const editCategory = (category: ICategory) => {
        editingCategory.value = category;
        editDialog.value = true;
    }

</script>

<style scoped>

    .admin-member-wrapper {
        padding: 10px;
    }

</style>