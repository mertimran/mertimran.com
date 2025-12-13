<script setup lang="ts">
import type { Collections } from "@nuxt/content";

useHead({
  title: $t("nav.home"),
  meta: [
    { name: "description", content: "Portfolio website of Mert İmran" },
    { property: "og:title", content: $t("nav.home") },
    { property: "og:description", content: "Portfolio website of Mert İmran" },
  ],
});

const timeline = ref([
  {
    date: `${$t("months.june")}, 2026`,
    title: $t("experience.graduation.title"),
    description: $t("experience.graduation.description"),
    icon: "i-lucide-graduation-cap",
  },
  {
    date: `${$t("months.february")}, 2024`,
    title: $t("experience.professional.title"),
    description: $t("experience.professional.description"),
    icon: "i-lucide-code",
  },
  {
    date: `${$t("months.september")}, 2022`,
    title: $t("experience.university.title"),
    description: $t("experience.university.description"),
    icon: "i-lucide-university",
  },
  {
    date: `${$t("months.january")}, 2019`,
    title: $t("experience.servers.title"),
    description: $t("experience.servers.description"),
    icon: "i-lucide-server",
  },
  {
    date: `${$t("months.january")}, 2018`,
    title: $t("experience.bots.title"),
    description: $t("experience.bots.description"),
    icon: "i-lucide-bot",
  },
]);

const { locale } = useI18n();
const localePath = useLocalePath();

const { data: projects } = await useAsyncData(
  `projects-preview-${locale.value}`,
  async () => {
    const collection = ("projects_" + locale.value) as keyof Collections;
    const results = await queryCollection(collection)
      .order("date", "DESC")
      .all();
    return results.slice(0, 3);
  },
);
</script>

<template>
  <div>
    <!-- FIXME Do we even need this "complicated" junk? -->
    <UPageHero
      :title="$t('hero.greet')"
      :description="$t('hero.about')"
      :orientation="$device.isDesktop ? 'horizontal' : 'vertical'"
      class="xl:-mt-40 2xl:my-auto xl:ml-24"
    >
      <template #links>
        <UTooltip :delay-duration="0" arrow :text="$t('hero.language')">
          <UButton
            icon="i-lucide-file-text"
            color="neutral"
            :to="$t('hero.resume.link')"
            target="_blank"
            :aria-label="`Read my resume, $t('hero.language')`"
          >
            {{ $t("hero.resume.button") }}
          </UButton>
        </UTooltip>
        <UButton
          icon="i-simple-icons-gmail"
          to="mailto:mert.kasim.imran@gmail.com"
          size="lg"
          color="neutral"
          variant="outline"
          class="rounded-full"
          aria-label="Contact me by Mail"
        />
        <UButton
          icon="i-simple-icons-linkedin"
          to="https://linkedin.com/in/mertimran"
          size="lg"
          color="neutral"
          variant="outline"
          class="rounded-full"
          aria-label="Visit my GitHub profile"
        />
        <UButton
          icon="i-simple-icons-github"
          to="https://github.com/mertimran"
          size="lg"
          color="neutral"
          variant="outline"
          class="rounded-full"
          aria-label="Visit my LinkedIn profile"
        />
      </template>
      <NuxtImg
        src="/images/mert.webp"
        alt="Illustration"
        class="h-8/10 aspect-square object-fit rounded-lg"
        preload
      />
    </UPageHero>

    <UPageSection
      :title="$t('technologies.title')"
      :description="$t('technologies.description')"
    >
      <UMarquee
        pause-on-hover
        class="`-mt-5 [&>*]:shrink-0 dark:bg-gray-200"
        :repeat="4"
      >
        <UIcon name="i-devicon-intellij" class="size-20" />
        <UIcon name="i-devicon-neovim-wordmark" class="size-32" />
        <UIcon name="i-devicon-jira-wordmark" class="size-16" />

        <UIcon name="i-devicon-vitejs" class="size-16" />
        <UIcon name="i-devicon-react-wordmark" class="size-16" />
        <UIcon name="i-devicon-reactrouter-wordmark" class="size-24" />
        <UIcon name="i-devicon-nextjs-wordmark" class="size-24" />
        <UIcon name="i-devicon-vuejs-wordmark" class="size-16" />
        <UIcon name="i-devicon-nuxt-wordmark" class="size-32" />
        <UIcon name="i-devicon-tailwindcss" class="size-16" />

        <UIcon name="i-devicon-php" class="size-20" />
        <UIcon name="i-devicon-laravel-wordmark" class="size-32" />
        <UIcon name="i-devicon-python-wordmark" class="size-20" />
        <UIcon name="i-devicon-fastapi-wordmark" class="size-32" />

        <UIcon name="i-devicon-nginx" class="size-20" />

        <UIcon name="i-devicon-docker-wordmark" class="size-20" />

        <UIcon name="i-devicon-prisma-wordmark" class="size-32" />

        <UIcon name="i-devicon-postgresql-wordmark" class="size-20" />
        <UIcon name="i-devicon-mariadb-wordmark" class="size-20" />
        <UIcon name="i-devicon-mysql-wordmark" class="size-24" />
        <UIcon name="i-devicon-sqlite-wordmark" class="size-24" />

        <UIcon name="i-devicon-linux" class="size-20" />
        <UIcon name="i-devicon-debian-wordmark" class="size-20" />

        <UIcon name="i-devicon-github-wordmark" class="size-20" />
        <UIcon name="i-devicon-gitlab-wordmark" class="size-20" />
      </UMarquee>
    </UPageSection>

    <UPageSection
      id="experience"
      :title="$t('experience.title')"
      :description="$t('experience.description')"
      orientation="horizontal"
    >
      <UTimeline :items="timeline" :default-value="3" reverse />
    </UPageSection>

    <UContainer>
      <UPageHeader
        :title="$t('projects.title')"
        :links="[
          {
            label: $t('projects.viewAll'),
            icon: 'i-lucide-eye',
            to: localePath('projects'),
          },
        ]"
        class="mb-8 pb-2"
      />
      <UBlogPosts>
        <UBlogPost
          v-for="(post, index) in projects"
          :key="index"
          v-bind="post"
          :description="truncate(post.description, 50)"
          :to="post.link"
        >
          <template #authors>
            <span class="font-bold">{{ $t("projects.technologies") }}</span>
            <div class="flex flex-wrap gap-2">
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
  </div>
</template>
