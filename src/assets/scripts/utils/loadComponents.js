import Swiper from "swiper";

const carousel = new Swiper(".swiper");

const launchCarousel = (el) => {
  const grid = Array.prototype.slice.call(document.querySelectorAll(".case-study"));

  el.addEventListener("click", (e) => {
    e.preventDefault();
    carousel.slideTo(grid.indexOf(el));
    document.body.classList.add("show-modal");
  });
};

const initCloseButton = (el) => {
  const closeButtons = el.querySelectorAll(".close-button");
  for (let button of closeButtons) {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.remove("show-modal");
    });
  }
  const bg = document.querySelector(".modal");
  bg.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className.indexOf("modal") > -1) {
      document.body.classList.remove("show-modal");
    }
  });
};
export const initializeComponents = (scope, selectorsOnly = false) => {
  const components = [
    {
      componentFunction: initCloseButton,
      selector: ".modal",
    },
    {
      componentFunction: launchCarousel,
      selector: ".case-study",
    },
  ];

  components.forEach((component) => {
    scope.jsModules = scope.jsModules || [];

    if (!component.selector && !selectorsOnly) {
      const result = component.componentFunction({ parent: scope });
      if (result) scope.jsModules.push(result);
      return;
    }

    const elements = scope.querySelectorAll(component.selector);

    elements.forEach((element) => {
      if (component.intersectionObserver) {
        let observer = null;

        observer = new IntersectionObserver(
          (entries) => {
            let calledInit = false;

            entries.forEach((entry) => {
              if (calledInit) {
                return;
              }

              if (entry.intersectionRatio > 0) {
                scope.jsModules.push(component.componentFunction(element, { parent: scope }));
                observer.unobserve(element);
                calledInit = true;
              }
            });
          },
          {
            root: null,
            rootMargin: component.intersectionObserver.rootMargin ?? "0px",
            threshold: component.intersectionObserver.threshold ?? 0,
          }
        );

        observer.observe(element);
      } else {
        scope.jsModules.push(component.componentFunction(element, { parent: scope }));
      }
    });
  });
};
