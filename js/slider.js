// Get Slider Items | Array.from [ES6]
let sliderImages = Array.from(
    document.querySelectorAll(".slider-container img")
  ),
  slidesCount = sliderImages.length;

// Current Slide(Image)
let currentSlide = sliderImages.findIndex((image) =>
  image.classList.contains("active")
);
// SlideNumber String Element
let slideNumberElement = document.getElementById("slide-number");
slideNumberElement.textContent = `Slide Number : ${currentSlide + 1}`;

let paginations = document.getElementById("paginations");
let paginationsUl = document.createElement("ul");
sliderImages.forEach((element, index) => {
  let paginationLi = document.createElement("li");
  paginationLi.appendChild(document.createTextNode(index + 1));
  paginationsUl.appendChild(paginationLi);
});
paginations.appendChild(paginationsUl);

paginationsUl.children[currentSlide].classList.add("active");
let paginationsLis = Array.from(paginationsUl.children);
paginationsLis.forEach((li, index) => (li.onclick = checker));

// Setting interval to swap between Images
let intervalTime = 3000;
let intervalNumber = setInterval(() => prevButton.click(), intervalTime);

// Previous And Next Buttons
let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");

nextButton.onclick = checker;
prevButton.onclick = checker;

function setNewInterval(interval) {
  clearInterval(intervalNumber);
  intervalNumber = setInterval(() => prevButton.click(), interval);
}

function checker(e) {
  setNewInterval(intervalTime);
  sliderImages[currentSlide].classList.remove("active");
  if (e.currentTarget === nextButton) nextSlide();
  if (e.currentTarget === prevButton) previousSlide();
  paginationsLis.forEach((li, index) => {
    if (e.currentTarget === li) {
      paginationsLis.forEach((li) => li.classList.remove("active"));
      e.currentTarget.classList.add("active");
      currentSlide = index;
    }
  });
  sliderImages[currentSlide].classList.add("active");
  slideNumberElement.textContent = `Slide Number : ${currentSlide + 1}`;
  // To prevent Pagination Li From Clicking twice on one click action
  if (e.currentTarget === nextButton || e.currentTarget === prevButton)
    paginationsLis[currentSlide].click();
}

function nextSlide() {
  currentSlide = currentSlide === slidesCount - 1 ? 0 : currentSlide + 1;
}

function previousSlide() {
  currentSlide = currentSlide === 0 ? slidesCount - 1 : currentSlide - 1;
}
