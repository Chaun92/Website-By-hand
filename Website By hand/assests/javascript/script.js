document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section"); 
  const navLinks = document.querySelectorAll("#navbar a.nav-link"); 
  const backToTopButton = document.querySelector(".back-to-top"); 

  // Function to smoothly scroll to a target element
  function scrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  }

  // Function to scroll back to top
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // listeners to navigation links for smooth scrolling
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const hash = this.getAttribute("href");
      scrollTo(hash); // Scroll to the target section
      window.location.hash = hash;
    });
  });

  // Function to highlight the active section in the navbar
  function highlightActiveSection() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - window.innerHeight / 2) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  //  event listener to highlight the active section and show/hide back to top button
  window.addEventListener("scroll", () => {
    highlightActiveSection();

    if (window.scrollY > 500) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  //  event listener for smooth scrolling using jQuery
  $("a.nav-link").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      console.log("Hash:", hash); // hash value to the console

      /* if target element exists */
      if ($(hash).length) {
        $('html, body').animate(
          {
            scrollTop: $(hash).offset().top
          },
          800,
          function () {
            console.log("Smooth scrolling complete.");
            window.location.hash = hash;
          }
        );
      } else {
        console.log("Target element not found:", hash);
      }
    }
  });

  // event listener to the back to top button
  backToTopButton.addEventListener("click", () => {
    scrollToTop();
  });
});