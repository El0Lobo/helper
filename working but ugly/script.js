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
