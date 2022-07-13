const items = document.getElementById('items')
const url = 'http://localhost:3000/api/products'
fetch(url)
  .then((resp) => resp.json()) //promise
  .then(function (data) {
    console.log(data)
    let products = data

    products.forEach((product) => {
      //exécute une fonction donnée sur chaque élément du tableau
      let articleLink = document.createElement('a')
      document.getElementById('items').appendChild(articleLink)
      articleLink.href = `./product.html?id=${product._id}` // Envoit sur la page du produit sélectionné

      //Création élément Article
      let newElt = document.createElement('article')
      let elt = document.getElementById('items')
      elt.appendChild(newElt)
      articleLink.appendChild(newElt)

      //Création élément Image
      let articleImg = document.createElement('img')
      newElt.appendChild(articleImg)
      articleImg.src = product.imageUrl
      articleImg.alt = product.altTxt

      //Création élément H3
      let articleTitle = document.createElement('h3')
      newElt.appendChild(articleTitle)
      articleTitle.innerHTML = product.name

      //Création élément P
      let articlePara = document.createElement('p')
      newElt.appendChild(articlePara)
      articlePara.innerHTML = product.description
    })
  })
  .catch(function (error) {
    alert('Oups !... Une erreur est survenue ')
  })
