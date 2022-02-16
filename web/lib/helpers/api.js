import dayjs from 'dayjs'

export const resetDate = (date) =>
  date.hour(12).minute(0).second(0).millisecond(0)

export const generateWeeks = (startDateSource, switchDayOfWeek) => {
  let switchDate = dayjs(startDateSource)
  const defaultProps = {
    goals: []
  }

  do {
    switchDate = switchDate.add(1, 'day')
  } while (switchDate.day() !== switchDayOfWeek)

  const weeks = [
    {
      ...defaultProps,
      endsOn: switchDate.toISOString(),
      startsOn: startDateSource.toISOString(),
    },
  ]

  const finalDayDate = startDateSource.add(13, 'week')
  do {
    const startDate = dayjs(switchDate)
    switchDate = switchDate.add(7, 'day')
    weeks.push({
      ...defaultProps,
      endsOn: switchDate.toISOString(),
      startsOn: startDate.toISOString(),
    })
  } while (finalDayDate.diff(switchDate, 'day') > 7)

  weeks.push({
    ...defaultProps,
    endsOn: finalDayDate.toISOString(),
    startsOn: switchDate.toISOString(),
  })

  return weeks
}
