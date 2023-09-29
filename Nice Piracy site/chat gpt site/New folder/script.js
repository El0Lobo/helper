
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
   
   const toggleButton = document.querySelector('.dark-light');
   
   toggleButton.addEventListener('click', () => {
     document.body.classList.toggle('light-mode');
   });
   
   const tiles = document.querySelectorAll('.tile');
   
   tiles.forEach((tile) => {
     tile.addEventListener('click', () => {
       tiles.forEach((tile) => {
         tile.classList.remove("active");
       });
       tile.classList.add("active");
     })
   });
   
   
   function generateEntryList() {
    const entryList = document.getElementById('entry-list');
    entryList.innerHTML = '';

    for (const entry in entries) {
        const entryButton = document.createElement('button');
        entryButton.textContent = entry;
        entryButton.addEventListener('click', () => {
            // Display the placeholder text for the clicked entry
            displayPlaceholderText(placeholders[entry]);
            // Call a function to generate category list based on the selected entry
            generateCategoryList(entry);
        });
        entryList.appendChild(entryButton);
    }
}

function displayPlaceholderText(text) {
    const websiteList = document.getElementById('website-list');
    websiteList.innerHTML = '';

    const placeholderText = document.createElement('p');
    placeholderText.textContent = text;
    websiteList.appendChild(placeholderText);
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

const placeholders = {
    "Stream": "Select a category from the left for streaming.",
    "Download": "Select a category from the left for downloads.",
    // Add more entries and their respective placeholders as needed
};

