export interface TippyConfig {
  content: string
  hideOnClick?: boolean
}

export type TippyOptions = TippyConfig | string | undefined

export function getTippyConfig(val?: TippyOptions) {
  if (!val)
    return

  const tippyOptions = {} as TippyConfig
  if (typeof val === 'object') {
    tippyOptions.content = val.content
    tippyOptions.hideOnClick = val.hideOnClick || false
  }

  if (typeof val === 'string') {
    tippyOptions.content = val
    tippyOptions.hideOnClick = false
  }

  return tippyOptions
}
