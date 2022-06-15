import { DateRangeType } from 'types/_enums/dateRangeType'

export interface DateRange {
  startDate?: Date
  endDate?: Date
  filterBy?: DateRangeType
}
