import bodyParser from 'body-parser'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { generateWeeks, resetDate } from '../lib/helpers/api'

dayjs.extend(relativeTime)

const app = require('express')()

app.use(bodyParser.json())

app.post('/project/create', (req, res) => {
  // TODO: Build a functional endpoint using a database

  const { name, type } = req.body
  res.end(JSON.stringify({ id: 42, name, type }))
})

app.put('/project/north-star', (req, res) => {
  // TODO: Build a functional endpoint using a database

  const { id, northStar } = req.body
  res.end(JSON.stringify({ id, northStar }))
})

app.put('/project/plan-recap-day', (req, res) => {
  // TODO: Build a functional endpoint using a database

  const { id, switchDayOfWeek } = req.body
  res.end(JSON.stringify({ id, switchDayOfWeek }))
})

app.put('/project/start', (req, res) => {
  // TODO: Build a functional endpoint using a database

  const { id, switchDayOfWeek, start } = req.body
  let startDate = resetDate(dayjs())

  if (start !== 'now') {
    do {
      startDate = startDate.add(1, 'day')
    } while (startDate.day() !== switchDayOfWeek)
  }

  return res.end(JSON.stringify({
    currentWeekIndex: 0,
    id,
    end: startDate.add(13, 'week').toISOString(),
    start: startDate.toISOString(),
    rawStart: start,
    weeks: generateWeeks(startDate, switchDayOfWeek),
  }))
})

export default app
