// ========================== ЗАВДАННЯ 1 ==========================
// Варіант 11 -> з таблиці 1 беремо рядок: 1, 4, 6, 7, 8
const variantRow11 = [1, 4, 6, 7, 8];

// Опис усіх можливих полів таблиці 2
const allFields = {
  1: {
    name: "fullName",
    label: "ПІБ",
    placeholder: "Прізвище І.П.",
    // ПІБ: Прізвище (літери) + пробіл + І.П. (ініціали з крапками)
    regexp: /^[A-Za-zА-Яа-яІіЇїЄєҐґ']+\s[A-ZА-ЯІЇЄҐ]\.[A-ZА-ЯІЇЄҐ]\.$/u
  },
  4: {
    name: "phone",
    label: "Телефон",
    placeholder: "(XXX)-XXX-XX-XX",
    regexp: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/
  },
  6: {
    name: "faculty",
    label: "Факультет",
    placeholder: "ФІОТ",
    // тільки літери (мінімум 2)
    regexp: /^[A-Za-zА-Яа-яІіЇїЄєҐґ]{2,}$/u
  },
  7: {
    name: "birthdate",
    label: "Дата народження",
    placeholder: "01.01.2000",
    regexp: /^\d{2}\.\d{2}\.\d{4}$/
  },
  8: {
    name: "address",
    label: "Адреса",
    placeholder: "м. 12345",
    // м. + пробіл + 5 цифр
    regexp: /^м\.\s\d{5}$/
  }
};

// Після завантаження DOM будуємо форму
document.addEventListener("DOMContentLoaded", () => {
  buildFormTask1();
  initFormValidation();
  buildTask2Table();
  initTask2Behaviour();
});

// -------- побудова форми з полів варіанта 11 --------
function buildFormTask1() {
  const tbody = document.getElementById("form-body");
  if (!tbody) return;

  variantRow11.forEach(num => {
    const field = allFields[num];
    if (!field) return;

    const tr = document.createElement("tr");
    tr.classList.add("lab5-form-row");
    tr.dataset.fieldName = field.name;

    const tdLabel = document.createElement("td");
    tdLabel.textContent = field.label;

    const tdInput = document.createElement("td");
    const input = document.createElement("input");
    input.type = "text";
    input.name = field.name;
    input.placeholder = field.placeholder;
    tdInput.appendChild(input);

    tr.append(tdLabel, tdInput);
    tbody.appendChild(tr);
  });
}

// -------- валідація форми та вивід у новому вікні --------
function initFormValidation() {
  const form = document.getElementById("lab5-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    let hasErrors = false;
    const collected = {};

    variantRow11.forEach(num => {
      const field = allFields[num];
      if (!field) return;

      const row = form.querySelector(
        `.lab5-form-row[data-field-name="${field.name}"]`
      );
      if (!row) return;
      const input = row.querySelector("input");
      const value = (input.value || "").trim();

      const isValid = field.regexp.test(value);

      if (!isValid) {
        row.classList.add("error");
        hasErrors = true;
      } else {
        row.classList.remove("error");
        collected[field.label] = value;
      }
    });

    if (hasErrors) {
      alert("Є помилки у введених даних. Невірні поля виділено червоним.");
      return;
    }

    // Якщо все коректно – відкриваємо нове вікно з інформацією
    const resultWin = window.open(
      "",
      "lab5Result",
      "width=420,height=320,resizable=yes"
    );
    if (!resultWin) {
      alert("Браузер заблокував спливаюче вікно.");
      return;
    }

    let html = "<h3>Введені дані</h3><ul>";
    for (const [label, val] of Object.entries(collected)) {
      html += `<li><strong>${label}:</strong> ${val}</li>`;
    }
    html += "</ul>";

    resultWin.document.write(
      `<!DOCTYPE html>
       <html lang="uk">
       <head>
         <meta charset="UTF-8">
         <title>Результат</title>
       </head>
       <body>${html}</body>
       </html>`
    );
    resultWin.document.close();
  });
}

// ========================== ЗАВДАННЯ 2 ==========================

function buildTask2Table() {
  const table = document.querySelector("#task2-table tbody");
  if (!table) return;

  let n = 1;
  for (let i = 0; i < 6; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 6; j++) {
      const td = document.createElement("td");
      td.textContent = n++;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

function initTask2Behaviour() {
  const table = document.getElementById("task2-table");
  if (!table) return;

  const colorPicker = document.getElementById("colorPicker");

  const variantNumber = 11;   // номер варіанта (номер клітинки)
  const optionNumber = 6;     // варіант для dblclick (прямокутник)

  let variantCell = null;

  const cells = table.querySelectorAll("td");
  cells.forEach(td => {
    if (Number(td.textContent) === variantNumber) {
      variantCell = td;
    }
  });

  if (!variantCell) return;

  // mouseover -> випадковий колір лише для клітинки з номером 11
  variantCell.addEventListener("mouseover", () => {
    const randomColor =
      "#" +
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0");
    variantCell.style.backgroundColor = randomColor;
  });

  // click -> колір з палітри лише для клітинки 11
  variantCell.addEventListener("click", () => {
    const color = colorPicker ? colorPicker.value : "#ff0000";
    variantCell.style.backgroundColor = color;
  });

  // dblclick -> варіант 6:
  // зміна кольору всіх клітинок прямокутника, утвореного,
  // починаючи з вибраної комірки (11) до правого нижнього кута таблиці
  variantCell.addEventListener("dblclick", () => {
    const color = colorPicker ? colorPicker.value : "#00ff00";

    const currentRow = variantCell.parentElement;     // <tr>
    const tbody = currentRow.parentElement;           // <tbody>
    const rows = Array.from(tbody.children);          // усі рядки

    const startRowIndex = rows.indexOf(currentRow);   // індекс рядка з 11
    const startColIndex = Array.from(currentRow.children)
      .indexOf(variantCell);                          // індекс стовпця з 11

    // зафарбовуємо всі клітинки в прямокутнику [startRowIndex..end] × [startColIndex..end]
    for (let r = startRowIndex; r < rows.length; r++) {
      const rowCells = rows[r].children;
      for (let c = startColIndex; c < rowCells.length; c++) {
        rowCells[c].style.backgroundColor = color;
      }
    }
  });
}

