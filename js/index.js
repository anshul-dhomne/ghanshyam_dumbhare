// ================= MOBILE MENU + SLIDER + SCROLLER =================
document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navMenu.style.display =
        navMenu.style.display === 'flex' ? 'none' : 'flex';
      navMenu.style.flexDirection = 'column';
    });
  }

  // ================= BANNER SLIDER =================
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
      nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
      });

      prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
      });
    }

    showSlide(currentSlide);
    startAutoSlide();
  }

  // ================= PROMISE SCROLLER =================
  const scroller = document.getElementById("scroller");
  let isDown = false;
  let startX;
  let scrollLeft;

  if (scroller) {
    scroller.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - scroller.offsetLeft;
      scrollLeft = scroller.scrollLeft;
    });

    scroller.addEventListener("mouseleave", () => isDown = false);
    scroller.addEventListener("mouseup", () => isDown = false);

    scroller.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scroller.offsetLeft;
      const walk = (x - startX) * 1.5;
      scroller.scrollLeft = scrollLeft - walk;
    });

    // Touch Support
    scroller.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX;
      scrollLeft = scroller.scrollLeft;
    });

    scroller.addEventListener("touchmove", (e) => {
      const x = e.touches[0].pageX;
      const walk = (x - startX) * 1.5;
      scroller.scrollLeft = scrollLeft - walk;
    });
  }

});


// ================= AUTO DATA (PRICE + GROSS WEIGHT) =================
fetch("/data/products.json")
  .then(res => res.json())
  .then(data => {

    let allProducts = [];

    Object.keys(data).forEach(metal => {
      Object.keys(data[metal]).forEach(gender => {
        allProducts = allProducts.concat(data[metal][gender]);
      });
    });

    // ===== AUTO PRICE =====
    document.querySelectorAll(".auto-price").forEach(el => {
      const id = parseInt(el.dataset.productId);
      const product = allProducts.find(p => p.id === id);

      if (product && typeof calculatePrice === "function") {
        el.textContent = `₹ ${calculatePrice(product).toLocaleString("en-IN")}`;
      }
    });

    // ===== GROSS WEIGHT =====
    document.querySelectorAll(".gross-weight").forEach(el => {
      const id = parseInt(el.dataset.productId);
      const product = allProducts.find(p => p.id === id);

      if (product && product.gross_weight) {
        el.textContent = `Gross Weight: ${product.gross_weight} g`;
      }
    });

  })
  .catch(err => console.error("JSON Load Error:", err));
