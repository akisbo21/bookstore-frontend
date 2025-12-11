<template>
  <v-container>
    <NuxtLink to="/books/list" class="back-link">
      <span class="back-icon"><< &nbsp;</span> Back to list
    </NuxtLink>

    <BookForm
        v-model="book"
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
      book: {},
    }
  },

  methods: {
    handleSuccess(book) {
      this.$snack.success('Book saved successfully!')
      this.$router.push(`/books/${book.id}/edit`)
    },

    handleError() {
      this.$snack.error('Saving book failed!')
    },
  },
}
</script>
