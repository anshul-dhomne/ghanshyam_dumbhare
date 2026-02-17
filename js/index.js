// ======================================================
// Ghanshyam Dumbhare Jewellers - Main JavaScript
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

  // ======================================================
  // BANNER SLIDER
  // ======================================================

  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.getElementById("nextSlide");
  const prevBtn = document.getElementById("prevSlide");

  if (slides.length > 0) {

    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove("active"));
      slides[index].classList.add("active");
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }

    function startAutoSlide() {
      slideInterval = setInterval(nextSlide, 4000);
    }

    function resetAutoSlide() {
      clearInterval(slideInterval);
      startAutoSlide();
    }

    if (nextBtn && prevBtn) {
      nextBtn.addEventListener("click", function () {
        nextSlide();
        resetAutoSlide();
      });

      prevBtn.addEventListener("click", function () {
        prevSlide();
        resetAutoSlide();
      });
    }

    showSlide(currentSlide);
    startAutoSlide();
  }


  // ======================================================
  // PROMISE SCROLLER (DRAG + AUTO SCROLL)
  // ======================================================

  const scroller = document.getElementById("scroller");

  if (scroller) {

    let isDown = false;
    let startX;
    let scrollLeft;
    let autoScroll;

    // ===== DRAG SCROLL (MOUSE) =====
    scroller.addEventListener("mousedown", function (e) {
      isDown = true;
      startX = e.pageX - scroller.offsetLeft;
      scrollLeft = scroller.scrollLeft;
    });

    scroller.addEventListener("mouseleave", function () {
      isDown = false;
    });

    scroller.addEventListener("mouseup", function () {
      isDown = false;
    });

    scroller.addEventListener("mousemove", function (e) {
      if (!isDown) return;

      e.preventDefault();
      const x = e.pageX - scroller.offsetLeft;
      const walk = (x - startX) * 1.5;
      scroller.scrollLeft = scrollLeft - walk;
    });

    // ===== TOUCH SUPPORT =====
    scroller.addEventListener("touchstart", function (e) {
      startX = e.touches[0].pageX;
      scrollLeft = scroller.scrollLeft;
    });

    scroller.addEventListener("touchmove", function (e) {
      const x = e.touches[0].pageX;
      const walk = (x - startX) * 1.5;
      scroller.scrollLeft = scrollLeft - walk;
    });

    // ===== AUTO SCROLL =====
    function startAutoScroll() {
      autoScroll = setInterval(function () {

        scroller.scrollLeft += 1;

        if (scroller.scrollLeft >= scroller.scrollWidth - scroller.clientWidth) {
          scroller.scrollLeft = 0;
        }

      }, 20);
    }

    function stopAutoScroll() {
      clearInterval(autoScroll);
    }

    scroller.addEventListener("mouseenter", stopAutoScroll);
    scroller.addEventListener("mouseleave", startAutoScroll);

    startAutoScroll();
  }

});


// ======================================================
// AUTO GROSS WEIGHT FETCH (NO PRICE)
// ======================================================

fetch("data/products.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {

    let allProducts = [];

    Object.keys(data).forEach(function (metal) {
      Object.keys(data[metal]).forEach(function (gender) {
        allProducts = allProducts.concat(data[metal][gender]);
      });
    });

    document.querySelectorAll(".gross-weight").forEach(function (el) {

      const id = parseInt(el.dataset.productId);
      const product = allProducts.find(function (p) {
        return p.id === id;
      });

      if (product && product.gross_weight) {
        el.textContent = "Gross Weight: " + product.gross_weight + " g";
      }

    });

  })
  .catch(function (err) {
    console.error("JSON Load Error:", err);
  });

// ================= FULL SCREEN MOBILE MENU =================

const menuToggle = document.getElementById("menuToggle");
const navbarMenu = document.getElementById("navbarMenu");
const menuClose = document.getElementById("menuClose");

// Open Menu
menuToggle.addEventListener("click", function () {
  navbarMenu.classList.add("active");
});

// Close Menu
menuClose.addEventListener("click", function () {
  navbarMenu.classList.remove("active");
});

// ================= DROPDOWN TOGGLE =================

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(function (dropdown) {

  const header = dropdown.querySelector(".dropdown-header");
  const arrow = dropdown.querySelector(".mobile-arrow");
  const link = dropdown.querySelector("a");

  // CLICK ON ARROW → OPEN DROPDOWN
  arrow.addEventListener("click", function (e) {

    e.stopPropagation();     // stop bubbling
    e.preventDefault();      // stop link redirect

    // Close other dropdowns
    dropdowns.forEach(function (item) {
      if (item !== dropdown) {
        item.classList.remove("active");
      }
    });

    // Toggle current
    dropdown.classList.toggle("active");
  });

  // CLICK ON TEXT → OPEN PAGE
  link.addEventListener("click", function () {
    window.location.href = link.href;
  });

});

