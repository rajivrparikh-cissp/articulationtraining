export const executiveTypography = {
  fontFamilies: {
    display: "'Space Grotesk', 'Plus Jakarta Sans', system-ui, sans-serif",
    body: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
  },
  // WCAG 2.2 AAA Target
  touchTargetMinPixels: 56,
  minContrastRatio: "7:1",
  dynamicFontScalingMaxPercent: 200,
  accessibleLineHeights: {
    tight: '1.3',
    normal: '1.6',
    relaxed: '1.8'
  }
} as const;
