console.log("js file connected");
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const form = document.getElementsByClassName("form");
console.log(form);
const validation = (e) => {
    console.log('submit the form');
    e.preventDefault();
    if (firstName.value.length > 2) {
        firstName.classList.add('is-valid');
    } else {
        firstName.classList.add('is-invalid');
    }
};

form.onsubmit = validation;