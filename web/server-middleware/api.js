import bodyParser from 'body-parser'
import dayjs from 'dayjs'

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

  const { id, planDayOfWeek } = req.body
  res.end(JSON.stringify({ id, planDayOfWeek }))
})

app.put('/project/start', (req, res) => {
  // TODO: Build a functional endpoint using a database

  const { id, planDayOfWeek, start } = req.body

  if (start === 'now') {
    return res.end(JSON.stringify({
      id,
      end: dayjs().add(13, 'week').toISOString(),
      start: dayjs().toISOString(),
      rawStart: start,
    }))
  }

  let startDate = dayjs()
  do {
    startDate = startDate.add(1, 'day')
  } while (startDate.day() !== planDayOfWeek)

  return res.end(JSON.stringify({
    id,
    end: startDate.add(13, 'week').toISOString(),
    start: startDate.toISOString(),
    rawStart: start,
  }))
})

export default app
