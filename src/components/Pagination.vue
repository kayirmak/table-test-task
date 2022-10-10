<template>
  <div class="pagination">
    <button
        @click="prevPage"
        :disabled="pageNumber===0"
    >
        <img
            :src="arrow"
            alt="arrow"
        >
    </button>
    <button
        @click="nextPage"
        :disabled="pageNumber===pageCount-1"
    >
        <img
            :src="arrow"
            alt="arrow"
        >
    </button>
  </div>
</template>

<script>
import arrow from '@/assets/img/arrow.svg'

export default {
    name: 'App-Pagination',
    data() {
        return {
            pageNumber: 0,
            arrow
        }
    },
    props: {
        data: {
            required: true,
            type: Array
        },
        limit: {
            required: false,
            type: Number,
            default: 5
        },
    },

    methods: {
        nextPage() {
            this.pageNumber++
            this.paginatedData()
        },

        prevPage() {
            this.pageNumber--
            this.paginatedData()
        },

        paginatedData() {
            const start = this.pageNumber * this.limit
            const end = start + this.limit
            const dataOnPage = this.data.slice(start, end)
            this.$emit(
                'paginatedData',
                dataOnPage
            )
        }
    },

    computed: {
        pageCount() {
            return Math.ceil(this.data.length / this.limit)
        },

    }
}
</script>

<style scoped>
    .pagination {
        display: flex;
        gap: 10px;
    }
    .pagination button {
        background: none;
        border: 2px solid #000;
        height: 50px;
        border-radius: 3px;
        cursor: pointer;
        transform: scale(1);
        transition: all .1s ease;
    }
    .pagination button:active {
        transform: scale(.9);
    }
    .pagination button:disabled {
        transform: scale(.9);
        background: rgb(185, 185, 185);
        cursor: default;
        border: 1px solid #808080;
    }
    .pagination button:first-child img {
        width: 30px;
        transform: rotate(270deg);
    }
    .pagination button:last-child img {
        width: 30px;
        transform: rotate(90deg);
    }
</style>