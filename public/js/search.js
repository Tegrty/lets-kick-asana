// Listen for form submit, prevent default, get user input, send to server, get filtered data back, display filtered data

const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const levelInput = document.querySelector('#level').value;
    const areaInput = document.querySelector('#area').value;

    const response = await fetch(`/api/search?level=${levelInput}&area=${areaInput}`);
    const data = await response.json();
    console.log(data);
    displayPoses(data);
});


