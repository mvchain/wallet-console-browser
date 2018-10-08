/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(d, f, s) {
  let seconds = 0
  switch (s) {
    case 'd':
      seconds = 86399600
      break
    case 'w':
      seconds = 86399600 * 7
      break
    case 'm':
      var mm = parseInt(d.getMonth() + 1, 10)
      var yy = d.getFullYear()
      var temp = new Date(yy, mm, 0)
      seconds = 86399600 * temp.getDate()
      break
  }
  if (f) {
    d = new Date(Date.parse(d) + seconds)
  }
  // const d = new Date(t)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()
  const hour = '' + d.getHours()
  const min = '' + d.getMinutes()
  const sec = '' + d.getSeconds()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day
  return [year, month, day].join('/') + ' ' + [hour, min, sec].join(':')
}

