// Seletor de inputs e labels
const dayInput = document.querySelector("#day-input");
const monthInput = document.querySelector("#month-input");
const yearInput = document.querySelector("#year-input");

const dayLabel = document.querySelector("#day-label");
const monthLabel = document.querySelector("#month-label");
const yearLabel = document.querySelector("#year-label");

const inputs = [dayInput, monthInput, yearInput];
const labels = [dayLabel, monthLabel, yearLabel];

// Funções de validação
const invalidMessages = {
  day: document.querySelector(".invalid-day"),
  month: document.querySelector(".invalid-month"),
  date: document.querySelector(".invalid-date"),
  year: document.querySelector(".invalid-year"),
};

const emptyMessages = {
  day: document.querySelector(".empty-day"),
  month: document.querySelector(".empty-month"),
  year: document.querySelector(".empty-year"),
};

// Constantes para data atual
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

// Função para validar ano
function validateYear() {
  if (yearInput.value > currentYear) {
    showError(invalidMessages.year, yearInput, yearLabel);
  }
}

// Função para verificar se a data é válida
function isValidDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() == year &&
    date.getMonth() == month - 1 &&
    date.getDate() == day
  );
}

// Função de validação
function validate() {
  let isValid = true;
  clearErrors();

  if (dayInput.value > 31) {
    showError(invalidMessages.day, dayInput, dayLabel);
    isValid = false;
  }

  if (monthInput.value > 12) {
    showError(invalidMessages.month, monthInput, monthLabel);
    isValid = false;
  }

  inputs.forEach((input, index) => {
    if (input.value <= 0) {
      showError(
        emptyMessages[labels[index].htmlFor.split("-")[0]],
        input,
        labels[index]
      );
      isValid = false;
    }
  });

  if (
    isValid &&
    !isValidDate(dayInput.value, monthInput.value, yearInput.value)
  ) {
    showError(invalidMessages.date, dayInput, dayLabel);
    showError(invalidMessages.date, monthInput, monthLabel);
    showError(invalidMessages.date, yearInput, yearLabel);
    isValid = false;
  }

  validateYear();

  return isValid;
}

// Função para exibir erros
function showError(messageElement, inputElement, labelElement) {
  messageElement.style.display = "block";
  inputElement.style.border = "1px solid red";
  labelElement.style.color = "red";
}

// Função para limpar erros
function clearErrors() {
  Object.values(invalidMessages).forEach((msg) => (msg.style.display = "none"));
  Object.values(emptyMessages).forEach((msg) => (msg.style.display = "none"));

  inputs.forEach((input) => (input.style.border = ""));
  labels.forEach((label) => (label.style.color = ""));
}

// Função para calcular idade
function calculateAge() {
  const today = new Date();
  const birthDate = new Date(
    yearInput.value,
    monthInput.value - 1,
    dayInput.value
  );

  if (isValidDate(dayInput.value, monthInput.value, yearInput.value)) {
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    let month = monthDifference < 0 ? 12 + monthDifference : monthDifference;
    if (dayDifference < 0) {
      month--;
      if (month < 0) month = 11;
    }

    let day =
      dayDifference < 0
        ? new Date(today.getFullYear(), today.getMonth(), 0).getDate() +
          dayDifference
        : dayDifference;

    document.querySelector(".dayr").textContent = day >= 0 ? day : "--";
    document.querySelector(".monthr").textContent = month >= 0 ? month : "--";
    document.querySelector(".yearr").textContent = age >= 0 ? age : "--";
  } else {
    document.querySelector(".dayr").textContent = "--";
    document.querySelector(".monthr").textContent = "--";
    document.querySelector(".yearr").textContent = "--";
  }
}

// Listener para o botão de cálculo
document
  .getElementById("button-calculate")
  .addEventListener("click", function () {
    if (validate()) {
      calculateAge();
    }
  });

// Listener para o switch de idioma
document.getElementById("chk").addEventListener("change", function () {
  const isChecked = this.checked;

  const translations = {
    en: {
      dayLabel: "DAY",
      monthLabel: "MONTH",
      yearLabel: "YEAR",
      placeholders: { day: "DD", month: "MM", year: "YYYY" },
      emptyDay: "This field is required",
      emptyMonth: "This field is required",
      emptyYear: "This field is required",
      invalidDay: "Must be a valid day",
      invalidMonth: "Must be a valid month",
      invalidDate: "Must be a valid date",
      invalidYear: "Must be in past",
      results: {
        years: "years",
        months: "months",
        days: "days",
      },
    },
    pt: {
      dayLabel: "DIA",
      monthLabel: "MÊS",
      yearLabel: "ANO",
      placeholders: { day: "DD", month: "MM", year: "AAAA" },
      emptyDay: "Este campo é obrigatório",
      emptyMonth: "Este campo é obrigatório",
      emptyYear: "Este campo é obrigatório",
      invalidDay: "Deve ser um dia válido",
      invalidMonth: "Deve ser um mês válido",
      invalidDate: "Deve ser uma data válida",
      invalidYear: "Deve estar no passado",
      results: {
        years: "anos",
        months: "meses",
        days: "dias",
      },
    },
  };

  const lang = isChecked ? translations.pt : translations.en;

  // Atualizar labels e placeholders
  dayLabel.textContent = lang.dayLabel;
  monthLabel.textContent = lang.monthLabel;
  yearLabel.textContent = lang.yearLabel;

  dayInput.placeholder = lang.placeholders.day;
  monthInput.placeholder = lang.placeholders.month;
  yearInput.placeholder = lang.placeholders.year;

  // Atualizar mensagens de erro
  emptyMessages.day.textContent = lang.emptyDay;
  emptyMessages.month.textContent = lang.emptyMonth;
  emptyMessages.year.textContent = lang.emptyYear;

  invalidMessages.day.textContent = lang.invalidDay;
  invalidMessages.month.textContent = lang.invalidMonth;
  invalidMessages.date.textContent = lang.invalidDate;
  invalidMessages.year.textContent = lang.invalidYear;

  // Atualizar resultados
  document.querySelector(
    "#results p:nth-child(1)"
  ).innerHTML = `<span class="results yearr">--</span> ${lang.results.years}`;
  document.querySelector(
    "#results p:nth-child(2)"
  ).innerHTML = `<span class="results monthr">--</span> ${lang.results.months}`;
  document.querySelector(
    "#results p:nth-child(3)"
  ).innerHTML = `<span class="results dayr">--</span> ${lang.results.days}`;
});
