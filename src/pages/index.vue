<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center text-center">
    <v-row>
      <v-col cols="12">
        <h1 class="display-2 font-weight-bold mb-4">Welcome to Bookstore</h1>
        <p class="subtitle-1 mb-6">Easily manage your books with a clean and simple interface.</p>
        <div>
          <NuxtLink to="/books/list">
            <v-btn color="primary" class="mr-4" large>
              View Books
            </v-btn>
          </NuxtLink>
          <NuxtLink to="/books/create">
            <v-btn color="secondary" large>
              Create Book
            </v-btn>
          </NuxtLink>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
