// on récupère les info contenu dans le fichier json basket
fetch ( "./baskets.json" )
.then ( ret => { return ret.json() })
.then ( baskets => {
    // lance la fonction affiche les baskets en y mettant le fichier reçu en paramêtre
    afficheBasket(baskets)
})

function afficheBasket (baskets){
// rôle : affiche les carte de chaque basket dans le conteneur qui doit les recevoir
// parametre : baskets, un fichier json avec un tableau de donnée contenant les éléments de chaque article
// retour : rien
    // récupèrion du conteneur par son selecteur css
    let basketContainer = document.querySelector(".basket-container")
    // initialisation du conteneur
    basketContainer.innerHTML = ""
    // pour chaque élément contenu dans le tableau de baskets
    baskets.forEach(basket => {
        // affiche le template de la carte basket
        basketContainer.innerHTML += `<a href="detail-produit.html" title="voir le détail de ${basket.nom}">
            <div itemscope itemtype="https://schema.org/Product" class="basket-card">
                <div itemprop="image" class="basket-img mb16"><img src="./assets/imagesProduits/${basket.photo}" alt="photo d'une basket"></div>
                <div class="libelle-px flex j-between a-center mb16">
                    <p itemprop="name" class="fs16 fw700 c-black">${basket.nom}</p>
                    <p itemprop="offers" itemscope itemtype="https://schema.org/Offer" class="fs22 fw700 c-blue"><span itemprop="price" content="${basket.prix}">${basket.prix}</span><span itemprop="priceCurrency" content="EUR">€</span></p>
                </div>
                <p itemprop="description" class="fs16 fw400 c-black">${basket.description}</p>
            </div>
        </a>`
    });
}
