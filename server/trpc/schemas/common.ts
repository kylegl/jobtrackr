import { z } from 'zod'

export const idSchema = z.string().cuid()
export type Id = z.infer<typeof idSchema>
export const datetimeSchema = z.string().datetime({ message: 'Invalid datetime string. Must be UTC' })
export type DatetimeInput = z.infer<typeof datetimeSchema>

export const idInputSchema = z.object({ id: idSchema })
export type IdInput = z.infer<typeof idInputSchema>

export const jobStatusOptionsSchema = z.enum(['notStarted', 'started', 'completed', 'cancelled', 'hold'])
export type JobStatusOptions = z.infer<typeof jobStatusOptionsSchema>
export const bidStatusOptionsSchema = z.enum(['notStarted', 'started', 'review', 'completed', 'cancelled', 'hold'])
export type BidStatusOptions = z.infer<typeof bidStatusOptionsSchema>
export type StatusOptions = JobStatusOptions | BidStatusOptions
