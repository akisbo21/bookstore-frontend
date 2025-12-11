<template>
  <v-snackbar
    v-for="item in $snack.items.value"
    timer="white"
    location="top"
    :color="item.color"
    :class="item.color"
    v-model="item.show"
    close-on-content-click
    z-index="900000000000"
  >
    {{ item.text }}
  </v-snackbar>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {},
  mounted() {},
};
</script>
