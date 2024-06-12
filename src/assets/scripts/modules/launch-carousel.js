const LaunchCarousel = (el, carousel) => {
  const grid = Array.prototype.slice.call(document.querySelectorAll(".case-study"));

  el.addEventListener("click", (e) => {
    e.preventDefault();
    carousel.slideTo(grid.indexOf(el));
    document.body.classList.add("show-modal");
  });
};

module.exports = LaunchCarousel;
