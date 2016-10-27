'use strict'

export function getNumFollowsPerMonth(channelFollows) {
    // This will convert an array of follows into an object with year/month(int)/count
    // Example: output[2016][0] = numUsers;
    let output = {};
    channelFollows.follows.forEach(follow => {
        const created = new Date(follow.created_at);
        const year = created.getFullYear();
        const month = created.getMonth();

        // Check if the year object exists
        if (!output[year]) { output[year] = {} }
        if (!output[year][month]) { output[year][month] = 0 }

        output[year][month] = output[year][month] + 1;
    })

    return output;
}

export function convertFollowsMonthObjToC3Data(dataObject, type) {
    // Returns an array of the number of items in a month
    // Remember: Month Obj looks like: { { year: { month: num } } }
    let valueArray = [`${type}`];

    console.log(Object.keys(dataObject));
    
    for(var year in dataObject){
        for(var month in dataObject[year]){
            valueArray.push(dataObject[year][month])
        }
    }

    console.log(valueArray);
    return valueArray;
}