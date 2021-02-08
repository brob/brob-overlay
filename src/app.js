import "babel-polyfill";
import commandInit from './components/chat-action'
require('dotenv').config()
const sanityData = require('./utils/sanityFetch');
let soapboxes;






//  async function getSanityRants() {
//     const query = `*[_type=='pixels']`

//     client.fetch(query).then(rants => {
//         console.log('rants',rants)
//     })
// }
// getSanityRants();

// const soapboxes = [
//     "CSS gets no respect",
//     "Rule of Least power",
//     "Servers are a pain",
//     "CSS is awesome",
//     "Fault tolerance in CSS",
//     "Hiring in tech",
//     "The role of Philosophy education"
// ]




function renderTitle(data) {
    const titleElement = document.querySelector('#svgTitle');
    titleElement.innerHTML = data.title
}




async function init() {
    const { soapboxes, streamData } = await sanityData();
    commandInit(soapboxes);
    renderTitle(streamData)
}
init();