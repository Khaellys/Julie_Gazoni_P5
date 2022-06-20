const items = document.getElementById('items')
const url = 'http://localhost:3000/api/products'
fetch(url)
  .then((resp) => resp.json()) //promise
  .then(function (data) {
    console.log(data)
    let kanaps = data

    kanaps.forEach((kanap) => {
      //exécute une fonction donnée sur chaque élément du tableau

      let articleLink = document.createElement('a')
      document.getElementById('items').appendChild(articleLink)
      articleLink.href = `./product.html?id=${kanap._id}` //remplace dynamiquement les variables dans une string

      //Création élément Article
      let newElt = document.createElement('article')
      let elt = document.getElementById('items')
      elt.appendChild(newElt)
      articleLink.appendChild(newElt)

      //Création élément Image
      let articleImg = document.createElement('img')
      newElt.appendChild(articleImg)
      articleImg.src = kanap.imageUrl
      articleImg.alt = kanap.altTxt

      //Création élément H3
      let articleTitle = document.createElement('h3')
      newElt.appendChild(articleTitle)
      articleTitle.innerHTML = kanap.name

      //Création élément P
      let articlePara = document.createElement('p')
      newElt.appendChild(articlePara)
      articlePara.innerHTML = kanap.description
    })
  })
  .catch(function (error) {
    alert('Oups !... Une erreur est survenue ')
  })
