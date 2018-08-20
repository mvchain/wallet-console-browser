export function isUsedFilter(v) {
  return v === 0 ? '未分配' : '已分配'
}
export function statusFliter(v) {
  switch (v) {
    case 1:
      return '待审核'
    case 2:
      return '待签名'
    case 3:
      return '拒绝'
    case 4:
      return '正在提币'
    case 5:
      return '提币成功'
    case 6:
      return '失败'
    default:
      return '失败！'
  }
}
// 周转换
export function getYearWeek(index, year, b) {
  if (!b) {
    return index
  }
  const d = new Date(year, 0, 1)
  while (d.getDay() !== 1) {
    d.setDate(d.getDate() + 1)
  }
  const to = new Date(year + 1, 0, 1)
  let i = 1
  const arr = []
  for (let from = d; from < to;) {
    if (i == index) {
      arr.push(from.getFullYear() + '-' + (from.getMonth() + 1) + '-' + from.getDate())
    }
    let j = 6
    while (j > 0) {
      from.setDate(from.getDate() + 1)
      if (i == index) {
        arr.push(from.getFullYear() + '-' + (from.getMonth() + 1) + '-' + from.getDate())
      }
      j--
    }
    if (i == index) {
      return arr[0] + '至' + arr[arr.length - 1]
    }
    from.setDate(from.getDate() + 1)
    i++
  }
}
