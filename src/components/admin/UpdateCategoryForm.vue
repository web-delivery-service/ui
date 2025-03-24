<template>
    <div class="pa-4 text-center">
        <v-dialog
        v-model="props.dialog"
        max-width="600"
        >
            <v-card
                prepend-icon="mdi-list-box"
                title="Изменить категорию"
            >
                <v-card-text>

                    <v-sheet class="mx-auto">
                        <v-form fast-fail @submit.prevent>

                            <v-text-field
                                v-model="categoryUpdateForm.title"
                                label="Название"
                                required
                            ></v-text-field>

                            <v-divider></v-divider>

                            <v-card-actions style="display: block; text-align: right; padding-top: 20px;">
                                <v-btn
                                    text="Закрыть"
                                    variant="plain"
                                    @click="closeDialog"
                                ></v-btn>

                                <v-btn
                                    type="submit"
                                    color="primary"
                                    variant="tonal"
                                    text="Изменить"
                                    @click="updateCategory"
                                ></v-btn>
                            </v-card-actions>
                            
                        </v-form>
                    </v-sheet>

                </v-card-text>
                
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
    import { reactive } from 'vue';

    import { useAdminStore } from '../../store/modules/admin';
    import type { ICategoryUpdate, ICategory } from '../../interfaces/CategoryInterface';
    
    const props = defineProps<{
        dialog: Boolean,
        category: ICategory | null
    }>()

    const adminStore = useAdminStore();

    const categoryUpdateForm = reactive<ICategoryUpdate>({
        title: props.category.title,
    })

    const emit = defineEmits(['closeDialog']);

    const closeDialog = () => {
        emit('closeDialog');
    }

    const updateCategory = async () => {
        await adminStore.updateCategory(categoryUpdateForm, props.category.id).then(() => {
            closeDialog();
        });
    }

</script>

<style scoped>

</style>