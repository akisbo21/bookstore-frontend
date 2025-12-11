const Snack = function (nuxt) {
  const self = this;
  self.nuxt = nuxt;
  self.items = ref([]);
  self.index = 0;

  self.success = (message) => {
    self.add(message, "success");
  };
  self.error = (message) => {
    self.add(message, "red-lighten-1");
  };

  self.add = (message, color) => {
    for (let item of self.items.value) {
      item.show = false;
    }
    self.items.value.push({
      id: self.index++,
      text: message,
      color: color,
      show: true,
    });
  };
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("snack", new Snack(nuxtApp));
});
