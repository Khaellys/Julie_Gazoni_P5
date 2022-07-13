let itemPanier = []

// Insertion du prix total
var totalSum = 0

// Récupération des produits dans le local storage
let articleinLS = JSON.parse(localStorage.getItem('product'))
console.table(articleinLS)

// Récupération des données de l'API
const getItemPanier = async () => {
  const res = await fetch(`http://localhost:3000/api/products`)
  itemPanier = await res.json()

  for (let index = 0; index < articleinLS.length; index++) {
    const localArticle = articleinLS[index]
    const articleAPI = itemPanier.find((data) => data._id === localArticle.id)

    // Appel des fonctions
    getPrice(localArticle.id, localArticle.quantity)
    displayCart(localArticle, articleAPI)
  }
}

getItemPanier() // Exécution de la fonction

// Récupération des prix à partir de l'API
async function getPrice(id, quantity) {
  var myprice
  url = 'http://localhost:3000/api/products/'
  finalurl = url + id
  const data = await fetch(finalurl)
  const json = await data.json()
  myprice = json.price

  // Calcul de la somme totale
  totalSum += quantity * myprice

  let itemTotalSum = document.getElementById('totalPrice')
  itemTotalSum.innerHTML = totalSum
}

function getTotal() {
  // Insertion des quantités totales
  var itemAmount = articleinLS
  var EltInArray = itemAmount.length

  totalQtt = 0

  for (var i = 0; i < EltInArray; ++i) {
    totalQtt += itemAmount[i].quantity
  }

  let itemTotalQuantity = document.getElementById('totalQuantity')
  itemTotalQuantity.innerHTML = totalQtt
  console.log(totalQtt)
}

getTotal()

const displayCart = (localProduct, productAPI) => {
  // Création élément Article
  let itemArticle = document.createElement('article')
  document.querySelector('#cart__items').appendChild(itemArticle)
  itemArticle.className = 'cart__item'
  // remplace itemArticle.setAttribute('data-id', localProduct.id)
  itemArticle.dataset.id = localProduct.id
  // remplace itemArticle.setAttribute('data-color', localProduct.color)
  itemArticle.dataset.color = localProduct.color

  // Création élément Div "img"
  let itemDivImg = document.createElement('div')
  itemArticle.appendChild(itemDivImg)
  itemDivImg.className = 'cart__item__img'

  // Création élément Image
  let itemImg = document.createElement('img')
  itemDivImg.appendChild(itemImg)
  itemImg.src = productAPI.imageUrl
  itemImg.alt = productAPI.altTxt

  // Création élément Div "content"
  let itemDivContent = document.createElement('div')
  itemArticle.appendChild(itemDivContent)
  itemDivContent.className = 'cart__item__content'

  // Création élément Div "description"
  let itemDivDescription = document.createElement('div')
  itemDivContent.appendChild(itemDivDescription)
  itemDivDescription.className = 'cart__item__content__description'

  // Création élément h2
  let itemName = document.createElement('h2')
  itemDivDescription.appendChild(itemName)
  itemName.textContent = localProduct.name

  // Création élément p "couleur"
  let itemColor = document.createElement('p')
  itemName.appendChild(itemColor)
  itemColor.textContent = localProduct.color

  // Création élément p "prix"
  let itemPrice = document.createElement('p')
  itemName.appendChild(itemPrice)
  itemPrice.textContent = productAPI.price + ' €'

  // Création élément Div "settings"
  let itemDivSettings = document.createElement('div')
  itemDivContent.appendChild(itemDivSettings)
  itemDivSettings.className = 'cart__item__content__settings'

  // Création élément Div "quantité"
  let itemDivQuantity = document.createElement('div')
  itemDivSettings.appendChild(itemDivQuantity)
  itemDivQuantity.className = 'cart__item__content__settings__quantity'

  // Création élément p "quantité"
  let itemQtt = document.createElement('p')
  itemDivQuantity.appendChild(itemQtt)
  itemQtt.textContent = `Qte : ${localProduct.quantity}`

  // Création élément "input"
  let itemInputQtt = document.createElement('input')
  itemInputQtt.setAttribute('type', 'number')
  itemInputQtt.setAttribute('name', 'itemQuantity')
  itemInputQtt.setAttribute('min', 1)
  itemInputQtt.setAttribute('max', 100)
  itemInputQtt.setAttribute('value', localProduct.quantity)
  itemInputQtt.className = 'itemQuantity'
  itemDivQuantity.appendChild(itemInputQtt)

  function updateQtt() {
    let modifQtt = document.querySelectorAll('.itemQuantity')
    let modifQttCount = modifQtt.length
    modifQtt = modifQtt[modifQttCount - 1]

    modifQtt.addEventListener('change', (event) => {
      const monInput = modifQtt
      const parent = monInput.closest('article')
      productId = parent.dataset.id
      productColor = parent.dataset.color
      console.log(parent, productId, productColor)

      // Sélectionner l'élément à modifier
      let qttModif = articleinLS
      let modifValue = itemInputQtt.valueAsNumber
      console.log('modif', qttModif)
      console.log('value', modifValue)

      if (modifValue <= 0 || modifValue > 100) {
        return alert('Merci de choisir une quantité comprise entre 1 et 100')
      }

      const qttToChange = articleinLS.find(
        (el) => el.id == productId && el.color == productColor,
      )
      console.log(qttToChange)
      qttToChange.quantity = modifValue
      console.log('qttToChange', qttToChange)

      localStorage.setItem('product', JSON.stringify(articleinLS))
      location.reload()
    })
  }
  updateQtt()

  // Supprimer un produit ==>

  // Appel des éléments à supprimer
  let itemDivSettingsDelete = document.createElement('div')
  itemDivSettings.appendChild(itemDivSettingsDelete)
  itemDivSettingsDelete.className = 'cart__item__content__settings__delete'

  let productDelete = document.createElement('p')
  itemDivSettingsDelete.appendChild(productDelete)
  productDelete.className = 'deleteItem'
  productDelete.innerHTML = 'Supprimer'
  productDelete.addEventListener('click', (e) => {
    e.preventDefault()

    // Enregistrer l'id et la couleur sélectionnés par le bouton "Supprimer"
    let deleteId = localProduct.id
    let deleteColor = localProduct.color
    console.log(localProduct, deleteId, deleteColor, articleinLS)

    // Filtrer l'élément cliqué par le bouton supprimer
    newCart = articleinLS.filter(
      (elt) => elt.id !== deleteId || elt.color !== deleteColor,
    )

    // Envoyer les nouvelles données dans le localStorage
    localStorage.setItem('product', JSON.stringify(newCart))

    // Avertir de la suppression
    alert('Votre article a bien été supprimé.')

    // Si pas de produits dans le local storage on affiche que le panier est vide
    if (articleinLS.length === 0) {
      localStorage.clear()
    }

    // Refresh rapide de la page et nouvel affichage du panier
    location.reload()
  })
}

// Création des expressions régulières avec Regex
let regName = new RegExp("^[a-zA-Z-àâäéèêëïîôöùûüç ,.'-]+$")
let regMail = new RegExp(
  '^([A-Z|a-z|0-9](.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((.){0,1}[A-Z|a-z|0-9]){2}.[a-z]{2,3}$',
)
let regAddress = new RegExp(
  '^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+',
)

// Formulaire client
function getForm() {
  const form = document.querySelector('.cart__order__form')

  // Ecoute du prénom
  form.firstName.addEventListener('change', function () {
    validFirstName(this)
  })

  // Ecoute du nom
  form.lastName.addEventListener('change', function () {
    validLastName(this)
  })

  // Ecoute de l'email
  form.email.addEventListener('change', function () {
    validEmail(this)
  })

  // Ecoute de l'adresse
  form.address.addEventListener('change', function () {
    validAddress(this)
  })

  // Ecoute de la ville
  form.city.addEventListener('change', function () {
    validCity(this)
  })

  // Validation du champ prénom
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling

    if (regName.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = ''
    } else {
      firstNameErrorMsg.innerHTML = 'Merci de renseigner votre prénom'
    }
  }

  // Validation du champ nom
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling

    if (regName.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = ''
    } else {
      lastNameErrorMsg.innerHTML = 'Merci de renseigner votre nom'
    }
  }

  // Validation du champ adresse
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling

    if (regAddress.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = ''
    } else {
      addressErrorMsg.innerHTML = 'Merci de renseigner votre adresse'
    }
  }

  // Validation du champ ville
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling

    if (regName.test(inputCity.value)) {
      cityErrorMsg.innerHTML = ''
    } else {
      cityErrorMsg.innerHTML = 'Merci de renseigner votre ville'
    }
  }

  // Validation du champ email
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling

    if (regMail.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = ''
    } else {
      emailErrorMsg.innerHTML = 'Merci de renseigner votre email'
    }
  }
}
getForm()

// Récupération des infos dans le local storage
function postForm() {
  const form = document.querySelector('.cart__order__form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()

    // Récupération du formulaire client
    let inputFirstName = document.getElementById('firstName')
    let inputLastName = document.getElementById('lastName')
    let inputAddress = document.getElementById('address')
    let inputCity = document.getElementById('city')
    let inputEmail = document.getElementById('email')

    // Création d'un tableau pour récupérer les infos du/des produit(s)
    let itemsId = []
    for (let i = 0; i < articleinLS.length; i++) {
      itemsId.push(articleinLS[i].id)
    }

    // Récupération des infos client ET des articles dans un seul argument
    const order = {
      contact: {
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        address: inputAddress.value,
        city: inputCity.value,
        email: inputEmail.value,
      },
      products: itemsId,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    fetch('http://localhost:3000/api/products/order', options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        localStorage.setItem('orderId', data.orderId)

        document.location.href = './confirmation.html?orderId=' + data.orderId
      })
      .catch((error) => {
        alert('Il y a un problème avec fetch : ' + error.message)
      })
  })
}
postForm()
