<template>
    <div class="pa-4 text-center">
        <v-dialog
        v-model="props.dialog"
        max-width="600"
        >
            <v-card
                prepend-icon="mdi-list-box"
                title="Добавить категорию"
            >
                <v-card-text>

                    <v-sheet class="mx-auto">
                        <v-form fast-fail @submit.prevent>

                            <v-text-field
                                v-model="categoryCreateForm.title"
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
                                    text="Добавить"
                                    @click="createCategory"
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
    import type { ICategoryCreate } from '../../interfaces/CategoryInterface';
    
    const props = defineProps<{
        dialog: boolean,
    }>()

    const adminStore = useAdminStore();

    const categoryCreateForm = reactive<ICategoryCreate>({
        title: '',
    })

    const emit = defineEmits(['closeDialog']);

    const closeDialog = () => {
        emit('closeDialog');
    }

    const createCategory = async () => {
        await adminStore.createCategory(categoryCreateForm).then(() => {
            closeDialog();
        });
    }

</script>

<style scoped>

</style>