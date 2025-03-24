<template>
    <section>
        <v-form>
            <v-text-field 
                variant="outlined"
                label="Название"
            ></v-text-field>

            <v-select
                item-title="title"
                item-value="id"
                label="Категория"
                variant="outlined"
            ></v-select>

            <div class="cost-filter">
                <div>
                    <h4>Цена</h4>
                </div>

                <v-text-field 
                    variant="outlined"
                    label="От"
                ></v-text-field>

                <v-text-field 
                    variant="outlined"
                    label="До"
                ></v-text-field>
            </div>
        </v-form>
    </section>
</template>

<script setup lang="ts">

</script>

<style scoped>
    .cost-filter {
        display: flex;
        gap: 10px;
        
    }

</style>