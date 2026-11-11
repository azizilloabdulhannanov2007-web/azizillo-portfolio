(function () {
  const form = document.getElementById("contact-form");
  if (!form) return; // boshqa sahifalarda ishlamaydi

  const status = document.getElementById("form-status");
  const submitBtn = form.querySelector('button[type="submit"]');

  // Har bir maydon uchun qoida. true = to'g'ri, aks holda xato kaliti
  const rules = {
    fullname: (v) => v.trim().length >= 2 || "form.errName",
    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "form.errEmail",
    subject: (v) => v.trim().length >= 3 || "form.errSubject",
    message: (v) => v.trim().length >= 10 || "form.errMessage",
  };

  function showFieldError(name, key) {
    const input = form.elements[name];
    const err = document.getElementById(name + "-error");
    if (key) {
      input.classList.add("invalid");
      err.dataset.i18n = key; // til o'zgarsa, xato ham avtomatik tarjima bo'ladi
      err.textContent = window.i18n.t(key);
    } else {
      input.classList.remove("invalid");
      delete err.dataset.i18n;
      err.textContent = "";
    }
  }

  function validateField(name) {
    const result = rules[name](form.elements[name].value);
    showFieldError(name, result === true ? null : result);
    return result === true;
  }

  function setStatus(key, type) {
    if (key) {
      status.dataset.i18n = key;
      status.textContent = window.i18n.t(key);
    } else {
      delete status.dataset.i18n;
      status.textContent = "";
    }
    status.className = "form__status" + (type ? " " + type : "");
  }

  // Yozayotganda xato yo'qoladi / tekshiriladi
  Object.keys(rules).forEach((name) => {
    const input = form.elements[name];
    input.addEventListener("blur", () => validateField(name));
    input.addEventListener("input", () => {
      if (input.classList.contains("invalid")) validateField(name);
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // sahifa yangilanishini to'xtatamiz

    const results = Object.keys(rules).map(validateField);
    if (results.includes(false)) {
      setStatus("form.errFix", "error");
      const firstInvalid = form.querySelector(".invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const payload = {
      fullname: form.elements.fullname.value.trim(),
      email: form.elements.email.value.trim(),
      subject: form.elements.subject.value.trim(),
      message: form.elements.message.value.trim(),
      website: form.elements.website.value, // honeypot
    };

    submitBtn.disabled = true;
    setStatus("form.sending", "");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Request failed: " + response.status);

      form.reset();
      setStatus("form.ok", "success");
    } catch (err) {
      console.error(err);
      setStatus("form.fail", "error");
    } finally {
      submitBtn.disabled = false;
    }
  });
})();