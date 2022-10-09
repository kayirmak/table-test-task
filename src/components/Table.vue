<template>
  <table class="table">
    <thead class="table-thead">
      <tr>
        <th>Date</th>
        <th>
          Name
          <Sort nameColumn="byName" :symbol="imgArrowUp" @sorted="sortTableBy($event)" />
          <Sort nameColumn="byNameReverse" :symbol="imgArrowDown" @sorted="sortTableBy($event)" />
        </th>
        <th>
          Amount
          <Sort nameColumn="byAmount" :symbol="imgArrowUp" @sorted="sortTableBy($event)" />
          <Sort nameColumn="byAmountReverse" :symbol="imgArrowDown" @sorted="sortTableBy($event)" />
        </th>
        <th>
          Distance
          <Sort nameColumn="byDistance" :symbol="imgArrowUp" @sorted="sortTableBy($event)" />
          <Sort nameColumn="byDistanceReverse" :symbol="imgArrowDown" @sorted="sortTableBy($event)" />
        </th>
      </tr>
    </thead>
    <tbody class="table-tbody">
      <tr v-for="item in renderData" :key="item.id">
        <td>{{item.date}}</td>
        <td>{{item.name}}</td>
        <td>{{item.amount}}</td>
        <td>{{item.distance}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Sort from '@/components/Sort.vue'

import imgArrowUp from '@/assets/img/arrow-up.png'
import imgArrowDown from '@/assets/img/arrow-down.png'

export default {
  name: 'App-Table',

  components: {
    Sort
  },

  data() {
    return {
      url: '/all-data',
      sortedData: [],
      imgArrowUp,
      imgArrowDown
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
      let sortedData = [...this.data]
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
      this.sortedData = [...sortedData]
    }   
  },

  computed: {
    ...mapGetters({
      data: 'data'
    }),
    renderData() {
      if (this.sortedData.length) {
        return this.sortedData
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
