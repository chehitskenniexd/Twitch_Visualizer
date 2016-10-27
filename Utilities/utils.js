'use strict'

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
};

export const getMonthByInt = int => {
    return monthObj[int];
}

export const convertDateToMDY = dateTime => {
    const date = new Date(dateTime);
    return `${monthObj[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}