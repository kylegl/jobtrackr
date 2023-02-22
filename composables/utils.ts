import { Temporal } from '@js-temporal/polyfill'
import type { JobStatusOptions } from '~~/server/trpc/schemas'

export function reduceKeys(keys: Array<any>, initialVal: unknown) {
  return keys.reduce((val, key) => {
    if (Array.isArray(val))
      return val[0]?.[key]

    return val?.[key]
  }, initialVal)
}

export function sorter(keys: string[], list: any[], direction: 'asc' | 'desc') {
  return [...list].sort((a, b) => {
    const aVal = reduceKeys(keys, a)
    const bVal = reduceKeys(keys, b)

    return direction === 'asc' ? ascendingSort(aVal, bVal) : descendingSort(aVal, bVal)
  })
}

function ascendingSort(a?: string | number, b?: string | number) {
  if (!a)
    return 1
  if (!b)
    return -1

  return a > b
    ? 1
    : a < b
      ? -1
      : 0
}

function descendingSort(a: string, b: string) {
  if (!a)
    return 1
  if (!b)
    return -1

  return a < b
    ? 1
    : a > b
      ? -1
      : 0
}

// transformers
export const capFirst = (string: string | undefined) => {
  if (!string)
    return
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export const titleCase = (str: string) => {
  const arr = str.split(' ')
  const formatted = arr.map(word => capFirst(word))
  return formatted.join(' ')
}

// status
export function getStatusColor(
  startDate?: string,
  employeeId?: string[],
  status?: JobStatusOptions,
) {
  const withinAWeek = (startDate && typeof startDate !== 'string')
    ? tsWithin(startDate, -7)
    : false
  let color: keyof typeof statusColors = status || 'default'

  if (status === 'notStarted' && withinAWeek && employeeId?.length)
    color = 'warning'
  if (status === 'notStarted' && withinAWeek && !employeeId?.length)
    color = 'danger'
  if (!status)
    color = 'default'

  return statusColors[color]
}

// time
export function getTimeInstant(ts: number) {
  return Temporal.Instant
    .fromEpochMilliseconds(ts)
    .toZonedDateTimeISO('America/Los_Angeles')
}

export function tsWithin(timestamp: number | null | undefined, days: number): boolean {
  if (!timestamp)
    return false

  const start = getTimeInstant(timestamp)

  const now = getTimeInstant(+new Date())

  const timeUntil = start.until(now, { largestUnit: 'days' })
  const duration = Temporal.Duration.from(timeUntil).total({ unit: 'days' })
  return duration < 0 && duration > days
}

// search
export const fuseDefaultOptions = {
  threshold: 0.3,
  shouldSort: true,
}

export function getFuseOptions(keys?: string[]) {
  return {
    fuseOptions: {
      ...fuseDefaultOptions,
      keys,
    },
  }
}
