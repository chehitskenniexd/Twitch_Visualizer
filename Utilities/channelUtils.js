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

export function getNumViewsPerMonth(channelVideos) {
    // This will convert and array of videos into an object with videoIndex/numViews
    // Exmaple: output[2016][0] = numViews;
    let output = {};
    let videoIndex = channelVideos.videos.length;

    channelVideos.videos.forEach(video => {
        output[videoIndex--] = video.views;
    })

    return output;
}

export function convertFollowsMonthObjToC3Data(dataObject, type) {
    // Returns an array of the number of items in a month
    // Remember: Month Obj looks like: { { year: { month: num } } }
    let valueArray = [`${type}`];

    for (var year in dataObject) {
        for (var month in dataObject[year]) {
            valueArray.push(dataObject[year][month]);
        }
    }

    return valueArray;
}

export function convertViewsVideoObjToC3Data(dataObject, type) {
    // Returns an array of the number of views per video
    // Remember: Video Oby looks like: { videoIndex: numViews }

    let valueArray = [`${type}`];

    for (var video in dataObject) {
        valueArray.push(dataObject[video]);
    }

    console.log(valueArray);
    return valueArray;
}