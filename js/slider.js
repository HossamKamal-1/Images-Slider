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
  paginationLi.innerHTML = `${index + 1}`;
  paginationsUl.appendChild(paginationLi);
});
// Setting interval to swap between gallery
let intervalTime = 2000;
let intervalNumber = setInterval(previousSlide, intervalTime);
function setNewInterval(interval) {
  clearInterval(intervalNumber);
  intervalNumber = setInterval(previousSlide, interval);
}
paginations.appendChild(paginationsUl);
paginationsUl.children[currentSlide].classList.add("active");
let paginationsLis = Array.from(paginationsUl.children);
paginationsLis.forEach((li, index) => {
  li.onclick = (e) => {
    setNewInterval(intervalTime);
    paginationsLis.forEach((li) => li.classList.remove("active"));
    e.currentTarget.classList.add("active");
    sliderImages[currentSlide].classList.remove("active");
    currentSlide = index;
    sliderImages[currentSlide].classList.add("active");
    slideNumberElement.textContent = `Slide Number : ${currentSlide + 1}`;
  };
});

// Previous And Next Buttons
let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");
function nextSlide() {
  setNewInterval(intervalTime);
  sliderImages[currentSlide].classList.remove("active");
  currentSlide = currentSlide === slidesCount - 1 ? 0 : currentSlide + 1;
  sliderImages[currentSlide].classList.add("active");
  slideNumberElement.textContent = `Slide Number : ${currentSlide + 1}`;
  paginationsLis[currentSlide].click();
}
function previousSlide() {
  setNewInterval(intervalTime);
  sliderImages[currentSlide].classList.remove("active");
  currentSlide = currentSlide === 0 ? slidesCount - 1 : currentSlide - 1;
  sliderImages[currentSlide].classList.add("active");
  slideNumberElement.textContent = `Slide Number : ${currentSlide + 1}`;
  paginationsLis[currentSlide].click();
}
nextButton.onclick = nextSlide;
prevButton.onclick = previousSlide;
