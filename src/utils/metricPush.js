const sanityClient = require('./sanityClient')
const fetchedData = require('./sanityFetch')
import { nanoid } from 'nanoid'

async function engagementInc(streamData) {
    sanityClient
    .patch(streamData._id)
    .setIfMissing({engagement: 1})
    .inc({ engagement: 1 })
    .commit()
    .then(res => {
        console.log('patch happened', res)
    })
    .catch(err => {
        console.error('Transaction failed: ', err.message)
    })
} 

async function registerEngagementInfo(streamData, pointType, user) {

    const engagementData = {
        pointType: pointType,
        username: user
    }
    console.log(engagementData)

    sanityClient
        .patch(streamData._id)
        .setIfMissing({engagementArray: []})
        .insert('after', 'engagementArray[-1]', [
            {
                _key: nanoid(),
                pointType: engagementData.pointType,
                username: engagementData.username
            }
        ])
        .commit()
        .then(res => {
            console.log('patch happened', res)
        })
        .catch(err => {
            console.error('Transaction failed: ', err.message)
        })

}


module.exports = async function(pointType, user) {
    const {streamData} = await fetchedData()
    
    engagementInc(streamData);
    registerEngagementInfo(streamData, pointType, user)
    
}