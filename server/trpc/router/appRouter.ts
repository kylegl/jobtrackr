import {
  bidRouter,
  companyRouter,
  contactRouter,
  employeeRouter,
  jobRouter,
  jobTitleRouter,
  jobTypeRouter,
  propertyRouter,
  taskRouter,
  userRouter,
  workOrderRouter,
} from '~~/server/trpc/router/routes'
import { router } from '~~/server/trpc/trpc'

export const appRouter = router({
  user: userRouter,
  employee: employeeRouter,
  company: companyRouter,
  contact: contactRouter,
  property: propertyRouter,
  job: jobRouter,
  jobTitle: jobTitleRouter,
  jobType: jobTypeRouter,
  bid: bidRouter,
  task: taskRouter,
  workOrder: workOrderRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
