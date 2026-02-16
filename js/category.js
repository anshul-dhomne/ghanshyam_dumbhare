// ================= CATEGORY PAGE SCRIPT =================

// ================= URL PARAMS =================
const params = new URLSearchParams(window.location.search);
const category = params.get("cat");
const metalType = params.get("metal") || "gold";

// ================= DOM ELEMENTS =================
const heading = document.querySelector(".page-header h1");
const descriptionEl = document.querySelector(".category-description");
const productList = document.getElementById("productList");
const sortSelect = document.querySelector(".sort select");

// ================= GLOBAL STATE =================
let allLoadedProducts = [];

// ================= TITLE MAP =================
const titleMap = {
  gold: {
    "ladies-ring": "Gold Ring",
    "ladies-chain": "Gold Chain",
    "ladies-earring": "Gold Earring",
    "ladies-pendant": "Gold Pendant",
    "ladies-mangalsutra": "Gold Mangalsutra",
    "ladies-necklace": "Gold Necklace",
    "ladies-bangles": "Gold Bangles",
    "ladies-bracelet": "Gold Bracelet",
    "ladies-kada": "Gold Kada",
    "ladies-nath": "Gold Nath",
    "gents-ring": "Gold Ring",
    "gents-chain": "Gold Chain",
    "gents-kada": "Gold Kada",
    "gents-bracelet": "Gold Bracelet"
  }
};

// ================= DESCRIPTION =================
const descriptionMap = {
  gold: "Explore our complete collection of hallmarked gold jewellery.",
  silver: "Discover premium silver jewellery.",
  diamond: "Experience luxury with certified diamond jewellery."
};

// ================= SET TITLE =================
heading.textContent =
  category && titleMap[metalType]?.[category]
    ? titleMap[metalType][category]
    : metalType.charAt(0).toUpperCase() + metalType.slice(1) + " Jewellery";

descriptionEl.textContent = descriptionMap[metalType] || "";

// ================= FETCH PRODUCTS =================
fetch("data/products.json")
  .then(res => res.json())
  .then(data => {

    let allProducts = [];

    Object.keys(data).forEach(metal => {
      Object.keys(data[metal]).forEach(group => {
        allProducts = allProducts.concat(data[metal][group]);
      });
    });

    allLoadedProducts = allProducts.filter(p =>
      p.metal === metalType &&
      (!category || p.category === category)
    );

    applyFiltersAndSort();
  })
  .catch(err => console.error("Category JSON error:", err));

// ================= RENDER PRODUCTS =================
function renderProducts(products) {

  productList.innerHTML = "";

  if (!products.length) {
    productList.innerHTML = "<p>No products found</p>";
    return;
  }

  products.forEach(p => {

    const box = document.createElement("div");
    box.className = "category";   // SAME design class as index page

    box.innerHTML = `
      <a href="product-details.html?id=${p.id}" class="bestseller-link">
        <img src="${Array.isArray(p.image) ? p.image[0] : p.image}" alt="${p.name}">
        <h4>${p.name}</h4>
        <p class="gross-weight">
          Gross Weight: ${p.gross_weight || p.net_weight || 0} g
        </p>
      </a>
    `;

    productList.appendChild(box);
  });
}

// ================= FILTER + SORT =================
function applyFiltersAndSort() {

  let filtered = [...allLoadedProducts];

  // Gender filter
  const genders = [...document.querySelectorAll(".filter-gender:checked")]
    .map(i => i.value);

  if (genders.length) {
    filtered = filtered.filter(p =>
      genders.some(g => p.category.startsWith(g))
    );
  }

  // Purity filter
  const purities = [...document.querySelectorAll(".filter-purity:checked")]
    .map(i => i.value);

  if (purities.length) {
    filtered = filtered.filter(p =>
      purities.includes(p.purity)
    );
  }

  // Weight filter
  const weightRanges = [...document.querySelectorAll(".filter-price:checked")]
    .map(i => i.value);

  if (weightRanges.length) {
    filtered = filtered.filter(p => {
      const weight = p.gross_weight || p.net_weight || 0;
      return weightRanges.some(r =>
        (r === "below-50000" && weight < 5) ||
        (r === "50000-100000" && weight >= 5 && weight <= 10) ||
        (r === "above-100000" && weight > 10)
      );
    });
  }

  // Sorting by weight
  if (sortSelect.value === "Weight: Low to High") {
    filtered.sort((a, b) =>
      (a.gross_weight || a.net_weight) -
      (b.gross_weight || b.net_weight)
    );
  }

  if (sortSelect.value === "Weight: High to Low") {
    filtered.sort((a, b) =>
      (b.gross_weight || b.net_weight) -
      (a.gross_weight || a.net_weight)
    );
  }

  renderProducts(filtered);
}

// ================= EVENTS =================
document
  .querySelectorAll(".filter-gender, .filter-purity, .filter-price")
  .forEach(el => el.addEventListener("change", applyFiltersAndSort));

sortSelect.addEventListener("change", applyFiltersAndSort);
