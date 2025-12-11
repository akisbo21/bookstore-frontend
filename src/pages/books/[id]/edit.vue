<template>
  <v-container>
    <NuxtLink to="/books/list" class="back-link">
      <span class="back-icon"><< &nbsp;</span> Back to list
    </NuxtLink>

    <BookForm
        v-if="book"
        v-model="book"
        :isEdit="true"
        @success="handleSuccess"
        @error="handleError"
    />
  </v-container>
</template>

<script>
import BookForm from '@/components/BookForm.vue'

export default {
  components: { BookForm },

  data() {
    return {
      book: null,
    }
  },

  async mounted() {
    const id = this.$route.params.id

    try {
      this.book = await this.$api.get(`/api/books/${id}`)
    } catch (error) {
      this.$snack.error('Book not found')
      this.$router.push('/books/list')
    }
  },

  methods: {
    handleSuccess() {
      this.$snack.success('Book saved successfully!')
    },
    handleError() {
      this.$snack.error('Saving book failed!')
    },
  },
}
</script>
