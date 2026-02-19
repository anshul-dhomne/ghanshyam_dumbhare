// ================= FORM → WHATSAPP =================
document.getElementById("enquiryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const type = document.getElementById("type").value;
  const message = document.getElementById("message").value;

  const whatsappMessage =
    `Hello Ghanshyam Dumbhare Jewellers,%0A%0A` +
    `Name: ${name}%0A` +
    `Phone: ${phone}%0A` +
    `Email: ${email}%0A` +
    `Enquiry: ${type}%0A` +
    `Message: ${message}`;

  window.open(`https://wa.me/917057832844?text=${whatsappMessage}`, "_blank");
});


// ================= FAQ ACCORDION =================
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {

    document.querySelectorAll(".faq-answer").forEach((ans) => {
      if (ans !== btn.nextElementSibling) {
        ans.classList.remove("open");
      }
    });

    btn.nextElementSibling.classList.toggle("open");
  });
});
