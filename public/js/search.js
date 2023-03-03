// Form handler for search form to return poses based on user input
const searchFormHandler = async (event) => {
    event.preventDefault();

    const level = document.querySelector('#pose-level')
    const area = document.querySelector('#pose-area')
    const type = document.querySelector('#pose-type')

    if (level && area && type) {
console.log(level.value, area.value, type.value);
 }};









 
document.querySelector('#search-form').addEventListener('submit', searchFormHandler);