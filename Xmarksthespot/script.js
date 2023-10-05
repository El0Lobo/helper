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


// Function to generate the initial entry list
function generateEntryList() {
    const entryList = document.getElementById('entry-list');
    entryList.innerHTML = '';

    for (const entry in entries) {
        const entryButton = document.createElement('button');
        entryButton.textContent = entry;
        entryButton.addEventListener('click', () => {
            // Call a function to generate category list based on the selected entry
            generateCategoryList(entry);
        });
        entryList.appendChild(entryButton);
    }
}

// Function to generate the category list for a selected entry
function generateCategoryList(selectedEntry) {
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';

    const categories = Object.keys(entries[selectedEntry]);
    for (const category of categories) {
        const categoryButton = document.createElement('button');
        categoryButton.textContent = category;
        categoryButton.addEventListener('click', () => {
            // Call a function to generate website list based on the selected category
            generateWebsiteList(selectedEntry, category);
        });
        categoryList.appendChild(categoryButton);
    }
}

function generateWebsiteList(selectedEntry, selectedCategory) {
    const websiteList = document.getElementById('website-list');
    websiteList.innerHTML = '';

    const websites = entries[selectedEntry][selectedCategory];
    for (const websiteName in websites) {
        const websiteTile = document.createElement('a');
        websiteTile.classList.add('tile', 'tile-medium');
        websiteTile.href = websites[websiteName].link;
        websiteTile.target = '_blank';

        // Favicon
        const favicon = document.createElement('img');
        favicon.src = `https://www.google.com/s2/favicons?sz=64&domain_url=${websites[websiteName].link}`;
        favicon.alt = `${websiteName} Favicon`;
        favicon.classList.add('favicon');
        websiteTile.appendChild(favicon);

        // Name
        const name = document.createElement('span');
        name.classList.add('name');
        name.textContent = websiteName;
        websiteTile.appendChild(name);

        // Nfo (hidden by default)
        const nfo = document.createElement('span');
        nfo.classList.add('nfo');
        nfo.textContent = websites[websiteName].nfo;
        websiteTile.appendChild(nfo);

        // Add hover event for tile
        websiteTile.addEventListener('mouseenter', () => {
            websiteTile.classList.add('active');
        });
        websiteTile.addEventListener('mouseleave', () => {
            websiteTile.classList.remove('active');
        });

        websiteList.appendChild(websiteTile);
    }
}


// Initialize the website with the entry list
generateEntryList();


