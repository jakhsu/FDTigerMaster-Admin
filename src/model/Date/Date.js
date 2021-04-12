export function convertDateToFormattedText(start, end) {
    const startYear = start.getFullYear()
    const endYear = end.getFullYear()
    const startMonth = start.getMonth() + 1
    const endMonth = end.getMonth() + 1
    const startDay = start.getDate()
    const endDay = end.getDate()

    if (!isNaN(start) && !isNaN(end) && startYear === endYear) {
        return `${startYear} ${startMonth}/${startDay} ~ ${endMonth}/${endDay}`
    } else if (!isNaN(start) && !isNaN(end) && startYear !== endYear) {
        return `${startYear} ${startMonth}/${startDay} ~ ${endYear} ${endMonth}/${endDay}`
    } else {
        return "N/A"
    }
}