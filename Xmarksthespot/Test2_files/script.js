$(function () {
 $(".menu-link").click(function () {
  $(".menu-link").removeClass("is-active");
  $(this).addClass("is-active");
 });
});

$(function () {
 $(".main-header-link").click(function () {
  $(".main-header-link").removeClass("is-active");
  $(this).addClass("is-active");
 });
});

const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
 dropdown.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdowns.forEach((c) => c.classList.remove("is-active"));
  dropdown.classList.add("is-active");
 });
});

$(".search-bar input")
 .focus(function () {
  $(".header").addClass("wide");
 })
 .blur(function () {
  $(".header").removeClass("wide");
 });

$(document).click(function (e) {
 var container = $(".status-button");
 var dd = $(".dropdown");
 if (!container.is(e.target) && container.has(e.target).length === 0) {
  dd.removeClass("is-active");
 }
});

$(function () {
 $(".dropdown").on("click", function (e) {
  $(".content-wrapper").addClass("overlay");
  e.stopPropagation();
 });
 $(document).on("click", function (e) {
  if ($(e.target).is(".dropdown") === false) {
   $(".content-wrapper").removeClass("overlay");
  }
 });
});

$(function () {
 $(".status-button:not(.open)").on("click", function (e) {
  $(".overlay-app").addClass("is-active");
 });
 $(".pop-up .close").click(function () {
  $(".overlay-app").removeClass("is-active");
 });
});

$(".status-button:not(.open)").click(function () {
 $(".pop-up").addClass("visible");
});

$(".pop-up .close").click(function () {
 $(".pop-up").removeClass("visible");
});



// Get the existing container element
const appContainer = document.querySelector(".apps-card");

function createAppCard(name, link, nfo, iconURL) {
  const appCard = document.createElement("div");
  appCard.className = "app-card";
  appCard.innerHTML = `
      <span>
          <a href="${link}" target="_blank">
             <img src="${iconURL}" alt="${name}" class="app-icon">
              ${name}
          </a>
      </span>
      <div class="app-card__subtext">${nfo}</div>
  `;
  return appCard;
}

// Function to generate and populate the side menu based on the entries data
function populateSideMenu(entries) {
  const leftSide = document.querySelector('.left-side');

  // Clear existing content
  leftSide.innerHTML = '';

  // Iterate through the entries and create menu items
  for (const category in entries) {
    // Create category wrapper
    const categoryWrapper = document.createElement('div');
    categoryWrapper.classList.add('wrapper'); // Add wrapper class

    // Create category title
    const categoryTitle = document.createElement('div');
    categoryTitle.classList.add('side-title');
    categoryTitle.textContent = category;

    // Create sub-level menu
    const subMenu = document.createElement('div');
    subMenu.classList.add('side-menu');

    // Iterate through the languages in the current category
    const categoryData = entries[category];
    for (const subCategory in categoryData) {
      const subCategoryLink = document.createElement('a');
      subCategoryLink.href = '#'; // Replace with the actual link

      // Create a sub-category container to hold the SVG and sub-category name
      const subCategoryContainer = document.createElement('div');
      subCategoryContainer.classList.add('sub-category-container');

      // Create an SVG element for the sub-category
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "32"); // Set the desired width
      svg.setAttribute("height", "32"); // Set the desired height

      // Create an image element inside the SVG to load the SVG file
      const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
      image.setAttribute("x", "0");
      image.setAttribute("y", "0");
      image.setAttribute("width", "32"); // Set the desired width
      image.setAttribute("height", "32"); // Set the desired height
      image.setAttribute("href", `Test2_files/${subCategory}.svg`); // Replace with the path to your SVG files

      // Append the image to the SVG
      svg.appendChild(image);

      // Append the SVG to the sub-category container
      subCategoryContainer.appendChild(svg);

      // Create a span for the sub-category name
      const subCategoryName = document.createElement('span');
      subCategoryName.textContent = subCategory;

      // Append the sub-category name to the sub-category container
      subCategoryContainer.appendChild(subCategoryName);

      // Append the sub-category container to the sub-category link
      subCategoryLink.appendChild(subCategoryContainer);

      // Append the sub-category link to the sub-menu
      subMenu.appendChild(subCategoryLink);
    }

    // Append the category title and sub-level menu to the category wrapper
    categoryWrapper.appendChild(categoryTitle);
    categoryWrapper.appendChild(subMenu);

    // Append the category wrapper to the left-side container
    leftSide.appendChild(categoryWrapper);
  }
}



// Get the top-level categories menu container element
const topLevelCategoryMenu = document.getElementById("categories-menu2");

// Get the sub-categories menu container element
const subCategoryMenu = document.getElementById("category-menu");

// Extract top-level categories from the imported data
const topLevelCategories = Object.keys(entries);

// Initialize an array to store selected categories
const selectedCategories = [];

// Function to filter entries based on selected categories
function filterEntriesByCategories(categories) {
  const filteredEntries = {};

  // Iterate through the original entries and filter based on selected categories
  for (const category of categories) {
    filteredEntries[category] = entries[category];
  }

  return filteredEntries;
}

// Initialize variables to store selected top-level category and sub-category
let selectedTopLevelCategory = null;
let selectedSubCategory = null;

// Function to populate and display app cards for the selected categories
function populateAndDisplaySelectedAppCards() {
  appContainer.innerHTML = ""; // Clear the app container

  if (selectedTopLevelCategory && selectedSubCategory) {
    // Display entries for the selected top-level category and sub-category
    const selectedEntries = entries[selectedTopLevelCategory][selectedSubCategory];
    for (const name in selectedEntries) {
      const { link, nfo } = selectedEntries[name];

      // Fetch the website's icon (favicon) dynamically
      const iconURL = `https://www.google.com/s2/favicons?sz=64&domain=${link}`;

      // Create the app card
      const appCard = createAppCard(name, link, nfo, iconURL);
      appContainer.appendChild(appCard);
    }
  }
}

// Modify the createAppCard function to include the button holder and star button
function createAppCard(name, link, nfo, iconURL) {
  const appCard = document.createElement("div");
  appCard.className = "app-card";

  // Create the button holder
  const buttonHolder = document.createElement("div");
  buttonHolder.className = "buttonHolder";

  // Create the star button
  const starButton = document.createElement("a");
  starButton.href = "#"; // Set the actual star button link here
  starButton.className = "button Star";
  buttonHolder.appendChild(starButton);

  // Create the app icon and text
  const appLink = document.createElement("span");
  const appIcon = document.createElement("img");
  appIcon.src = iconURL;
  appIcon.alt = name;
  appLink.appendChild(appIcon);
  const appName = document.createTextNode(name);
  appLink.appendChild(appName);
  appLink.href = link;
  appLink.target = "_blank";

  // Create the app card subtext
  const appSubtext = document.createElement("div");
  appSubtext.className = "app-card__subtext";
  appSubtext.textContent = nfo;

  // Append elements to the app card
  appCard.appendChild(buttonHolder);
  appCard.appendChild(appLink);
  appCard.appendChild(appSubtext);

  return appCard;
}

// Create a menu link for each top-level category
topLevelCategories.forEach((category) => {
  const topLevelCategoryLink = document.createElement("a");
  topLevelCategoryLink.className = "main-header-link";
  topLevelCategoryLink.href = "#"; // You can set the actual category link here
  topLevelCategoryLink.textContent = category;
  topLevelCategoryMenu.appendChild(topLevelCategoryLink);

  topLevelCategoryLink.addEventListener("click", () => {
    // Update the selected top-level category
    selectedTopLevelCategory = category;

    // Clear the app container
    appContainer.innerHTML = "";

    // Update the sub-category menu
    const subCategories = entries[selectedTopLevelCategory];
    subCategoryMenu.innerHTML = ""; // Clear the sub-category menu

    for (const subCategory in subCategories) {
      const subCategoryLink = document.createElement("a");
      subCategoryLink.className = "sub-header-link";
      subCategoryLink.href = "#"; // You can set the actual sub-category link here
      subCategoryLink.textContent = subCategory;
      subCategoryMenu.appendChild(subCategoryLink);

      subCategoryLink.addEventListener("click", () => {
        // Update the selected sub-category
        selectedSubCategory = subCategory;

        // Populate and display app cards for the selected categories
        populateAndDisplaySelectedAppCards();
      });
    }

    // Clear the selected sub-category when a top-level category is clicked
    selectedSubCategory = null;
  });
});

// Call the populateSideMenu function when the page loads
window.addEventListener('load', () => {
  populateSideMenu(entries);
});

// Initial display of app cards based on selected categories (empty by default)
populateAndDisplaySelectedAppCards();






////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
//////////////// Floating Image working as inteded//////////////////



const floatingImage = document.querySelector('.floating-image');
const toggleButton = document.getElementById('toggleAnimation');
const sailImage = 'assets/pictures/Sail.png'; // Path to Sail image (relative to the HTML file)
const anchorImage = 'assets/pictures/Anchor.png'; // Path to Anchor image (relative to the HTML file)
const backgroundVideo1 = document.getElementById('mp4Video');
const backgroundVideo2 = document.getElementById('mp4Video2'); // Get the second background video element

let currentAnimation = 'floatImage'; // Track the current animation
let isAnchored = false; // Track whether the ship is anchored or not

// Set the initial content of toggleButton to the Sail image
toggleButton.innerHTML = '<img src="' + anchorImage + '" alt="Anchor">';

toggleButton.addEventListener('click', () => {
    switch (currentAnimation) {
        case 'floatImage':
            // Start the anchor animation once after the floatImage loop finishes
            floatingImage.style.animation = 'floatImage 17s linear forwards';
            currentAnimation = 'waitingForFloatImageToFinish';
            toggleButton.innerHTML = '<img src="' + sailImage + '" alt="Sail">'; // Display the Sail image
            floatingImage.addEventListener('animationend', () => {
                floatingImage.style.animation = 'anchor 2s linear forwards';
                currentAnimation = 'anchor';
                backgroundVideo1.pause(); // Pause the first background video when anchored
                backgroundVideo2.pause(); // Pause the second background video when anchored
                isAnchored = true;
            }, { once: true });
            break;
        case 'waitingForFloatImageToFinish':
            // Ignore the click event while waiting for floatImage to finish
            break;
        case 'anchor':
            // Start the leave animation and then go back to floatImage
            floatingImage.style.animation = 'leave 2s linear forwards';
            currentAnimation = 'leave';
            toggleButton.innerHTML = '<img src="' + anchorImage + '" alt="Anchor">'; // Display the Anchor image

            // Reset the animation to floatImage when leave animation finishes
            floatingImage.addEventListener('animationend', () => {
                floatingImage.style.animation = 'floatImage 17s linear infinite';
                currentAnimation = 'floatImage';
                if (isAnchored) {
                    backgroundVideo1.play(); // Resume the first background video when unanchored
                    backgroundVideo2.play(); // Resume the second background video when unanchored
                    isAnchored = false;
                }
            }, { once: true });
            break;
        default:
            break;
    }
});

////////
////////
////////

//////toggle background

// Select the button and video containers as before
const toggleBackgroundButton = document.getElementById('toggleBackground');
const videoContainer = document.querySelector('.video-container');
const videoContainerNight = document.querySelector('.video-container-night');
const sunImage = 'assets/pictures/Moon.png'; // Path to Sun image (relative to the HTML file)
const moonImage = 'assets/pictures/Sun.png'; // Path to Moon image (relative to the HTML file)

// Check the initial background state and set the button content accordingly
let isDaytime = videoContainer.style.display !== 'none';

// Function to update the button content
function updateButtonContent(isDaytime) {
    toggleBackgroundButton.innerHTML = `
        <img src="${isDaytime ? sunImage : moonImage}" alt="${isDaytime ? 'Daytime' : 'Nighttime'}">
    `;
}

// Call the function to set the initial button content
updateButtonContent(isDaytime);

// Add an event listener to toggle the background and update the button content
toggleBackgroundButton.addEventListener('click', () => {
    if (isDaytime) {
        videoContainer.style.display = 'none';
        videoContainerNight.style.display = 'block';
        isDaytime = false;
    } else {
        videoContainer.style.display = 'block';
        videoContainerNight.style.display = 'none';
        isDaytime = true;
    }
    
    // Call the function to update the button content after the background toggle
    updateButtonContent(isDaytime);
});

// Trigger the initial click to set the initial state
toggleBackgroundButton.click();

//////////////
////////////
//////////////
// To Do List

// make left side actually show the entries
// remember where you left off 
// splashpage with ublock and stuff
// favorites (way to mark appcards and generate own grid and title and category on the left)
// remove title keep categories (show active Category)
// Add title
// make search, search
// spyglass icon top right to show background
// make it check which theme you are on and select appropriate background setting
// reimplement color change just on app window
// change profile pic to ? and make a short readme popup
// add your own entry


