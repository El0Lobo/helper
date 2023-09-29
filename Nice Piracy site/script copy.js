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
