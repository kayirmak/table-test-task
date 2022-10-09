<template>
    <span class="table-sort">
        <button @click="sortTableBy(nameColumn)"><img width="15px" :src="symbol" alt=""></button>
    </span>
</template>

<script>
export default {
    name: 'App-Sort',
    props: {
        nameColumn: {
            required: true,
            type: String
        },
        symbol: {
            required: true,
            type: String
        }
    },
    methods: {
        sortTableBy(name) {
            this.$emit(
                'sorted',
                name
            )
        }
    }
}
</script>

<style scoped>
    .table-sort button {
        border: none;
        background: none;
        cursor: pointer;
    }
    .table-sort button:active {
        transform: scale(.9);
    }
</style>