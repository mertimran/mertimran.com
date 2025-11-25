<script setup lang="ts">
import { withLeadingSlash } from 'ufo'
import type { Collections } from '@nuxt/content'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const localePath = useLocalePath()

const slug = computed(() => withLeadingSlash(String(route.params.slug)))

const { data: page } = await useAsyncData(
    'projects-' + slug.value,
    async () => {
      const collection = ('projects_' + locale.value) as keyof Collections

      return  await queryCollection(collection)
          .path(slug.value)
          .first()
    },
    {
      watch: [locale],
    }
)

const links = [{
  label: $t('projects.link'),
  icon: 'i-lucide-external-link',
  to: page.value?.link
}, {
  label: $t('projects.goBack'),
  icon: 'i-lucide-move-left',
  to: router.options.history.state.back as string || localePath('projects')
}]

</script>

<template>
  <UPage class="mx-4 lg:mx-auto">
    <template #left>
      <UContainer />
    </template>

    <template #default>
      <UPageHeader
          :title="page?.title"
          class="mb-8"
          :links
      />
      <UPageBody>
        <ContentRenderer v-if="page" :value="page" />
        <div v-else>
          <h1>{{ $t("errors.404.title") }}</h1>
          <p>{{ $t("errors.404.subtitle") }}</p>
        </div>
      </UPageBody>

    </template>

    <template #right>
      <UContainer />
    </template>
  </UPage>

</template>
