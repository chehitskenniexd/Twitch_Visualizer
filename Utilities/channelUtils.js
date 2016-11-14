'use strict'

import React from 'react';
import { getMonthByInt} from './utils.js'

export function getNumFollowsPerMonth(channelFollows) {
    // This will convert an array of follows into an object with year/month(int)/count
    // Example: output[2016][0] = numUsers;
    let output = {};
    channelFollows.forEach(follow => {
        const created = new Date(follow.followed_on);
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
    let videoIndex = channelVideos.length;

    channelVideos.forEach(video => {
        output[videoIndex--] = {title: video.title, views: video.views};
    })

    return output;
}

export function convertFollowsMonthObjToRechartsData(dataObject, type) {
    // Returns an array of the number of items in a month
    // Remember: Month Obj looks like: { { year: { month: num } } }
    let valueArray = [];
    for (var year in dataObject) {
        for (var month in dataObject[year]) {
            valueArray.push({date:`${getMonthByInt(month)} ${year}` , num: dataObject[year][month]});
        }
    }

    return valueArray;
}

export function convertViewsVideoObjToRechartsData(dataObject, type) {
    // Returns an array of the number of views per video
    // Remember: Video Obj looks like: { videoIndex: numViews }
    let valueArray = [];
    for (var video in dataObject) {
        valueArray.push(dataObject[video]);
    }
    return valueArray;
}

export function createLoadingBar() {
    return (
        <div className="row">
            <div className="col s12 m12 lg12">
                <div className="card">
                    <div className="loading-bar">
                        <div className="preloader-wrapper big active">
                            <div className="spinner-layer spinner-blue">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>

                            <div className="spinner-layer spinner-red">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>

                            <div className="spinner-layer spinner-yellow">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>

                            <div className="spinner-layer spinner-green">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div><div className="gap-patch">
                                    <div className="circle"></div>
                                </div><div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}