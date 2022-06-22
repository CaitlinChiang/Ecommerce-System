import { DateRangeType } from '../../frontend/_enums/dateRangeType'

export interface DateRange {
  startDate?: Date
  endDate?: Date
  filterBy?: DateRangeType
}
