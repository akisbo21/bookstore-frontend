<template>
  <v-dialog
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      max-width="400px"
  >
    <v-card>
      <v-card-title class="text-h6">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cancel">Cancel</v-btn>
        <v-btn :color="confirmColor" text @click="confirm">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    modelValue: { type: Boolean, required: true },
    title: { type: String, default: 'Confirm Delete' },
    message: { type: String, default: 'Are you sure?' },
    confirmColor: { type: String, default: 'red' },
  },
  emits: ['update:modelValue', 'confirm', 'cancel'],
  methods: {
    confirm() {
      this.$emit('confirm')
      this.$emit('update:modelValue', false)
    },
    cancel() {
      this.$emit('cancel')
      this.$emit('update:modelValue', false)
    },
  },
}
</script>
