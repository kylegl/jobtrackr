import {
  bidRouter,
  bidStatusRouter,
  contactRouter,
  employeeRouter,
  jobRouter,
  jobStatusRouter,
  jobTypeRouter,
  propertyRouter,
  taskRouter,
  taskStatusRouter,
  userRouter,
  workOrderRouter,
  workOrderStatusRouter,
} from '~~/server/trpc/router/routes'
import { router } from '~~/server/trpc/trpc'

export const appRouter = router({
  user: userRouter,
  employee: employeeRouter,
  contact: contactRouter,
  property: propertyRouter,
  job: jobRouter,
  jobStatus: jobStatusRouter,
  jobType: jobTypeRouter,
  bid: bidRouter,
  bidStatus: bidStatusRouter,
  task: taskRouter,
  taskStatus: taskStatusRouter,
  workOrder: workOrderRouter,
  workOrderStatus: workOrderStatusRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
