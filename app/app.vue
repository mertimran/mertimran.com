<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();
const { locale, locales, setLocale } = useI18n();
const localePath = useLocalePath();

const navigationItems = computed<NavigationMenuItem[]>(() => [
  {
    label: $t("nav.home"),
    to: localePath("/"),
    active: route.path === "/" || route.path === "/tr",
  },
  {
    label: $t("nav.experience"),
    to: localePath("/#experience"),
    active: false,
  },
  {
    label: $t("nav.projects"),
    to: localePath("projects"),
    active: route.path.includes("/projects"),
  },
]);

const languageItems: DropdownMenuItem[] = locales.value.map((locale) => ({
  label: locale.name,
  icon: "i-circle-flags:lang-" + locale.code,
  onSelect() {
    setLocale(locale.code);
  },
}));
</script>

<template>
  <UApp :locale="locale.code">
    <!-- Navigation Bar -->
    <UHeader title="Mert İmran" :to="localePath('/')">
      <UNavigationMenu :items="navigationItems" />

      <template #right>
        <UColorModeButton />

        <!-- Language Switcher -->
        <UDropdownMenu arrow :items="languageItems">
          <UButton
            icon="i-lucide-languages"
            color="neutral"
            variant="ghost"
            aria-label="Change Language"
          />
        </UDropdownMenu>
      </template>

      <template #body>
        <UNavigationMenu
          :items="navigationItems"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtLayout>
        <main>
          <NuxtPage />
        </main>
      </NuxtLayout>
    </UMain>

    <!-- Footer -->
    <UFooter>
      <template #left>
        <p class="text-muted text-sm">
          {{ $t("footer.copyright") }} © {{ new Date().getFullYear() }}.
          {{ $t("footer.reserved") }}
        </p>
      </template>

      <UNavigationMenu variant="link" />

      <template #right>
        <UButton
          icon="i-simple-icons-gmail"
          color="neutral"
          variant="ghost"
          to="mailto:mert.kasim.imran@gmail.com"
          target="_blank"
          aria-label="Contact me by Mail"
        />
        <UButton
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          to="https://github.com/mertimran"
          target="_blank"
          aria-label="Visit my GitHub profile"
        />
        <UButton
          icon="i-simple-icons-linkedin"
          color="neutral"
          variant="ghost"
          to="https://linkedin.com/in/mertimran"
          target="_blank"
          aria-label="Visit my LinkedIn profile"
        />
      </template>
    </UFooter>
  </UApp>
</template>
