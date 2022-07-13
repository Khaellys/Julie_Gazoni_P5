var page = window.location.href // URL de la page courante
var url = new URL(page)
var articleId = url.searchParams.get('id')

getProduct() // Execution de la fonction

function getProduct() {
  const url = 'http://localhost:3000/api/products/'
  fetch(url + articleId)
    .then((resp) => {
      return resp.json()
    })

    // Répartition des données de l'API dans le DOM
    .then(async function (donneesAPI) {
      //promise
      product = await donneesAPI
      console.table(product)
      if (product) {
        callProduct(product)
      }
    })
}

function callProduct(product) {
  //Création élément Image
  let articleImg = document.createElement('img')
  document.querySelector('.item__img').appendChild(articleImg)
  articleImg.src = product.imageUrl
  articleImg.alt = product.altTxt

  // Insertion du Nom
  let articleName = document.getElementById('title')
  articleName.innerHTML = product.name

  // Insertion du prix
  let articlePrice = document.getElementById('price')
  articlePrice.innerHTML = product.price

  // Insertion de la Description
  let articleDescription = document.getElementById('description')
  articleDescription.innerHTML = product.description

  // Insertion des Couleurs
  for (let colors of product.colors) {
    console.table(colors)
    let articleColor = document.createElement('option')
    document.getElementById('colors').appendChild(articleColor)
    articleColor.value = colors
    articleColor.innerHTML = colors
  }
}

// Gestion du panier
const btnPanier = document.getElementById('addToCart')
btnPanier.addEventListener('click', function () {
  // Récupération des options du produit
  let optionPanier = {
    name: product.name,
    id: articleId,
    color: colors.value,
    quantity: Number(document.getElementById('quantity').value),
  }

  // Conditions requises : quantité comprise entre 1 et 100 et couleur non nulle
  if (
    Number(document.getElementById('quantity').value) <= 0 ||
    Number(document.getElementById('quantity').value) > 100 ||
    document.getElementById('colors').value.length <= 0
  ) {
    alert('Merci de choisir une couleur et une quantité')
    return
  }

  // Confirmation d'ajout au panier
  const popupConfirmation = () => {
    if (
      window.confirm(`${optionPanier.quantity} ${optionPanier.name} ${optionPanier.color} a été ajouté à votre panier :
        OK pour consulter votre panier, ANNULER pour retourner à l'accueil`)
    ) {
      window.location.href = 'cart.html'
    } else {
      window.location.href = 'index.html'
    }
  }

  // Récupération du local storage
  let articleinLS = JSON.parse(localStorage.getItem('product'))

  // Produit(s) présent(s) dans le local storage
  if (articleinLS) {
    // Si même ID et même couleur
    let sameId = articleinLS.find(
      (produit) =>
        produit.id == optionPanier.id && produit.color == optionPanier.color,
    )
    if (sameId != undefined) {
      sameId.quantity = Number((optionPanier.quantity += sameId.quantity))
    } else {
      articleinLS.push(optionPanier)
    }
    localStorage.setItem('product', JSON.stringify(articleinLS))

    popupConfirmation()
  }

  // Pas de produit(s) dans le local storage
  else {
    articleinLS = []
    articleinLS.push(optionPanier)
    localStorage.setItem('product', JSON.stringify(articleinLS))
    popupConfirmation()
  }
})
