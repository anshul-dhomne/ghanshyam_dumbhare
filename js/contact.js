// ================= SUCCESS POPUP =================

function showPopup() {
  document.getElementById("successPopup").style.display = "flex";
}

function closePopup() {
  document.getElementById("successPopup").style.display = "none";
}


// ================= FORM → GOOGLE SHEET =================

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {

  enquiryForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const button = document.querySelector(".submit-btn");

    // loading state
    button.innerText = "Submitting...";
    button.disabled = true;

    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastname").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const type = document.getElementById("type").value;
    const message = document.getElementById("message").value;

    // ================= CREATE FORM DATA =================

    const formData = new FormData();

    formData.append("firstName", name);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("number", phone);
    formData.append("type", type);
    formData.append("message", message);

    // ================= SEND DATA =================

    fetch("https://script.google.com/macros/s/AKfycbx6H3Y_IgmUM8fU-y2BWvl-tvv-p1GGo45NJnWBJX6owBP-LNN07UTa8_B90oTAs0iG/exec", {
      method: "POST",
      body: formData
    })

      .then(response => response.text())

      .then(data => {

        // show success popup
        showPopup();

        // reset form
        enquiryForm.reset();

        // reset button
        button.innerText = "Submit";
        button.disabled = false;

      })

      .catch(error => {

        alert("Error submitting enquiry. Please try again.");
        console.error(error);

        // reset button
        button.innerText = "Submit";
        button.disabled = false;

      });

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