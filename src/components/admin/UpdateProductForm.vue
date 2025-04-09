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
                                v-model="productUpdateForm.title"
                                label="Название"
                                :rules="fieldRules"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="productUpdateForm.cost"
                                label="Цена"
                                type="number"
                                :rules="fieldRules"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="productUpdateForm.quantity"
                                label="Кол-во"
                                type="number"
                                :rules="fieldRules"
                                required
                            ></v-text-field>

                            <v-select
                                v-model="productUpdateForm.categoryId"
                                :items="categories"
                                item-title="title"
                                item-value="id"
                                label="Категория"
                                :rules="fieldRules"
                                required
                            ></v-select>

                            <v-textarea
                                v-model="productUpdateForm.info"
                                label="Описание"
                            ></v-textarea>

                            <v-file-input
                                v-model="imageFile"
                                accept="image/png, image/jpeg, image/bmp, image/jpg, image/webp"
                                label="Картинка"
                                required
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
                                    @click="updateProduct"
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
    import { reactive, onMounted, ref } from 'vue';
    import { storeToRefs } from 'pinia';

    import { useAdminStore } from '../../store/modules/admin';
    import type { IProductUpdate, IProduct } from '../../interfaces/ProductInterface';
    import { fieldRules } from '../../utils/rules';

    const props = defineProps<{
        dialog: Boolean,
        product: IProduct | null
    }>()

    const adminStore = useAdminStore();
    const { categories } = storeToRefs(adminStore);

    const productUpdateForm = reactive<IProductUpdate>({
        title: props.product.title,
        categoryId: props.product.categoryId,
        quantity: props.product.quantity,
        cost: props.product.cost,
        info: props.product.info
    })

    const imageFile = ref<File | null>(null);

    const form = ref(false);

    const emit = defineEmits(['closeDialog']);

    const closeDialog = () => {
        emit('closeDialog');
    }

    const updateProduct = async () => {
        if (!form.value) {
            return;
        }
        productUpdateForm.categoryId = await adminStore.getCategoryByTitle(productUpdateForm.categoryId)?.id;
        await adminStore.updateProduct(productUpdateForm, props.product.id).then(() => {
            if (imageFile.value) {
                adminStore.uploadProductImage(imageFile.value, props.product.id).then(() => {
                    closeDialog();
                });
            } else {
                closeDialog();
            }
        });
    }

    onMounted(() => {
        // category_id to title
    })

</script>

<style scoped>

</style>