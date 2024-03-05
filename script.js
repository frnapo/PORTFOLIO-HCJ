//funzione cursore
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  let leftPosition = e.clientX + 4;
  let topPosition = e.clientY + 4;

  cursor.style.left = leftPosition + "px";
  cursor.style.top = topPosition + "px";
});

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    cursor.style.width = "50px";
    cursor.style.height = "50px";
    cursor.style.borderColor = "white";
  });
  link.addEventListener("mouseleave", () => {
    cursor.style.width = "35px";
    cursor.style.height = "35px";
    cursor.style.borderColor = "#808080";
  });
});

//funzione per color palette
document.querySelector(".navbar-brand").addEventListener("click", function (event) {
  event.preventDefault();
  const palette = document.querySelector(".color-palette");
  palette.classList.toggle("visible");
});

// funzione per gestire cambio colori

document.querySelectorAll(".color-box").forEach((box) => {
  box.addEventListener("click", function () {
    const logoImage = document.querySelector('img[alt="francesco napoli logo"]');
    const sigContainer = document.querySelector(".sig-container");

    document.body.classList.remove("theme-blue", "theme-red", "theme-green", "theme-yellow");
    sigContainer.classList.remove("sig-blue", "sig-red", "sig-green", "sig-yellow");

    let themeClass = "";
    const colorStyle = this.getAttribute("data-theme");

    switch (colorStyle) {
      case "theme-blue":
        themeClass = "theme-blue";
        logoImage.src = "./assets/img/logo-blue.png";
        sigContainer.classList.add("sig-blue");
        break;
      case "theme-red":
        themeClass = "theme-red";
        logoImage.src = "./assets/img/logo-red.png";
        sigContainer.classList.add("sig-red");
        break;
      case "theme-green":
        themeClass = "theme-green";
        logoImage.src = "./assets/img/logo-green.png";
        sigContainer.classList.add("sig-green");
        break;
      case "theme-yellow":
        themeClass = "theme-yellow";
        logoImage.src = "./assets/img/logo-yellow.png";
        sigContainer.classList.add("sig-yellow");
        break;
    }

    if (themeClass) {
      document.body.classList.add(themeClass);
    }
  });
});

//funzione per link navbar

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  const updateActiveLink = () => {
    let currentSection = "";

    if (window.scrollY < 100) {
      navLinks.forEach((link) => link.classList.remove("active"));
      return;
    }
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        currentSection = section.getAttribute("class");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(currentSection)) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();
});

//funzione per progressbar
document.addEventListener("scroll", function () {
  let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  let scrollPosition = window.scrollY;
  let scrollPercentage = (scrollPosition / scrollHeight) * 100;

  document.getElementById("progress-bar").style.width = scrollPercentage + "%";
});

// funzione per tooltips
document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

// funzione che anima le skill bar al loro apparire nel viewport
document.addEventListener("DOMContentLoaded", function () {
  AOS.init();
  const animateSkill = (skillElement) => {
    const skillLevel = skillElement.getAttribute("data-skill");
    skillElement.style.width = `${skillLevel}%`;
  };

  // crea un "Intersection Observer" per animare le skillbar quando si scrolla alla loro view
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkill(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll(".skill-percentage").forEach((el) => {
    observer.observe(el);
  });
});

/* ----------------------------------------------------------------------------------- */

// funzione per pulsante bring-me-up
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function handleScroll() {
  const bringMeUpButton = document.getElementById("bring-me-up");
  if (window.scrollY > 740) {
    bringMeUpButton.style.display = "block";
  } else {
    bringMeUpButton.style.display = "none";
  }
}
window.addEventListener("scroll", handleScroll);
document.getElementById("bring-me-up").addEventListener("click", scrollToTop);

handleScroll();

// easter egg togli css
document.getElementById("css-toggle").addEventListener("click", function () {
  document.getElementById("confirm-modal").style.display = "block";
});

let clickCount = 0;

document.getElementById("confirm-btn").addEventListener("click", function () {
  clickCount++;

  if (clickCount < 3) {
    this.style.position = "relative";
    this.style.left = `${Math.random() * 100}px`;
    this.style.top = `${Math.random() * 100}px`;

    document.getElementById("confirm-modal").textContent = "Sei sicuro?";
    document.getElementById("confirm-modal").appendChild(this);
  } else {
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      link.href = "";
    });

    document.getElementById("css-toggle").textContent = "Ripristina CSS";
    document.getElementById("css-toggle").addEventListener("click", function () {
      setTimeout(function () {
        location.reload();
      }, 0);
    });

    // Nascondi il modale
    document.getElementById("confirm-modal").style.display = "none";
  }
});
