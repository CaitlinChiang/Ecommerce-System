import { DateRangeType } from '../../_enums/dateRangeType'

export interface DateRange {
  startDate?: Date
  endDate?: Date
  filterBy?: DateRangeType
}
