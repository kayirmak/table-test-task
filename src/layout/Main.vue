<template>
  <div class="main">
    <Table />
  </div>
</template>

<script>
import Table from '@/components/Table'

export default {
    name: 'App-Main',

    components: {
        Table,
    }
}
</script>

<style scoped>
  .main {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 90%;
    margin: 0 auto;
  }
</style>