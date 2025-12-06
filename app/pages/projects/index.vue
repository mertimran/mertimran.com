<script setup lang="ts">
import type { Collections } from "@nuxt/content";

const { locale } = useI18n();

const { data: projects } = await useAsyncData(
  `projects-all-${locale.value}`,
  async () => {
    const collection = ("projects_" + locale.value) as keyof Collections;
    return await queryCollection(collection).order("date", "DESC").all();
  },
);
</script>

<template>
  <UContainer>
    <UPageHeader :title="$t('projects.title')" class="mb-8 pb-2" />
    <UPageBody>
      <UContainer>
        <UBlogPosts>
          <UBlogPost
            v-for="(post, index) in projects"
            :key="index"
            v-bind="post"
            :to="post.link"
            :description="truncate(post.description, 50)"
          >
            <template #footer>
              <span class="ml-6 font-bold">{{
                $t("projects.technologies")
              }}</span>
              <div class="flex flex-wrap gap-2 mt-2 mb-4 mx-6">
                <UBadge
                  v-for="tag in post.tags"
                  :key="tag"
                  color="neutral"
                  variant="soft"
                  >{{ tag }}</UBadge
                >
              </div>
            </template>
          </UBlogPost>
        </UBlogPosts>
      </UContainer>
    </UPageBody>
  </UContainer>
</template>
