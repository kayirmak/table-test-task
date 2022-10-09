<template>
  <div class="main">
    <TableFilter
      :data="data"
      :options="options"
      @filteredByCondition="filteredByCondition($event)"
    />

    <table class="table">

      <thead class="table-thead">
        <tr>
          <th
            v-for="item in options"
            :key="item.name"
          >
            {{item.name}}
            <Sort
              v-if="item.sortColumn"
              :nameColumn="item.sortColumn"
              :symbol="imgArrowUp"
              @sorted="sortTableBy($event)"
            />
            <Sort
              v-if="item.sortColumn"
              :nameColumn="item.sortColumnReverse"
              :symbol="imgArrowDown"
              @sorted="sortTableBy($event)"
            />
          </th>
        </tr>
      </thead>

      <tbody class="table-tbody">
        <tr
          v-for="item in renderData"
          :key="item.id"
        >
          <td>{{item.date}}</td>
          <td>{{item.name}}</td>
          <td>{{item.amount}}</td>
          <td>{{item.distance}}</td>
        </tr>
      </tbody>
      
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Sort from '@/components/Sort.vue'
import TableFilter from '@/components/TableFilter'

import imgArrowUp from '@/assets/img/arrow-up.png'
import imgArrowDown from '@/assets/img/arrow-down.png'

export default {
  name: 'App-Table',

  components: {
    Sort,
    TableFilter
  },

  data() {
    return {
      url: '/all-data',
      filteredData: undefined,
      imgArrowUp,
      imgArrowDown,
      options: [
        {
            name: 'date',
        },
        {
            name: 'name',
            sortColumn: 'byName',
            sortColumnReverse: 'byNameReverse',
        },
        {
            name: 'amount',
            sortColumn: 'byAmount',
            sortColumnReverse: 'byAmountReverse',
        },
        {
            name: 'distance',
            sortColumn: 'byDistance',
            sortColumnReverse: 'byDistanceReverse',
        }
      ]
    }
  },

  methods: {
    ...mapActions([
      'getData'
    ]),

    compare(a, b) {
      let nameA = typeof a === 'string' ? a.toLowerCase() : a,
        nameB = typeof b === 'string' ? b.toLowerCase() : b
      if (nameA > nameB) {
        return 1
      }
      if (nameA < nameB) {
        return -1
      }
      return 0
    },

    sortTableBy(name) {
      let sortedData = this.filteredData ? [...this.filteredData] : [...this.data]
      switch (name) {
        case 'byName': sortedData.sort((a, b) => this.compare(a.name, b.name))
          break;
        case 'byNameReverse': sortedData.sort((a, b) => this.compare(b.name, a.name))
          break;
        case 'byAmount': sortedData.sort((a, b) => this.compare(a.amount, b.amount))
          break;
        case 'byAmountReverse': sortedData.sort((a, b) => this.compare(b.amount, a.amount))
          break;
        case 'byDistance': sortedData.sort((a, b) => this.compare(a.distance, b.distance))
          break;
        case 'byDistanceReverse': sortedData.sort((a, b) => this.compare(b.distance, a.distance))
          break;
        default:
          break;
      }
      this.filteredData = [...sortedData]
    },

    filteredByCondition(filteredData) {
      this.filteredData = filteredData
    }
  },

  computed: {
    ...mapGetters({
      data: 'data'
    }),

    renderData() {
      if (this.filteredData) {
        return this.filteredData
      }
      else if(typeof this.filteredData !== 'undefined') {
        return this.filteredData

      }
      else return this.data
    }
  },
  
  mounted() {
    this.getData(this.url)
  }
}
</script>

<style scoped>
  .table {
    width: 70%;
    margin: 0 auto;
    font-size: 30px;
    text-align: center; 
  }
  .table, table td, table th {
    border: 1px solid #000;
  }
  
</style>
