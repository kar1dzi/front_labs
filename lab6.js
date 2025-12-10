// lab6.js — ЛР6, варіант 6
// Табл.1 (варіант 6) -> рядки таблиці 2: 1, 2, 4, 5, 6
// тобто поля: picture, name, city, country, postcode

document.addEventListener("DOMContentLoaded", () => {
  const btnLoad = document.getElementById("btn-load-user");
  const statusBox = document.getElementById("load-status");
  const errorBox = document.getElementById("error-box");

  const card = document.getElementById("user-card");
  const img = document.getElementById("user-picture");
  const nameEl = document.getElementById("user-name");
  const cityEl = document.getElementById("user-city");
  const countryEl = document.getElementById("user-country");
  const postcodeEl = document.getElementById("user-postcode");

  btnLoad.addEventListener("click", () => {
    statusBox.textContent = "Завантаження даних користувача...";
    errorBox.textContent = "";
    card.classList.add("hidden");

    fetch("https://randomuser.me/api/")
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP помилка: " + response.status);
        }
        return response.json();
      })
      .then(data => {
        const user = data.results[0];

        // ====== Поля згідно варіанта 6 ======
        // 1) picture
        img.src = user.picture.large;
        img.alt = `${user.name.first} ${user.name.last}`;

        // 2) name
        const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
        nameEl.textContent = fullName;

        // 4) city
        cityEl.textContent = user.location.city;

        // 5) country
        countryEl.textContent = user.location.country;

        // 6) postcode
        postcodeEl.textContent = user.location.postcode;

        card.classList.remove("hidden");
        statusBox.textContent = "Дані успішно завантажено.";
      })
      .catch(err => {
        console.error(err);
        statusBox.textContent = "";
        errorBox.textContent = "Помилка під час завантаження даних. Спробуйте ще раз.";
      });
  });
});
