<template>
    <div class="pa-4 text-center">
        <v-dialog
        v-model="props.dialog"
        max-width="600"
        >
            <v-card
                prepend-icon="mdi-food"
                title="Добавить еду"
            >
                <v-card-text>

                    <v-sheet class="mx-auto">
                        <v-form v-model="form" fast-fail @submit.prevent>

                            <v-text-field
                                v-model="productCreateForm.title"
                                label="Название"
                                :rules="fieldRules"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="productCreateForm.cost"
                                label="Цена"
                                type="number"
                                :rules="fieldRules"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="productCreateForm.quantity"
                                label="Кол-во"
                                type="number"
                                :rules="fieldRules"
                                required
                            ></v-text-field>

                            <v-select
                                v-model="productCreateForm.categoryId"
                                :items="categorieTitles"
                                item-title="title"
                                item-value="id"
                                label="Категория"
                                :rules="fieldRules"
                                required
                            ></v-select>

                            <v-textarea
                                v-model="productCreateForm.info"
                                label="Описание"
                            ></v-textarea>

                            <v-file-input
                                v-model="imageFile"
                                accept="image/png, image/jpeg, image/bmp, image/jpg, image/webp"
                                label="Картинка"
                                clearable
                            ></v-file-input>

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
                                    @click="createProduct"
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
    import { reactive, ref } from 'vue';
    import { storeToRefs } from 'pinia';

    import { fieldRules } from '../../utils/rules';
    import { useAdminStore } from '../../store/modules/admin';
    import type { IProductCreate } from '../../interfaces/ProductInterface';
    
    const props = defineProps<{
        dialog: boolean,
    }>()

    const adminStore = useAdminStore();
    const { categories } = storeToRefs(adminStore);
    const categorieTitles = categories.value.map(category => category.title);

    const productCreateForm = reactive<IProductCreate>({
        title: '',
        categoryId: null,
        quantity: 1,
        cost: null,
        info: null
    })

    const imageFile = ref<File | null>(null);

    const form = ref(false);

    const emit = defineEmits(['closeDialog']);

    const closeDialog = () => {
        emit('closeDialog');
    }

    const createProduct = async () => {
        if (!form.value) {
            return;
        }
        productCreateForm.categoryId = await adminStore.getCategoryByTitle(productCreateForm.categoryId)?.id;
        await adminStore.createProduct(productCreateForm).then((productId) => {
            console.log(productId);
            if (imageFile.value) {
                adminStore.uploadProductImage(imageFile.value, productId).then(() => {
                    closeDialog();
                });
            } else {
                closeDialog();
            }
        });
    }

</script>

<style scoped>

</style>