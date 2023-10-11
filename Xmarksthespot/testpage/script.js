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
  // Function to show the pop-up
  function showPopUp() {
    $(".overlay-app").addClass("is-active");
    $(".pop-up").addClass("visible");
  }

  // Function to hide the pop-up
  function hidePopUp() {
    $(".overlay-app").removeClass("is-active");
    $(".pop-up").removeClass("visible");
  }

  // Event listener for the "Update" button
  $(".status-button:not(.open)").on("click", function (e) {
    showPopUp();
  });

  // Event listener for the close button
  $(".pop-up .close").click(function () {
    hidePopUp();
  });

  // Event listener for the "Continue" button inside the pop-up
  $(".pop-up .content-button:not(.open)").click(function () {
    hidePopUp();
  });
});




document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.querySelector('.dark-light');
  const contentWrapperImg = document.querySelector('.content-wrapper-img');
  const contentWrapperImg3Elements = document.querySelectorAll('.content-wrapper-img3'); // Select all elements with class content-wrapper-img3
  const contentWrapperImg4Elements = document.querySelectorAll('.content-wrapper-img4'); // Select all elements with class content-wrapper-img3
  const customButton = document.getElementById('customButton'); // Get the button by id

  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    contentWrapperImg.classList.toggle('invert-filter');

    contentWrapperImg4Elements.forEach((element) => {
      element.classList.toggle('invert-filter');
    });

    // Toggle the invert-filter class for all content-wrapper-img3 elements
    contentWrapperImg3Elements.forEach((element) => {
      element.classList.toggle('invert-filter');
    });

    customButton.classList.toggle('invert-filter');
  });
});





/* function addEntry() {
  // Get user inputs
  var name = prompt("Enter name:");
  var link = prompt("Enter link:");
  var nfo = prompt("Enter nfo:");

  if (name && link) {
    // Create list entry
    var listEntry = document.createElement('li');
    listEntry.classList.add('list-website');
    listEntry.innerHTML = `
      <div class="website-list">
        <img src="https://www.google.com/s2/favicons?sz=32&domain=${link}" alt="${name}">
        ${name}
      </div>
      <div class="button-wrapper">
        <button class="nfo-button status-button open">.nfo</button>
        <div class="nfo-content">${nfo}</div>
      </div>
      <div class="buttonHolder">
        <button class="starbutton"></button>
      </div>
    `;

    // Get or create the ul element
    var ul = document.querySelector('.content-section ul');
    if (!ul) {
      ul = document.createElement('ul');
      document.querySelector('.content-section').appendChild(ul);
    }

    ul.appendChild(listEntry);
  }

// Create card entry
var cardEntry = document.createElement('div');
cardEntry.classList.add('app-card');
cardEntry.innerHTML = `
  <span>
    <img src="https://www.google.com/s2/favicons?sz=32&domain=${link}" alt="${name}">
    <div class="text-center">${name}</div>
    <div class="buttonHolder">
      <button class="starbutton2"></button>
    </div>
  </span>
  <div class="app-card__subtext">${nfo}</div>
`;
document.getElementById('Tiles').appendChild(cardEntry);
} */
    


//tiles or list?

document.addEventListener('DOMContentLoaded', function () {
  var listSection = document.getElementById('List');
  var tilesSection = document.getElementById('Tiles');
  var toggleIcon = document.getElementById('ToggleIcon');

  // Function to toggle sections and change the icon
  function toggleSectionsAndIcon() {
    if (listSection.style.display === 'none' || listSection.style.display === '') {
      listSection.style.display = 'block';
      tilesSection.style.display = 'none';
      toggleIcon.className = 'fa fa-th';
    } else {
      listSection.style.display = 'none';
      tilesSection.style.display = 'block';
      toggleIcon.className = 'fa fa-list-ul';
    }
  }

  // Initially, show the "Tiles" section and set the icon
  listSection.style.display = 'none';
  tilesSection.style.display = 'block';
  toggleIcon.className = 'fa fa-th';

  // Toggle sections and change the icon when clicked
  toggleIcon.addEventListener('click', toggleSectionsAndIcon);

  // Call the toggle function on page load
  toggleSectionsAndIcon();
});

  // Open website on click
  document.addEventListener("DOMContentLoaded", function () {
    const listItems = document.querySelectorAll(".list-website");
    const tileItems = document.querySelectorAll(".app-card");

    function openLink(element) {
      const link = element.querySelector("img").getAttribute("alt");
      window.open(link, "_blank");
    }

    listItems.forEach((listItem) => {
      const starButton = listItem.querySelector(".starbutton");
      listItem.addEventListener("click", (event) => {
        if (event.target !== starButton) {
          openLink(listItem);
        }
      });
    });

    tileItems.forEach((tileItem) => {
      const starButton = tileItem.querySelector(".starbutton2");
      tileItem.addEventListener("click", (event) => {
        if (event.target !== starButton) {
          openLink(tileItem);
        }
      });
    });
  });



/*   //populate

  function populateCategory(categoryName, categoryData) {
    const categoryContainer = document.getElementById(`entries${categoryName}`);
    categoryContainer.innerHTML = ""; // Clear the container
  
    for (const subCategory in categoryData) {
      const subCategoryContainer = document.createElement("div");
      subCategoryContainer.className = "content-section";
      subCategoryContainer.innerHTML = `<div class="content-section-title">${subCategory}:</div>`;
      const subCategoryList = document.createElement("ul");
  
      for (const entryName in categoryData[subCategory]) {
        const entryData = categoryData[subCategory][entryName];
  
        const entryContainer = document.createElement("li");
        entryContainer.className = "list-website";
  
        const websiteList = document.createElement("div");
        websiteList.className = "website-list";
        websiteList.innerHTML = `
          <img src="https://www.google.com/s2/favicons?sz=32&domain=${entryData.link}" alt="${entryData.link}">
          ${entryName}
        `;
  
        const buttonWrapper = document.createElement("div");
        buttonWrapper.className = "button-wrapper";
        buttonWrapper.innerHTML = `
          <button class="nfo-button status-button open">.nfo</button>
          <div class="nfo-content">${entryData.nfo}</div>
        `;
  
        const buttonHolder = document.createElement("div");
        buttonHolder.className = "buttonHolder";
        buttonHolder.innerHTML = `<button class="starbutton" id="starButton1"></button>`;
  
        entryContainer.appendChild(websiteList);
        entryContainer.appendChild(buttonWrapper);
        entryContainer.appendChild(buttonHolder);
  
        subCategoryList.appendChild(entryContainer);
      }
  
      subCategoryContainer.appendChild(subCategoryList);
      categoryContainer.appendChild(subCategoryContainer);
    }
  }
  
  // Call the function for each category
  for (const category in entries) {
    populateCategory(category, entries[category]);
  }
  
 */




  
