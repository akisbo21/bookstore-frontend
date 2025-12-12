<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field v-model="model.title" label="Title" required />

    <v-autocomplete
        v-model="model.author_id"
        :items="authors"
        item-title="name"
        item-value="id"
        label="Author"
        v-model:search="authorSearch"
        clearable
        required
    />

    <v-autocomplete
        v-model="model.category_id"
        :items="categories"
        item-title="name"
        item-value="id"
        label="Category"
        v-model:search="categorySearch"
        clearable
        required
    />

    <v-text-field v-model.number="model.price_huf" label="Price (HUF)" type="number" required />

    <DatePicker v-model="model.release_date" label="Release date" />

    <div class="text-right mt-4">
      <v-btn type="submit" color="primary">Save</v-btn>
    </div>
  </v-form>
</template>

<script>
import DatePicker from '@/components/DatePicker.vue'

export default {
  props: {
    modelValue: { type: Object, required: true },
  },
  emits: ['update:modelValue', 'success', 'error'],
  components: { DatePicker },
  data() {
    return {
      authors: [],
      categories: [],
      authorSearch: '',
      categorySearch: '',
      authorTimer: null,
      categoryTimer: null,
      authorController: null,
      categoryController: null,
    }
  },
  computed: {
    model: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      },
    },
  },
  watch: {
    authorSearch(val) {
      clearTimeout(this.authorTimer)

      this.authorTimer = setTimeout(() => {
        this.fetchAuthors(val)
      }, 1000)
    },
    categorySearch(val) {
      clearTimeout(this.categoryTimer)

      this.categoryTimer = setTimeout(() => {
        this.fetchCategories(val)
      }, 1000)
    },
  },
  methods: {
    async fetchAuthors(q) {
      if (this.authorController) {
        this.authorController.abort()
      }

      this.authorController = new AbortController()

      const data = await this.$api.get('/api/authors/autocomplete', {
        params: { query: q },
        signal: this.authorController.signal,
      })

      if (!data) {
        return
      }

      this.authors = Array.isArray(data) ? data : []
    },
    async fetchCategories(q) {
      if (this.categoryController) {
        this.categoryController.abort()
      }

      this.categoryController = new AbortController()

      const data = await this.$api.get('/api/categories/autocomplete', {
        params: { query: q },
        signal: this.categoryController.signal,
      })

      if (!data) {
        return
      }

      this.categories = Array.isArray(data) ? data : []
    },
    async save() {
      try {
        const response = await this.$api.post('/api/books', this.model)
        this.$emit(response.id ? 'success' : 'error', response)
      } catch {
        this.$emit('error')
      }
    },
    onSubmit() {
      this.save()
    },
  },
  mounted() {
    if (this.model.author) {
      this.authors = [this.model.author]
    }

    if (this.model.category) {
      this.categories = [this.model.category]
    }
  }
}
</script>
