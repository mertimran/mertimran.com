<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  error: Object as () => NuxtError,
});
const localePath = useLocalePath();

const errorMessages: {
  [key: number]: { statusMessage: string; message: string };
} = {
  404: {
    statusMessage: $t("errors.404.title"),
    message: $t("errors.404.subtitle"),
  },
  500: {
    statusMessage: $t("errors.500.title"),
    message: $t("errors.500.subtitle"),
  },
};
</script>

<template>
  <UError
    :error="{
      statusCode: error?.statusCode,
      statusMessage: errorMessages[error?.statusCode ?? 404]?.statusMessage,
      message: errorMessages[error?.statusCode ?? 404]?.message,
    }"
  >
    <template #links>
      <UButton :to="localePath('/')">{{ $t("errors.goBack") }}</UButton>
    </template>
  </UError>
</template>
