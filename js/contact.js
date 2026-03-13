// ================= FORM → GOOGLE SHEET + WHATSAPP =================

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {

  enquiryForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastname").value;   // ✅ FIX
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const type = document.getElementById("type").value;
    const message = document.getElementById("message").value;

    // ================= SEND TO GOOGLE SHEET =================

    fetch("https://script.google.com/macros/s/AKfycbzyYFR4O5bgDitbirAhexzlTlUPM0SC5AxPmoqGMNgH5g9STJyo6viTPECbVbFHt0_jtg/exec", {

      method: "POST",

      body: JSON.stringify({
        firstName: name,
        lastName: lastName,   // ✅ FIX
        email: email,
        number: phone,
        type: type,
        message: message
      })

    });

    // ================= SEND TO WHATSAPP =================

    const whatsappMessage =
      `Hello Ghanshyam Dumbhare Jewellers,%0A%0A` +
      `Name: ${name} ${lastName}%0A` +   // ✅ shows full name
      `Phone: ${phone}%0A` +
      `Email: ${email}%0A` +
      `Enquiry: ${type}%0A` +
      `Message: ${message}`;

    window.open(`https://wa.me/917057832844?text=${whatsappMessage}`, "_blank");

    enquiryForm.reset();

  });

}

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