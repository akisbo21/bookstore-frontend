<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field
        v-model="model.title"
        label="Title"
        required
    />

    <v-text-field
        v-model.number="model.author_id"
        label="Author ID"
        type="number"
        required
    />

    <v-text-field
        v-model.number="model.category_id"
        label="Category ID"
        type="number"
        required
    />

    <v-text-field
        v-model.number="model.price_huf"
        label="Price (HUF)"
        type="number"
        required
    />

    <DatePicker
        v-model="model.release_date"
        label="Release date"
    />

    <div class="text-right mt-4">
      <v-btn type="submit" color="primary">
        Save
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import DatePicker from '@/components/DatePicker.vue'

export default {
  props: {
    modelValue: { type: Object, required: true },
    isEdit: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'success', 'error'],
  components: { DatePicker },
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
  methods: {
    async save() {
      try {
        const response = await this.$api.post(`/api/books`, this.model)
        if (response.id) {
          this.$emit('success', response)
        } else {
          this.$emit('error')
        }
      } catch {
        this.$emit('error')
      }
    },
    onSubmit() {
      this.save()
    },
  },
}
</script>
