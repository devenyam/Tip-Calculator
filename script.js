"use script";

//selectors
const inputArea1 = document.querySelector(".input-area-1");
const inputArea2 = document.querySelector(".input-area-2");
const custom = document.querySelector(".custom");
const warningLabel = document.querySelector(".warning-label");
const numOfPeople = document.querySelector(".input-area-2");
const reset = document.querySelector(".reset");
const tips = document.querySelectorAll(".tip");

//events
inputArea1.addEventListener("click", function () {
  inputArea1.classList.add("input-active");
  inputArea2.classList.remove("input-active");
  custom.classList.remove("custom-active");
});

inputArea2.addEventListener("click", function () {
  inputArea2.classList.add("input-active");
  inputArea1.classList.remove("input-active");
  custom.classList.remove("custom-active");
});

custom.addEventListener("click", function () {
  custom.classList.add("custom-active");
  inputArea2.classList.remove("input-active");
  inputArea1.classList.remove("input-active");
  activateResetButton();
});

reset.addEventListener("click", resetCalc);

let tip = 0;
let tipPerPerson = 0;
let total = 0;

function feedback() {
  if (tipPerPerson === Infinity && total === Infinity) {
    document.querySelector(".tip-amount").textContent = "0";
    document.querySelector(".total").textContent = "0";
  } else {
    document.querySelector(".tip-amount").textContent = tipPerPerson.toFixed(2);
    document.querySelector(".total").textContent = total.toFixed(2);
  }
}

custom.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    tip =
      (document.querySelector(".custom").value / 100) *
      Number(document.querySelector(".bill").value);
    tipPerPerson = tip / Number(document.querySelector(".num").value);
    total =
      Number(document.querySelector(".bill").value) /
        Number(document.querySelector(".num").value) +
      tipPerPerson;

    feedback();
  }
});

const activateResetButton = function () {
  if (document.querySelector(".bill").value) {
    reset.classList.add("active");
    reset.classList.remove("inactive");
  } else {
    reset.classList.remove("active");
    reset.classList.add("inactive");
  }
};

for (let i = 0; i < tips.length; i++) {
  tips[i].addEventListener("click", function (e) {
    e.preventDefault();
    //calculate tip
    const tipPercent = Number(tips[i].value);
    tip = tipPercent * Number(document.querySelector(".bill").value);
    //calculate tip/ person
    tipPerPerson = tip / Number(document.querySelector(".num").value);
    //calculate total/person
    total =
      Number(document.querySelector(".bill").value) /
        Number(document.querySelector(".num").value) +
      tipPerPerson;

    //activate reset button
    activateResetButton();

    if (
      document.querySelector(".num").value === "" ||
      document.querySelector(".num").value === 0
    ) {
      warningLabel.classList.remove("hidden");
      numOfPeople.classList.add("red-border-active");
    } else {
      warningLabel.classList.add("hidden");
      numOfPeople.classList.remove("red-border-active");
    }

    //change textcontent of results
    feedback();
  });
}

//reset calculator
function resetCalc() {
  document.querySelector(".tip-amount").textContent = "0";
  document.querySelector(".total").textContent = "0";
  document.querySelector(".bill").value = 0;
  document.querySelector(".custom").value = "Custom";
  document.querySelector(".num").value = 0;
  reset.classList.remove("active");
  reset.classList.add("inactive");
  inputArea2.classList.remove("input-active");
  custom.classList.remove("custom-active");
}
