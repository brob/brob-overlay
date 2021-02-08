import sanityClient from './sanityClient'


function getSanityData() {
    const query = `{
        "streamData": *[_type=='details' && streamDate <= now()]{
            _id,
            title,
            description,
            streamDate
        } | order(streamDate desc),
        "rants": *[_type=='pixels' && interactionType=='Rants'][0].titles
    }`


    return sanityClient.fetch(query).then(data => {
        return {
            soapboxes: data.rants,
            streamData: data.streamData[0]
        }
    })
}




module.exports = async function() {
    const data = await getSanityData()

    return data
}