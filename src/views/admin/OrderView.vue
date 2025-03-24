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
                <!-- <tr
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
                                @click="editCategory(member)"
                            />
                            <v-btn
                                variant="text"
                                color="red"
                                icon="mdi-delete"
                                @click="deleteCategory(member.id)"
                            />
                        </div>
                    </td>
                </tr> -->
            </tbody>
        </v-table>
        <!-- <AddMemberForm v-if="dialog" :dialog="dialog" @close-dialog="closeDialog"></AddMemberForm>
        <EditMemberForm v-if="editDialog" :dialog="editDialog" :member="editingMember" @close-dialog="closeDialog"></EditMemberForm> -->
    </section>
</template>

<script setup lang="ts">

    const columns = [
        {
            name: 'id',
            label: 'ID',
            field: 'id',
        },
        {
            name: 'cost',
            label: 'Стоимость',
            field: 'cost',
        },
        {
            name: 'action',
            label: 'Действие',
            field: 'action',
        },
    ];


</script>

<style scoped>

    .admin-member-wrapper {
        padding: 10px;
    }

</style>