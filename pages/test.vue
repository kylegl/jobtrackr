<script setup lang="ts">
import { z } from 'zod'

const testContent = ref({ type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Hello World!' }] }] })
const testName = ref('Fred')

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()])
type Literal = z.infer<typeof literalSchema>
type Json = Literal | { [key: string]: Json } | Json[]
const jsonSchema: z.ZodType<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

const fieldsSchema = z.object({
  notes: jsonSchema,
  name: z.string(),
})

const {
  name,
  notes,
  isDirty,
  disabled,
} = useForm({
  initialValues: { notes: testContent, name: testName },
  fieldsSchema,
  validator: zodValidator,
})

function setFocus() {
  name?.setFocus()
}
</script>

<template>
  <div>
    {{ notes.isDirty }}
    <BaseBtn @click="setFocus">Focus</BaseBtn>
    <Editor :ref="notes.register" v-model:content="notes.fieldValue.value" :disabled="disabled" />
    {{ name.isDirty }}
    <VInput :ref="name.register" v-model="name.fieldValue.value" :disabled="disabled"/>
  </div>
</template>
