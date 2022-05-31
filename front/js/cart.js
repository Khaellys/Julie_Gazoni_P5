let itemPanier = [];


// Récupération des produits dans le local storage
var articleinLS = JSON.parse(localStorage.getItem("product"));
console.table(articleinLS);

// Récupération des données de l'API
const getItemPanier = async () => {

    const res = await fetch(`http://localhost:3000/api/products`);
    itemPanier = await res.json();

    for (let index = 0; index < articleinLS.length ; index++) {
        const IdinLS = articleinLS[index];
        const IdinAPI = itemPanier.find(data => data._id === IdinLS.id);

    displayCart(IdinLS, IdinAPI);    
    }
}

getItemPanier() // Execution de la fonction

const displayCart = (LocalId, IdAPI) => {

    // Création élément Article
    let itemArticle = document.createElement('article');
    document.querySelector('#cart__items').appendChild(itemArticle);
    itemArticle.className = "cart__item";
    itemArticle.setAttribute('data-id', LocalId.id);
    itemArticle.setAttribute('data-color', LocalId.couleur);

    // Création élément Div "img"
    let itemDivImg = document.createElement('div');
    itemArticle.appendChild(itemDivImg);
    itemDivImg.className = 'cart__item__img';

    // Création élément Image 
    let itemImg = document.createElement('img');
    itemDivImg.appendChild(itemImg);
    itemImg.src = IdAPI.imageUrl;
    itemImg.alt = IdAPI.altTxt;

    // Création élément Div "content"
    let itemDivContent = document.createElement('div');
    itemArticle.appendChild(itemDivContent);
    itemDivContent.className = 'cart__item__content';

    // Création élément Div "description"
    let itemDivDescription = document.createElement('div');
    itemDivContent.appendChild(itemDivDescription);
    itemDivDescription.className ='cart__item__content__description';

    // Création élément h2
    let itemName = document.createElement('h2');
    itemDivDescription.appendChild(itemName);
    itemName.textContent = LocalId.name;

    // Création élément p "couleur"
    let itemColor = document.createElement('p');
    itemName.appendChild(itemColor);
    itemColor.textContent = LocalId.couleur;

    // Création élément p "prix"

    // Création élément Div "settings"
    let itemDivSettings = document.createElement('div');
    itemDivContent.appendChild(itemDivSettings);
    itemDivSettings.className ='cart__item__content__settings';

    // Création élément Div "quantité"
    let itemDivQuantity = document.createElement('div');
    itemDivSettings.appendChild(itemDivQuantity);
    itemDivQuantity.className ='cart__item__content__settings__quantity';

    // Création élément p "quantité"
    let itemQuantity = document.createElement('p');
    itemDivQuantity.appendChild(itemQuantity);
    itemQuantity.textContent = `Qte : ${LocalId.quantity}`;

}

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
const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (regName.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = '';
    } else {
        firstNameErrorMsg.innerHTML = 'Merci de renseigner votre prénom';
    }
};

// Validation du champ nom
const validLastName = function (inputLastName) {
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
