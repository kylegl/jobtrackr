// WORKORDERS

export const woFilters = [
  { name: 'Active', key: 'status', value: 'started', isActive: true },
  { name: 'Upcoming', key: 'status', value: 'notStarted', isActive: true },
  { name: 'Hold', key: 'status', value: 'hold', isActive: false },
  { name: 'Completed', key: 'status', value: 'completed', isActive: false },
]

export const woSortKeys = [
  { name: 'Start Date', key: 'startAt', isString: false, isArray: false, isActive: true, isReverse: false },
  // { name: 'Client', key: 'FK|client_id.name', isString: true, isArray: false, isActive: false, isReverse: false },
  // { name: 'Assigned', key: 'FK|employee_id.name', isString: true, isArray: true, isActive: false, isReverse: false },
]

export const woSearchKeys = [
  // 'job_name',
  'address',
  'number',
  // 'FK|employee_id.name',
  // 'FK|job_id.job_name',
  // 'FK|property_id.address',
  // 'FK|job_id.job_number',
  // 'FK|client_id.name',
]

// Quill Editor

export const quillEditorOptions = {
  modules: {
    clipboard: {
      allowed: {
        tags: ['em', 'strong', 's', 'p', 'br', 'ul', 'ol', 'li', 'span'],
      },
      keepSelection: true,
    },
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  },
}

// statuses
export const bidStatusOptions = ['notStarted', 'started', 'review', 'completed', 'cancelled', 'hold']
export const jobStatusOptions = ['notStarted', 'started', 'completed', 'cancelled', 'hold']

export const statusColors = {
  default: 'bg-bg-drk-c/50',
  notStarted: 'bg-info',
  review: 'bg-info',
  started: 'bg-success',
  cancelled: 'bg-bg-drk-c/50',
  hold: 'bg-orange-500/80',
  completed: 'bg-bg-drk-c',
  danger: 'bg-danger',
  warning: 'bg-yellow-500',
}

