<script setup lang="ts">
// import { print } from '~/composables/print'
const { id } = defineProps<{ id: string }>()
const router = useRouter()

// TODO added logic for new wo or existing wo. Need to put form in edit mode when new.

const wo = $ref<WorkorderType | undefined>()

// const { state, isNewAndClean, isSafeToClose } = storeToRefs(useWoStore())
// const { saveWo, editWo, deleteWo, resetStore } = useWoStore()
// const woTasks = getWoTasks(wo?.value?.id)
const printLayout = $ref(false)
const showPrompt = $ref(false)
const promptMsg = $ref('')
const confirmCb = $ref<() => Promise<void> | void>()
const cancelCb = $ref<() => boolean | Promise<void> | void>()

const isFormSave = $ref(false)
const tasksDirty = $ref(false)
const tasksSaved = $ref(false)
const tasksLoaded = $ref(false)
// const isFormDirty = $computed(() => tasksDirty || state.value.dirty)
// const isFormSaved = $computed(() => tasksSaved && state.value.saved)
// const isLoading = $computed(() => !state.value.loaded || !tasksLoaded)

const togglePrint = useToggle($$(printLayout))

// function del() {
//   if (isNewAndClean.value) {
//     deleteWo()
//     return
//   }

//   const cancelRouteChangeCb = () => {
//     showPrompt = false
//   }

//   confirmCb = deleteWo
//   cancelCb = cancelRouteChangeCb
//   openPrompt(warningMsg.delete)
// }

// async function closePage(): Promise<void> {
//   if (isSafeToClose.value)
//     return resetStore()

//   const saveCb = () => {
//     saveWo()
//     showPrompt = false
//   }

//   const noSaveCb = () => {
//     if (isNewAndClean.value)
//       del()

//     showPrompt = false
//   }

//   confirmCb = saveCb
//   cancelCb = noSaveCb
//   await openPrompt(warningMsg.save)
// }

// async function printPage() {
//   togglePrint()
//   await promiseTimeout(50)
//   print('printMe', togglePrint)
// }

// async function openPrompt(
//   msg: string,
// ) {
//   promptMsg = msg
//   showPrompt = true
//   await useWhileState(showPrompt)
// }

// function handleSave() {
//   isFormSave = true

//   if (state.value.dirty)
//     saveWo()
// }

watchEffect(() => {
  if (id === 'new')
    wo = newWo()

  if (id && id !== 'new')
    wo = getWo(id)

  if (!wo)
    goHome(true, router)
})

// onBeforeRouteLeave(async (to, from) => {
//   if (!isSafeToClose.value)
//     await closePage()

//   resetStore()
// })
</script>

<template>
  <div flex="~ col" gap4 relative>
    <div flex justify-between place-items-end>
      <WorkOrderStatus />

      <!-- <div flex gap2 items-center>
        <Fade>
          <SaveBtn v-if="isFormDirty" @click="handleSave" />
          <EditBtn v-else @click="editWo" />
        </Fade>
        <PrintBtn @click="printPage" />
        <DeleteBtn ref="target" @click="del" />
      </div> -->
    </div>

    <section v-if="!printLayout" flex="~ col" gap4>
      <!-- <WorkorderInfo /> -->
      <!-- <Tasks :tasks="woTasks" :is-form-save="isFormSave" :is-form-saved="isFormSaved" :is-loading="isLoading"
        @saved="tasksDirty === false" @loaded="tasksLoaded = true" /> -->
    </section>
    <!-- <PrintPage v-else /> -->
    <!-- <WarningPrompt :msg="promptMsg" :show="showPrompt" @confirm="confirmCb" @cancel="cancelCb" /> -->
  </div>
</template>
