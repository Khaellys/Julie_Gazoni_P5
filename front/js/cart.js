// Création des expressions régulières avec Regex
let regName = new RegExp("^[a-zA-Z-àâäéèêëïîôöùûüç ,.'-]+$");
let regMail = new RegExp("^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$");
let regAddress = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
let regCity = new RegExp("[0-9]{5}\s(\D+)");

// Formulaire client
function getForm() {
    const form = document.querySelector('.cart__order__form');

// Ecoute du prénom
form.firstName.addEventListener('change', function() {
    validFirstName(this);
});

// Ecoute du nom
form.lastName.addEventListener('change', function() {
    validLastName(this);
});

// Ecoute de l'email
form.email.addEventListener('change', function() {
    validEmail(this);
});

// Ecoute de l'adresse
form.address.addEventListener('change', function() {
    validAddress(this);
});

// Ecoute de la ville
form.city.addEventListener('change', function() {
    validCity(this);
});

// Validation du champ prénom
const validFirstName = function(inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (regName.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = '';
    } else {
        firstNameErrorMsg.innerHTML = 'Merci de renseigner votre prénom';
    }
};

// Validation du champ nom
const validLastName = function(inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (regName.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = '';
    } else {
        lastNameErrorMsg.innerHTML = 'Merci de renseigner votre nom';
    }
};

// Validation du champ adresse
const validAddress = function(inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (regAddress.test(inputAddress.value)) {
        addressErrorMsg.innerHTML = '';
    } else {
        addressErrorMsg.innerHTML = 'Merci de renseigner votre adresse';
    }
};

// Validation du champ ville
const validCity = function(inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (regCity.test(inputCity.value)) {
        cityErrorMsg.innerHTML = '';
    } else {
        cityErrorMsg.innerHTML = 'Merci de renseigner votre code postal et votre ville';
    }
};

// Validation du champ email
const validEmail = function(inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (regMail.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = '';
    } else {
        emailErrorMsg.innerHTML = 'Merci de renseigner votre email';
    }
};

}
