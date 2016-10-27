'use strict'

export const convertDateToMDY = dateTime => {
    const date = new Date(dateTime);
    const monthObj = {
        [0]: 'Jan',
        [1]: 'Feb',
        [2]: 'Mar',
        [3]: 'Apr',
        [4]: 'May',
        [5]: 'Jun',
        [6]: 'Jul',
        [7]: 'Aug',
        [8]: 'Sept',
        [9]: 'Oct',
        [10]: 'Nov',
        [11]: 'Dec',
    }
    return `${monthObj[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}