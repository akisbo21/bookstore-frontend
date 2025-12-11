<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="books"
        item-key="id"
        class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Books</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex ga-2 justify-end">
          <NuxtLink :to="`/books/${item.id}/edit`">
            <v-icon color="medium-emphasis" icon="mdi-pencil" size="small"></v-icon>
          </NuxtLink>

          <v-icon
              color="medium-emphasis"
              icon="mdi-delete"
              size="small"
              @click="confirmDelete(item.id)"
          ></v-icon>
        </div>
      </template>
    </v-data-table>

    <ConfirmDialog
        v-model="isDeleteDialogOpen"
        title="Confirm Delete"
        :message="deleteMessage"
        @confirm="deleteBook"
        @cancel="cancelDelete"
    />
  </v-container>
</template>

<script>
import ConfirmDialog from '@/components/ConfirmDialog.vue'

export default {
  components: { ConfirmDialog },

  data() {
    return {
      headers: [
        { title: 'ID', align: 'start', value: 'id', sortable: true },
        { title: 'Title', align: 'start', value: 'title', sortable: true },
        { title: 'Author', align: 'start', value: 'author_id', sortable: true },
        { title: 'Category', align: 'start', value: 'category_id', sortable: true },
        { title: 'Release Date', align: 'start', value: 'release_date', sortable: true },
        { title: 'Price (HUF)', align: 'start', value: 'price_huf', sortable: true },
        { title: 'Actions', align: 'center', value: 'actions' },
      ],
      books: [],
      isDeleteDialogOpen: false,
      bookToDeleteId: null,
      deleteMessage: '',
    }
  },

  methods: {
    confirmDelete(id) {
      this.bookToDeleteId = id
      this.deleteMessage = `Delete book with ID ${id}?`
      this.isDeleteDialogOpen = true
    },

    async deleteBook() {
      try {
        await this.$api.delete(`/api/books/${this.bookToDeleteId}`)
        this.books = this.books.filter(b => b.id !== this.bookToDeleteId)
        this.$snack.success('Book deleted.')
      } catch (e) {
        this.$snack.error('Failed to delete book.')
      } finally {
        this.isDeleteDialogOpen = false
        this.bookToDeleteId = null
      }
    },

    cancelDelete() {
      this.isDeleteDialogOpen = false
      this.bookToDeleteId = null
    },
  },

  async mounted() {
    try {
      this.books = await this.$api.get('/api/books/search?query=')
    } catch (error) {
      console.error('Error fetching books:', error)
    }
  },
}
</script>

<style lang="scss" src="@/assets/css/books/list.scss"></style>
