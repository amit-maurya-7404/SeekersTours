export function getUpcomingDepartures(rule: 'Fri-Sat' | 'Sun'): string[] {
  const dates: string[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const currentYear = today.getFullYear()
  const endDate = new Date(currentYear, 8, 30) // September 30th (month index 8)
  endDate.setHours(23, 59, 59, 999)
  
  let current = new Date(today)
  
  if (today > endDate) {
    // Fallback if we are past September
    return getFallbackDepartures(rule, today, 12)
  }
  
  while (current <= endDate) {
    const day = current.getDay() // 0 = Sun, 5 = Fri, 6 = Sat
    if (rule === 'Fri-Sat') {
      if (day === 5) {
        dates.push(formatDate(current) + " (Friday Night)")
      } else if (day === 6) {
        dates.push(formatDate(current) + " (Saturday Night)")
      }
    } else if (rule === 'Sun') {
      if (day === 0) {
        dates.push(formatDate(current) + " (Sunday)")
      }
    }
    current.setDate(current.getDate() + 1)
  }
  
  return dates
}

function getFallbackDepartures(rule: 'Fri-Sat' | 'Sun', start: Date, count: number): string[] {
  const dates: string[] = []
  let current = new Date(start)
  while (dates.length < count) {
    const day = current.getDay()
    if (rule === 'Fri-Sat') {
      if (day === 5) {
        dates.push(formatDate(current) + " (Friday Night)")
      } else if (day === 6) {
        dates.push(formatDate(current) + " (Saturday Night)")
      }
    } else if (rule === 'Sun') {
      if (day === 0) {
        dates.push(formatDate(current) + " (Sunday)")
      }
    }
    current.setDate(current.getDate() + 1)
  }
  return dates
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}
