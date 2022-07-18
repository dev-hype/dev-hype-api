import { registerEnumType } from '@nestjs/graphql'

enum GqlWeekDay {
  Mon = 'Mon',
  Tue = 'Tue',
  Wed = 'Wed',
  Thu = 'Thu',
  Fri = 'Fri',
  Sat = 'Sat',
  Sun = 'Sun',
}

registerEnumType(GqlWeekDay, {
  name: 'WeekDay',
})

export { GqlWeekDay }
