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

// Gestion du panier

let panier =[];

const btnPanier = document.getElementById('addToCart');
    btnPanier.addEventListener('click', function() {

         // Récupération de la couleur choisie
        choixCouleur = document.getElementById('colors').value;

        // Récupération de la quantité choisie
        articleQuantity = Number(document.getElementById('quantity').value);

        // Initialisation du local storage
    //let panier = JSON.parse(localStorage.getItem('panier'))
        
        // Conditions requises : quantité comprise entre 1 et 100 et couleur non nulle
        if (Number(document.getElementById('quantity').value) <= 0 || Number(document.getElementById('quantity').value) > 100 || document.getElementById('colors').value.length <= 0) {
            alert('Merci de choisir une couleur et une quantité');
            return
        } else {

        // Importation dans le local storage    
        panier.push({'couleur': choixCouleur, 'quantity' : articleQuantity, 'id' :articleId})
        console.log(panier)
        localStorage.panier = JSON.stringify(panier)
        //localStorage.panier = JSON.parse(panier)
        
        }       

// Validation Panier
const validationPanier = () => {
    window.location.href = 'cart.html';
}

validationPanier();

});


    
 //panier = JSON.parse(localStorage.getItem('panier'))
       //console.log(panier)




//.catch(function(error) {
    //console.log('Oups !... Une erreur est survenue ');
//});