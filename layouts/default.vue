<template>
  <main
    font-sans text-norm
    flex="~ col" min-h-screen
    bg-base
  >
    <nav static w-full min-w-3xl max-w-6xl mx-auto p8 />
    <div w-full min-w-3xl max-w-6xl mx-auto p8 grow>
      <slot />
    </div>
    <div class="mt-5 mx-auto text-center opacity-25 text-sm">
      [Default Layout]
    </div>
  </main>
</template>
