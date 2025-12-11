<template>
  <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y>
    <template #activator="{ props }">
      <v-text-field
          v-bind="props"
          :model-value="formattedDate"
          label="Select date"
          readonly
          density="comfortable"
          variant="outlined"
          clearable
      />
    </template>

    <v-date-picker
        v-model="internalDate"
        @update:model-value="emitDate"
        scrollable
    />
  </v-menu>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { parseISO, format, isValid } from 'date-fns'

const props = defineProps({
  modelValue: [String, Date, null],
})
const emit = defineEmits(['update:modelValue'])

const menu = ref(false)
const internalDate = ref(null)

watch(
    () => props.modelValue,
    (val) => {
      const parsed = typeof val === 'string' ? parseISO(val) : val
      internalDate.value = isValid(parsed) ? parsed : null
    },
    { immediate: true }
)

const formattedDate = computed(() => {
  if (!internalDate.value) return ''
  return format(new Date(internalDate.value), 'yyyy-MM-dd')
})

function emitDate(value) {
  // Normalize the date to local timezone
  const localDate = new Date(value);

  // Convert it to UTC by subtracting the timezone offset
  const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);

  // Set the time to midnight (00:00:00)
  utcDate.setHours(0, 0, 0, 0);

  const isoString = utcDate.toISOString(); // Ensure it's in ISO format (UTC)
  emit('update:modelValue', isoString);
  menu.value = false;
}
</script>
