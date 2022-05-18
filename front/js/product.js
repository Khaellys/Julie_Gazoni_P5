var page = window.location.href; //URL de la page courante
var url = new URL(page);
var articleId = url.searchParams.get("id");
console.log(articleId);

getProduct(); 

function getProduct() {
const url = 'http://localhost:3000/api/products/'; 
fetch(url + articleId)
    .then((resp) => {
   return resp.json();
})

// Répartition des données de l'API dans le DOM
.then(async function (donneesAPI) { //promise
    kanap = await donneesAPI;
    console.table(kanap);
     if (kanap){
         callProduct(kanap);
     }  
}) 
}

function callProduct(kanap){

 //Création élément Image       
let articleImg = document.createElement('img')
    document.querySelector('.item__img').appendChild(articleImg)
    articleImg.src = kanap.imageUrl;
    articleImg.alt = kanap.altTxt;

// Insertion du Nom
let articleName = document.getElementById('title')
    articleName.innerHTML = kanap.name;

// Insertion du prix
let articlePrice = document.getElementById('price')
    articlePrice.innerHTML = kanap.price;

// Insertion de la Description
let articleDescription = document.getElementById('description')
    articleDescription.innerHTML = kanap.description;

// Insertion des Couleurs
for (let colors of kanap.colors){
    console.table(colors)
    let articleColor = document.createElement('option')
        document.getElementById('colors').appendChild(articleColor);
        articleColor.value = colors;
        articleColor.innerHTML = colors;
}
}

// Panier
function addToCart(kanap){
    const addPanier = document.getElementById('addToCart');
    addPanier.addEventListener('click', (event) => {
// Conditions : quantité entre 1 et 100, et choix d'une couleur        
        if(itemQuantity > 0 && itemQuantity <= 100 && articleColor > 0){
        addPanier.innerHTML = "Article ajouté au panier";
         } 
    });
}

// Récupération dans le stockage local du panier
localStorage.articleId = this.articleId;
localStorage.articleColor = colors;

//.catch(function(error) {
    //console.log('Oups !... Une erreur est survenue ');
//});