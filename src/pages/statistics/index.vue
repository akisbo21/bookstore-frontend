<template>
  <v-container>
    <h1 class="text-h4 mb-6">Statistics</h1>

    <div class="mb-4">
      <v-btn @click="loadExpensiveBooks">Expensive books</v-btn>
      <v-btn class="ml-2" @click="loadPopularCategories">Popular categories</v-btn>
      <v-btn class="ml-2" @click="loadTopFantasySciFi">Top Fantasy & Sci-Fi</v-btn>
    </div>

    <v-data-table
        v-if="Array.isArray(items)"
        :headers="headers"
        :items="items"
        item-key="id"
        class="elevation-1"
    />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: null,
      mode: null,
    }
  },
  computed: {
    headers() {
      if (this.mode === 'categories') {
        return [
          { title: 'Category', value: 'name' },
          { title: 'Average price (HUF)', value: 'avg_price' },
        ]
      }

      return [
        { title: 'ID', value: 'id' },
        { title: 'Title', value: 'title' },
        { title: 'Author', value: 'author.name' },
        { title: 'Category', value: 'category.name' },
        { title: 'Price (HUF)', value: 'price_huf' },
      ]
    },
  },
  methods: {
    async loadExpensiveBooks() {
      this.mode = 'books'
      this.items = await this.$api.get('/api/statistics/expensive-books')
    },
    async loadPopularCategories() {
      this.mode = 'categories'
      this.items = await this.$api.get('/api/statistics/popular-categories')
    },
    async loadTopFantasySciFi() {
      this.mode = 'books'
      this.items = await this.$api.get('/api/statistics/top-fantasy-and-sci-fi')
    },
  },
}
</script>
