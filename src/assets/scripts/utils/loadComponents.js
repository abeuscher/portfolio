const SectionAccordion = (el) => {
  const theHandle = el.querySelector("h2");
  const theContent = el.querySelector(".content");
  theHandle.addEventListener("click", (e) => {
    e.preventDefault();
    theContent.classList.toggle("hide");
  });
};

export const initializeComponents = (scope, selectorsOnly = false) => {
  const components = [
    {
      componentFunction: SectionAccordion,
      selector: "section",
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
