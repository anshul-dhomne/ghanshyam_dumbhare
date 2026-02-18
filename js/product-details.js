// ================= PRODUCT DETAILS PAGE SCRIPT =================

document.addEventListener("DOMContentLoaded", function () {

  // ---------- URL PARAM ----------
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  // ---------- DOM ELEMENTS ----------
  const productImage = document.getElementById("productImage");
  const productImageWrapper = document.querySelector(".product-image");
  const thumbnailList = document.getElementById("thumbnailList");

  const productTitle = document.getElementById("productTitle"); // Mobile title
  const desktopProductTitle = document.getElementById("desktopProductTitle"); // Desktop title

  const netWeightEl = document.getElementById("netWeight");
  const grossWeightEl = document.getElementById("grossWeight");

  const purityValue = document.getElementById("purityValue");
  const whatsappLink = document.getElementById("whatsappLink");

  const sizeRow = document.getElementById("sizeRow");
  const sizeSelect = document.getElementById("sizeSelect");

  // ---------- LOAD PRODUCTS ----------
  fetch("/data/products.json")
    .then(res => res.json())
    .then(data => {

      // ---------- FLATTEN JSON ----------
      let allProducts = [];
      Object.values(data).forEach(metal =>
        Object.values(metal).forEach(group =>
          allProducts.push(...group))
      );

      // ---------- FIND PRODUCT ----------
      const product = allProducts.find(p => p.id == productId);

      if (!product) {
        if (productTitle) productTitle.innerText = "Product Not Found";
        if (desktopProductTitle) desktopProductTitle.innerText = "Product Not Found";
        return;
      }

      // ---------- IMAGE LOGIC ----------
      const images = Array.isArray(product.image)
        ? product.image
        : [product.image];

      if (productImage) productImage.src = images[0];

      if (images.length > 1) {

        if (thumbnailList) {
          thumbnailList.innerHTML = "";
          thumbnailList.style.display = "flex";
        }

        if (productImageWrapper)
          productImageWrapper.classList.remove("full-width");

        images.forEach((src, index) => {
          const thumb = document.createElement("img");
          thumb.src = src;

          if (index === 0) thumb.classList.add("active");

          thumb.addEventListener("click", () => {
            document
              .querySelectorAll("#thumbnailList img")
              .forEach(i => i.classList.remove("active"));

            thumb.classList.add("active");

            if (productImage)
              productImage.src = src;
          });

          if (thumbnailList)
            thumbnailList.appendChild(thumb);
        });

      } else {

        if (thumbnailList)
          thumbnailList.style.display = "none";

        if (productImageWrapper)
          productImageWrapper.classList.add("full-width");
      }

      // ---------- BASIC DETAILS ----------
      if (productTitle)
        productTitle.innerText = product.name;

      if (desktopProductTitle)
        desktopProductTitle.innerText = product.name;

      if (netWeightEl)
        netWeightEl.innerText = product.net_weight.toFixed(2);

      if (grossWeightEl)
        grossWeightEl.innerText = product.gross_weight.toFixed(2);

      // ---------- PURITY ----------
      if (purityValue)
        purityValue.innerText = product.purity;

      // ---------- SIZE LOGIC ----------
      if (product.size && Array.isArray(product.size) && product.size.length) {

        if (sizeRow)
          sizeRow.style.display = "block";

        if (sizeSelect) {

          sizeSelect.innerHTML = `<option value="">Select Size</option>`;

          product.size.forEach(s => {
            const opt = document.createElement("option");
            opt.value = s;
            opt.textContent = s;
            sizeSelect.appendChild(opt);
          });
        }

      } else {

        if (sizeRow)
          sizeRow.style.display = "none";
      }

      // ---------- WHATSAPP ----------
      if (whatsappLink) {
        whatsappLink.href =
          `https://wa.me/91XXXXXXXXXX?text=I am interested in ${product.name}`;
      }

    })
    .catch(err => console.error("Product details error:", err));

});

