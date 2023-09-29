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
 
 // Function to generate content for the main container
 function generateMainContainerContent() {
   const mainContainer = document.querySelector('.content-wrapper');
 
   // Loop through the entries object
   for (const category in entries) {
     if (entries.hasOwnProperty(category)) {
       // Create a category element
       const categoryElement = document.createElement('div');
       categoryElement.classList.add('category');
       categoryElement.textContent = category;
 
       // Append the category element to the main container
       mainContainer.appendChild(categoryElement);
 
       // Loop through languages within the category
       for (const language in entries[category]) {
         if (entries[category].hasOwnProperty(language)) {
           // Create a language element
           const languageElement = document.createElement('div');
           languageElement.classList.add('language');
           languageElement.textContent = language;
 
           // Append the language element to the category
           categoryElement.appendChild(languageElement);
 
           // Loop through websites within the language
           for (const website in entries[category][language]) {
             if (entries[category][language].hasOwnProperty(website)) {
               // Get website information
               const websiteInfo = entries[category][language][website];
 
               // Create a website element
               const websiteElement = document.createElement('div');
               websiteElement.classList.add('website');
 
               // Create a link element
               const linkElement = document.createElement('a');
               linkElement.href = websiteInfo.link;
               linkElement.textContent = website;
               linkElement.target = "_blank"; // Open link in a new tab
 
               // Create an info element
               const infoElement = document.createElement('p');
               infoElement.textContent = websiteInfo.nfo;
 
               // Append link and info elements to the website element
               websiteElement.appendChild(linkElement);
               websiteElement.appendChild(infoElement);
 
               // Append the website element to the language
               languageElement.appendChild(websiteElement);
             }
           }
         }
       }
     }
   }
 }
 
 // Call the function to generate content when the page loads
 window.addEventListener('load', () => {
   generateMainContainerContent();
 });
 

 
















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