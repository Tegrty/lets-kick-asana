const searchFormHandler = async (event) => {
    event.preventDefault();

    const level = document.querySelector('#pose-level').value.trim();
    const area = document.querySelector('#pose-area').value.trim();
    const type = document.querySelector('#pose-type').value.trim();

    if (level && area && type) {
        console.log(level, area, type);

    window.location.href = `/poses?level=${level}&area=${area}&type=${type}`;

    }
}








 
document.querySelector('#search-form').addEventListener('submit', searchFormHandler);