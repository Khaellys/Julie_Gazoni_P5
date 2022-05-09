const items = document.getElementById('items');
const url = 'http://localhost:3000/api/products';   
fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        console.log(data);
        let kanaps = data;      

kanaps.forEach(kanap => { /* foreach*/

//Création élément Article
 const newElt = document.createElement('article')
        let elt = document.getElementById('items')
        elt.appendChild(newElt);

 //Création élément Image       
const articleImg = document.createElement('img')
        newElt.appendChild(articleImg)
        articleImg.src = kanap.imageUrl;
        articleImg.alt = kanap.altTxt;        

//Création élément H3        
const articleTitle = document.createElement('h3')
        newElt.appendChild(articleTitle);
        articleTitle.innerHTML = kanap.name;

//Création élément P
const articlePara = document.createElement('p')
        newElt.appendChild(articlePara);
        articlePara.innerHTML = kanap.description;
        });
      
    })
    .catch(function(error) {
        console.log('Oups !... Une erreur est survenue ');
    });