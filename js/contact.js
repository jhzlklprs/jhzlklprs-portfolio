(function () {
  "use strict";

  var form = document.getElementById("contactForm");
  var status = document.getElementById("contactFormStatus");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("contactName").value.trim();
    var email = document.getElementById("contactEmail").value.trim();
    var message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) return;

    var subject = encodeURIComponent("Portfolio inquiry from " + name);
    var body = encodeURIComponent(
      "Name: " + name + "\n" +
      "Email: " + email + "\n\n" +
      message
    );

    status.textContent = "Opening your email client...";
    window.location.href = "mailto:hello@example.com?subject=" + subject + "&body=" + body;
  });
})();
