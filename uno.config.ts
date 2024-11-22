import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      baseGray: '#58595B',
    },
  },
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then((i) => i.default),
      },
    }),
    presetTypography(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
  },
})
