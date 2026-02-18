// ======================================================
// Ghanshyam Dumbhare Jewellers - Main JavaScript
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

  // ======================================================
  // BANNER SLIDER (AUTO + BUTTON + TOUCH SWIPE)
  // ======================================================

  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.getElementById("nextSlide");
  const prevBtn = document.getElementById("prevSlide");
  const bannerSlider = document.querySelector(".banner-slider");

  if (slides.length > 0) {

    let currentSlide = 0;
    let slideInterval;
    let startX = 0;
    let endX = 0;

    // ===== SHOW SLIDE =====
    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove("active"));
      slides[index].classList.add("active");
    }

    // ===== NEXT SLIDE =====
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    // ===== PREVIOUS SLIDE =====
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }

    // ===== AUTO SLIDE START =====
    function startAutoSlide() {
      slideInterval = setInterval(nextSlide, 4000);
    }

    // ===== RESET AUTO SLIDE =====
    function resetAutoSlide() {
      clearInterval(slideInterval);
      startAutoSlide();
    }

    // ===== BUTTON EVENTS (DESKTOP) =====
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

    // ======================================================
    // TOUCH SWIPE SUPPORT (MOBILE)
    // ======================================================

    if (bannerSlider) {

      bannerSlider.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
        clearInterval(slideInterval); // Pause auto slide while swiping
      });

      bannerSlider.addEventListener("touchend", function (e) {
        endX = e.changedTouches[0].clientX;

        const difference = startX - endX;

        if (difference > 50) {
          nextSlide(); // Swipe Left
        }

        if (difference < -50) {
          prevSlide(); // Swipe Right
        }

        startAutoSlide(); // Resume auto slide
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


// ======================================================
// FULL SCREEN MOBILE MENU
// ======================================================

const menuToggle = document.getElementById("menuToggle");
const navbarMenu = document.getElementById("navbarMenu");
const menuClose = document.getElementById("menuClose");

menuToggle.addEventListener("click", function () {
  navbarMenu.classList.add("active");
  menuToggle.style.display = "none";
});

menuClose.addEventListener("click", function () {
  navbarMenu.classList.remove("active");
  menuToggle.style.display = "block";
});


// ======================================================
// DROPDOWN TOGGLE (MOBILE MENU)
// ======================================================

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(function (dropdown) {

  const header = dropdown.querySelector(".dropdown-header");
  const arrow = dropdown.querySelector(".mobile-arrow");
  const link = dropdown.querySelector("a");

  // CLICK ON ARROW → OPEN DROPDOWN
  arrow.addEventListener("click", function (e) {

    e.stopPropagation();
    e.preventDefault();

    dropdowns.forEach(function (item) {
      if (item !== dropdown) {
        item.classList.remove("active");
      }
    });

    dropdown.classList.toggle("active");
  });

  // CLICK ON TEXT → OPEN PAGE
  link.addEventListener("click", function () {
    window.location.href = link.href;
  });

});
