// Selecting elements from the HTML document
const searchForm = document.querySelector("#search-form");
const mainContainer = document.getElementById("image-container");
const imgContainer = document.getElementById("current-image-container");
const history = document.getElementById("search-history");
const inputDate = document.getElementById("search-input");
const heading = document.getElementById('heading');

// Setting the default date to today's date
let currentDate = new Date().toISOString().split("T")[0];

// Creating HTML elements for the image, title, and description
const img = document.createElement("img");
const titleHeading = document.createElement("h3");
const description = document.createElement("p");

// Fetching the current image of the day on page load
window.addEventListener("load", () => {
    heading.textContent = `NASA Picture of the Day`;
    getCurrentImageOfTheDay();
});

// Asynchronous function to fetch and display the current image of the day
async function getCurrentImageOfTheDay() {
    try {
        // Fetching the data from the NASA API
        const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=C69f7BH1LmhBm879s3dhajUu5sWCsLfWIBEXuJxN&date=${currentDate}`
        );
        const data = await response.json();
        console.log(data);

        // Updating the image on the UI
        const imgUrl = data?.url;
        img.src = imgUrl;
        img.classList.add("image");
        mainContainer.appendChild(img);

        // Updating the title on the UI
        const title = data?.title;
        titleHeading.textContent = title;
        imgContainer.appendChild(titleHeading);

        // Updating the description on the UI
        const para = data?.explanation;
        description.textContent = para;
        imgContainer.appendChild(description);

        mainContainer.appendChild(imgContainer);
    } catch (error) {
        console.log("Error => " + error);
    }
}

// Event listener for the search form submission
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // If a date is entered in the search input, fetch the image for that date
    if (inputDate.value) {
        const selectedDate = new Date(inputDate.value);
        currentDate = selectedDate.toISOString().split("T")[0];
        heading.textContent = `Picture on ${currentDate}`;
        getImageOfTheDay();
        saveSearch();
        addSearchToHistory();
    }
});

// Asynchronous function to fetch and display the image for the selected date
async function getImageOfTheDay() {
    // Fetching the data from the NASA API
    const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=C69f7BH1LmhBm879s3dhajUu5sWCsLfWIBEXuJxN&date=${currentDate}`
    );
    const data = await response.json();
    console.log(data);

    // Updating the image on the UI
    const imgUrl = data?.url;
    img.src = imgUrl;
    img.classList.add("image");
    mainContainer.appendChild(img);

    // Updating the title on the UI
    const title = data?.title;
    titleHeading.textContent = title;
    imgContainer.appendChild(titleHeading);

    // Updating the description on the UI
    const para = data?.explanation;
    description.textContent = para;
    imgContainer.appendChild(description);

    mainContainer.appendChild(imgContainer);
}

//Saves the selected date to local storage for later retrieval.

function saveSearch() {
    let DateArr = []
    DateArr.push(currentDate)
    localStorage.setItem(`Date ${DateArr.length}`, currentDate)
}

/**
 * Adds the selected date to the search history list and attaches a click event to retrieve and display the corresponding image.
 */
function addSearchToHistory() {
    const a = document.createElement("a")
    a.href = ''
    const li = document.createElement("li")
    li.textContent = currentDate;
    a.appendChild(li)
    history.appendChild(a)

    // Attach a click event to the new history item that retrieves and displays the corresponding image
    a.addEventListener("click", (event) => {
        event.preventDefault()
        currentDate = li.textContent
        heading.textContent = `Picture on ${currentDate}`;
        getImageOfTheDay();
    });
}

