import type { DisplayThresholds } from "vuetify"

// repeated in main.scss and settings.scss
const breakpoints: DisplayThresholds = {
    xs: 0,
    sm: 400,
    md: 840,
    lg: 1145,
    xl: 1545,
    xxl: 2138,
  }

  export const forVuetify = breakpoints

  export const forTailwind = Object.entries(breakpoints)
    .reduce(
      (o, [key, value]) => ({ ...o, [key]: `${value}px` }),
      {} as Record<keyof DisplayThresholds, string>,
    )
