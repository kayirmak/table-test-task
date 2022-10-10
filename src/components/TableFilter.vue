<template>
    <div class="table-filter">
        <select 
            id="table-filter__select-column"
            v-model="selectedOption"
            @change="filteredByCondition"
        >
            <option
                v-for="item in columnName"
                :key="item"
                :value="item"
            >
                {{item}}
            </option>
        </select>

        <select
            id="table-filter__select-condition"
            v-model="selectedCondition"
            @change="filteredByCondition"
        >
            <option
                v-for="item in conditions[selectedOption]"
                :key="item"
                :value="item"
            >
                {{item}}
            </option>
        </select>
        <input
            type="text"
            v-model="inputForFilter"
            @change="filteredByCondition"
        >
    </div>
</template>

<script>
export default {
    name: 'App-Filter',

    props: {
        data: {
            required: true,
            type: Array
        },
        options: {
            required: true,
            type: Array
        }
    },

    data() {
        return {
            inputForFilter: '',
            selectedOption: 'name',
            selectedCondition: 'equals',
            conditions:  {
                name: ['equals', 'contains'],
                amount: ['equals', 'contains', 'more', 'less'],
                distance: ['equals', 'contains', 'more', 'less']   
            }
        }
    },

    methods: {
        filteredByCondition() {
            let tmpData = []
            switch (this.selectedCondition) {
                case 'equals': tmpData = this.data.filter(el => el[this.selectedOption].toString().toLowerCase() === this.inputForFilter.toString().toLowerCase())    
                break;
                case 'contains': tmpData = this.data.filter(el => el[this.selectedOption].toString().toLowerCase().includes(this.inputForFilter))
                break;
                case 'more': tmpData = this.data.filter(el => el[this.selectedOption] >= this.inputForFilter)
                break;
                case 'less': tmpData = this.data.filter(el => el[this.selectedOption] <= this.inputForFilter)
                break;
                default:
                    break;
            }
            if (!this.inputForFilter.length) {
                tmpData = undefined   
            }
            this.$emit(
                'filteredByCondition',
                tmpData
            )
        }
    },

    computed: {
        columnName() {
            return Object.keys(this.conditions)
        },
    }
}
</script>

<style scoped>
    .table-filter {
        display: flex;
        gap: 10px;
        height: 40px;
    }
    .table-filter select, .table-filter input {
        width: 15%;
        cursor: pointer;
        border-radius: 4px;
        font-size: 16px;
        outline: none;
        text-transform: capitalize;
    }
</style>