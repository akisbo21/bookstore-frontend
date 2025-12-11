<template>
  <v-layout>
    <v-main>
    <snack></snack>
    <header>
      <v-toolbar app>
        <v-toolbar-title>
          <NuxtLink to="/" class="text-black text-decoration-none">
            Bookstore
          </NuxtLink>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <NuxtLink :to="`/books/create`" class="mr-6">
          <v-icon color="medium-emphasis" icon="mdi-pencil" size="small"></v-icon>
          Create New Book
        </NuxtLink>
      </v-toolbar>
    </header>
    <slot></slot>
    </v-main>
  </v-layout>
</template>
<script lang="ts">
</script>

<style lang="scss" src="@/assets/css/common.scss"></style>