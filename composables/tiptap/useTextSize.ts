function setTextSize() {
  const isLarge = ref(false)

  return { isLarge }
}

export const useTextSize = createSharedComposable(setTextSize)
