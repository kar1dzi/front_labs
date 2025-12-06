// ===== ЛР4. Завдання 1 =====
// n = 26 => (n mod 10) + 1 = 7
const n = 26;
const firstIndex = (n % 10) + 1;   // 7
const secondIndex = firstIndex + 1; // 8

// 7-й елемент: getElementById()
const firstElement = document.getElementById(`item-${firstIndex}`);

// 8-й елемент: querySelector()
const secondElement = document.querySelector(`#item-${secondIndex}`);

// Для зручності перевіряємо, що елементи реально є на сторінці
if (firstElement) {
  firstElement.addEventListener('click', () => {
    // при кожному кліку колір міняється / повертається назад
    firstElement.classList.toggle('highlight-1');
  });
}

if (secondElement) {
  secondElement.addEventListener('click', () => {
    secondElement.classList.toggle('highlight-2');
  });
}

// ===== ЛР4. Завдання 2 — Додати / збільшити / зменшити / видалити зображення =====

const imagesWrapper = document.getElementById('images-wrapper');
const btnAdd     = document.getElementById('btn-add');
const btnBigger  = document.getElementById('btn-bigger');
const btnSmaller = document.getElementById('btn-smaller');
const btnRemove  = document.getElementById('btn-remove');

// масштаб (1 = нормальний розмір)
let scale = 1;

function getAllImages() {
  return imagesWrapper ? imagesWrapper.querySelectorAll('.lab4-img') : [];
}

function applyScale() {
  const imgs = getAllImages();
  imgs.forEach(img => {
    img.style.transform = `scale(${scale})`;
    img.style.transformOrigin = 'center top';
  });
}

// ДОДАТИ — додаємо нове зображення (копія останнього)
// якщо всі видалені, створюємо з того ж src, що і в HTML за замовчуванням
if (btnAdd) {
  btnAdd.addEventListener('click', () => {
    if (!imagesWrapper) return;

    let src = 'img.jpg';
    const anyImg = imagesWrapper.querySelector('.lab4-img');
    if (anyImg) src = anyImg.getAttribute('src') || src;

    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Зображення';
    img.className = 'lab4-img';
    imagesWrapper.appendChild(img);
    applyScale();
  });
}

// ЗБІЛЬШИТИ — збільшуємо масштаб, але не більше ніж у 2 рази
if (btnBigger) {
  btnBigger.addEventListener('click', () => {
    const imgs = getAllImages();
    if (!imgs.length) return;

    scale = Math.min(scale + 0.1, 2);
    applyScale();
  });
}

// ЗМЕНШИТИ — мінімум 0.5 від початкового
if (btnSmaller) {
  btnSmaller.addEventListener('click', () => {
    const imgs = getAllImages();
    if (!imgs.length) return;

    scale = Math.max(scale - 0.1, 0.5);
    applyScale();
  });
}

// ВИДАЛИТИ — видаляємо саме останнє додане зображення
if (btnRemove) {
  btnRemove.addEventListener('click', () => {
    const imgs = getAllImages();
    if (!imgs.length || !imagesWrapper) return;

    const last = imgs[imgs.length - 1];
    imagesWrapper.removeChild(last);
    // якщо все видалили, наступне "Додати" створить картинку з тим самим src
  });
}
