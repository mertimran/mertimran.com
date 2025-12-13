export default defineAppConfig({
  ui: {
    colorMode: {
      preference: "light",
    },
    main: {
      base: "min-h-[calc(100vh-var(--ui-header-height)-6rem)]",
    },
    colors: {
      primary: "blue",
      secondary: "purple",
      tertiary: "indigo",
    },
    timeline: {
      slots: {
        date: "text-muted text-xs/5",
      },
    },
  },
});
