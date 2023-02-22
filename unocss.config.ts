import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'absolute-center': 'absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50]',
      'bg-base': 'bg-bg-lit-c dark:bg-bg-drk-g',
      'bg-1': 'bg-bg-lit-a dark:bg-bg-drk-f',
      'bg-2': 'bg-bg-lit-b dark:bg-bg-drk-f',
      'bg-3': 'bg-bg-lit-c dark:bg-bg-drk-b',
      'bg-invert': 'bg-fg-lit-subtle dark:bg-fg-drk-muted',
      'br-base': 'b-2 b-drkLit-1 b-op-60 dark:b-op-30 rounded-lg',
      'border-base': 'border-fg-lit-norm dark:border-none border-1 b-op-40 b-inset',
      'dropdown-border': 'border-fg-lit-norm dark:border-fg-drk-muted b-op-40 b-inset',
      'btn': 'p2 rounded shadow-md cursor-pointer disabled:cursor-default disabled:opacity-50 t5',
      'btn-hover': 'hover:shadow-sm hover:op100 in-out',
      'btn-active': 'op100',
      'btn-danger': 'bg-danger text-fg-lit-norm',
      'btn-primary': 'bg-bg-lit-a dark:bg-bg-drk-b ',
      'btn-secondary': 'bg-bg-drk-c dark:bg-fg-drk-muted text-fg-drk-subtle dark:text-fg-lit-muted',
      'btn-success': 'bg-success text-fg-lit-norm',
      'btn-t-norm': 'rounded t5',
      'btn-t-sm': 't6',
      'btn-toggle': 'op70',
      'btn-inactive': 'op40',
      'btn-group-hover': 'op70 group-hover:op100 in-out',
      'bubble': 'bg-3 bg-op-50  p1 rounded',
      'inner-bubble': 'bg-1 rounded p1',
      'click-flash-primary': 'bg-bg-lit-f dark:bg-fg-drk-muted',
      'click-flash-secondary': 'bg-bg-drk-f dark:bg-fg-drk-muted',
      'click-heading': 'op70 hover:op100 in-out',
      'editor': 'focus:outline-none mx-auto p2',
      'fill-norm': 'fill-fg-lit-norm dark:fill-fg-drk-norm',
      'flex-center': 'items-center justify-center',
      'highlight': 'bg-fg-lit-muted dark:bg-fg-drk-muted text-fg-drk-norm dark:text-fg-lit-norm py1 px2 rounded shadow-sm',
      'icon-add': 'i-ion:plus-round text-lg',
      'icon-back': 'i-carbon:arrow-left text-lg',
      'icon-brush': 'i-fluent:paint-brush-24-regular text-lg',
      'icon-btn': 'op60 hover:op100 in-out',
      'icon-calendar': 'i-carbon:calendar text-base',
      'icon-checkbox': 'i-carbon:checkbox text-xl',
      'icon-check': 'i-ci:check-bold text-xl',
      'icon-copy': 'i-carbon:copy',
      'icon-directory': 'i-fluent:people-team-16-regular',
      'icon-avatar': 'i-carbon:user-avatar text-lg',
      'icon-edit': 'i-ion:edit text-xl',
      'icon-email': 'i-carbon:email',
      'icon-hard-hat': 'i-lucide:hard-hat text-base text-yellow',
      'icon-loading': 'i-eos-icons:bubble-loading',
      'icon-phone': ' i-carbon:phone',
      'icon-print': 'i-carbon:printer text-2xl',
      'icon-refresh': 'i-mdi-light:refresh text-lg',
      'icon-reset': 'i-carbon:reset text-xl',
      'icon-save': 'i-carbon:save text-xl',
      'icon-search': 'i-fluent-search-12-regular text-lg',
      'icon-task': 'i-carbon:task text-lg',
      'icon-trash': 'i-carbon:trash-can text-xl',
      'icon-wrench': 'i-bi:wrench text-xl',
      'icon-x': 'i-carbon:close text-xl',
      'in-out': 'transition duration-300 ease-in-out',
      'input-bg': 'bg-bg-lit-a  dark:bg-bg-drk-k',
      'input-base': 'input-bg rounded',
      'input-shadow': 'shadow-md shadow-inset',
      'heading': 'op70',
      'shadow-hover': 'shadow-md hover:shadow-sm in-out',
      't1': 'text-base',
      't3': 'text-3xl font-semibold tracking-wider',
      't4': 'text-xl font-semibold tracking-wider',
      't5': 'text-lg font-semibold tracking-wider',
      't6': 'text-base font-medium tracking-wider',
      'text-norm': 'text-fg-lit-norm dark:text-fg-drk-norm',
      'text-subtle': 'text-fg-lit-subtle dark:text-fg-drk-subtle',
      'text-muted': 'text-fg-lit-muted dark:text-fg-drk-muted',
      'text-flip': 'text-fg-drk-norm dark:text-fg-lit-norm',
    },
    [/^(.*)-litDrk-1$/, ([, c]) => `${c}-bg-lit-a dark:${c}-bg-drk-f`],
    [/^(.*)-litDrk-2$/, ([, c]) => `${c}-bg-lit-b dark:${c}-bg-drk-f`],
    [/^(.*)-litDrk-3$/, ([, c]) => `${c}-bg-lit-c dark:${c}-bg-drk-b`],
    [/^(.*)-litDrk-4$/, ([, c]) => `${c}-bg-lit-b dark:${c}-bg-drk-k`],
    [/^(.*)-drkLit-1$/, ([, c]) => `${c}-fg-lit-norm dark:${c}-fg-drk-subtle`],
    [/^b-base(?:-([a-z]))?/, ([, dir]) => {
      // matches border/b-base or b-base-[direction]
      const border = dir ? `b-${dir}-2` : 'b-2'
      return `${border} b-op-20 b-fg-lit-norm dark:b-fg-drk-subtle dark:b-op-30`
    }],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Titillium Web',
        mono: 'Fira Code',
      },
    }),
  ],
  theme: {
    borderRadius: {
      DEFAULT: '.375rem',
    },
    colors: {
      bgDrkA: '#18181B',
      bgDrkB: '#373737',
      bgDrkC: '#505050',
      bgDrkD: '#A1A1AA',
      bgDrkF: '#1D1D1D',
      bgDrkG: '#111111',
      bgDrkK: '#0B0B0B',
      bgLitA: '#FAFAFA',
      bgLitB: '#f4f4f5',
      bgLitC: '#e4e4e7',
      bgLitD: '#d4d4d8',
      bgLitF: '#a1a1aa',
      fgLitNorm: '#18181b',
      fgLitMuted: '#3f3f46',
      fgLitSubtle: '#71717a',
      fgDrkNorm: '#F9F9F9',
      fgDrkMuted: '#D4D4D4',
      fgDrkSubtle: '#A4A4A4',
      info: '#3ABFF8',
      success: '#36D399',
      danger: '#F87272',
    },
    fontFamily: {
      sans: 'Titillium Web',
      mono: 'Fira Code',
    },
  },
  safelist: [
    'bg-info',
    'bg-success',
    'bg-bg-drk-c/50',
    'bg-orange-500/80',
    'bg-bg-drk-c',
    'bg-danger',
    'bg-yellow-5',
    'btn-primary',
    'btn-secondary',
    'btn-t-norm',
    'btn-t-sm',
    'btn-success',
    'btn-danger',
    'icon-task',
    'icon-directory',
    'icon-refresh',
    'w-1/2',
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
