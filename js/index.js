// Animation en caroussel de la section marques à l'aide de la librairie swipper
const swiper = new Swiper('.swiper-marques', {
    // parametres du caroussel
    // direction
    direction: 'horizontal',
    // animation en boucle
    loop: true,
    // animation en continue, swippe toute les 2s
    autoplay: {
        delay: 2000,
    },
    // parametres par défaut : 1 slide par vue
    slidesPerView: 1,
    spaceBetween: 10,
    // Breackpoints avec ajout d'une slide par vue à 450, 690 et 1200px
    breakpoints: {
        // when window width is >= 450px
        450: {
        slidesPerView: 2,
        spaceBetween: 20
        },
        // when window width is >= 690px
        690: {
        slidesPerView: 3,
        spaceBetween: 30
        },
        // when window width is >= 1200px
        1200: {
        slidesPerView: 4,
        spaceBetween: 40,
        loop: false
        }
    },
    // pour cette animation j'ai volontairement enlevé les possibilité de navigations au scroll ou bouton
});


// vérification du formulaire
//récupération du formulaire
let formContact = document.getElementById("form-contact")
// surveillance de la soumission
formContact.addEventListener("submit", (e)=>{
    // annulation de son comportement par défaut pour effectuer nos test
    e.preventDefault()
    // lancement de tout les test
    let testsResult = batterieTest()
    // test si ok pour afficher la prise en compte 
    afficheSoumission(testsResult)
})
function batterieTest(){
    // role : test tout les champs pour vérifier que tout est ok
    // parametre : aucun
    // retour : true / false
    let test1 = testNomPrenom(nom)
    let test2 = testNomPrenom(prenom)
    let test3 = testEmail()
    let test4 = testObjet()
    let test5 = testRef()
    let test6 = testMsg()
    // si tout les test ne sont pas true, on retourne false, sinon on retourne true
    if(!(test1 && test2 && test3 && test4 && test5 && test6)){
        return false
    }else{
        return true
    }
}
function afficheSoumission(result){
// role : si resultat des test true on affiche la prise en compte.
// parametre : resultat de batterie test
// retour : aucun
    let submitOk = formContact.querySelector("#submit-ok")
    if(result){
        submitOk.classList.remove("d-none")
    }else{
        submitOk.classList.add("d-none")
    }
}
// surveille le changement sur le champ nom et lance le test lié
let nom = formContact.querySelector("#nom")
nom.addEventListener("change",()=>{
    testNomPrenom(nom)
})
// surveille le changement sur le champ prenom et lance le test lié
let prenom = formContact.querySelector("#prenom")
prenom.addEventListener("change",()=>{
    testNomPrenom(prenom)
})
// surveille le changement sur le champ email et lance le test lié
let email = formContact.querySelector("#email")
email.addEventListener("change",()=>{
    testEmail()
})
// surveille le changement sur le champ objet et lance le test lié, puis affiche le champs ref si un objet produit est sélectionné
let objet = formContact.querySelector("#objet")
let selectPrd = formContact.querySelector(".select-prd")
objet.addEventListener("change",()=>{
    testObjet()
    afficheRefProduit()
})
// surveille et test le champ ref si il est affiché
let ref = formContact.querySelector("#ref")
ref.addEventListener("change",()=>{
    testRef()
})
// surveille le changement sur le champ msg et lance le test lié
let msg = formContact.querySelector("#msg")
msg.addEventListener("change",()=>{
    testMsg()
})
// surveille la longueur du champ msg et affiche le nombre de caractere utilisé
let long = formContact.querySelector("#long")
msg.addEventListener("input",()=>{
    long.innerHTML = msg.value.length+"/500"
})
function testNomPrenom(nomPrenom) {
// role : test que le nom ou le prenom soit renseigné correctement, sans qu'il ne soit trop lo g, qu'il y ai de chiffre ou de script dedans
// parametre : nomPrenom - id de l'input testé
// retour : true/false en fonction si le test est ok ou si il y a un prb
    if(nomPrenom.value===""){ // test si le champs est vide
        // affichage du message d'erreur + bordure rouge sur l'input
        afficheErreur(nomPrenom.id,"Ce champs ne peux pas être vide")
        return false
    }else{  // test si l'utilisateur a bien utiliser des caracteres alphabetiques
        // affichage du message d'erreur + bordure rouge sur l'input
        // Cette expression régulière permet de capturer des noms et prénoms avec des caractères alphabétiques, des accents, des apostrophes et des tirets, et autorise également les espaces entre les noms et prénoms.  -> on peut remplacer le + qui laisse la possibilité de mettre un mot infinie par {2,20} qui signifie mot compris entre 2 et 20 caractere
        let reg = /^[a-zA-ZÀ-ÿ'-]+(?:\s[a-zA-ZÀ-ÿ'-]+)*$/ 
        if(reg.test(nomPrenom.value)===false){
            // test que les carcatère utilisé soit autorisé
            afficheErreur(nomPrenom.id, "Ce champ comporte des caractères non autorisés")
            return false
        }else if(nomPrenom.value.length < 2 || nomPrenom.value.length >= 40){
            // test que la longueur du prénom ne soit pas trop longue
            afficheErreur(nomPrenom.id, "Vous avez tapez un nom trop long")
            return false
        }
        // si aucune des conditions ci dessus ne sont rempli, on enleve les erreurs
        enleveErreur(nomPrenom.id)
        return true
}
}
function testEmail(){
// role : test que le mail soit bien renseigné, sans caractère spécial et pas trop long
// parametre : aucun
// retour : true/false en fonction si le test est ok ou si il y a un prb
    // création variable reg qui indique les caractère autorisé
    let reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(email.value===""){
        // zone vide affiche erreur et bordure
        afficheErreur("email","Ce champ ne peux pas être vide")
        return false
    }else{
        if(reg.test(email.value)===false){
            // on test si l'utilisateur utilise les bons caractères
            afficheErreur("email","Ce champ comporte des caractères non autorisés")
            return false
        }else if(email.value.length > 100){
            // on test la longueur du mot
            afficheErreur("email",`le nombre de carctère saisis doit être inférieur à 100`)
            return false
        }
        enleveErreur("email")
        return true
    } 
}
function testObjet(){
// role : test qu'un objet soit bien sélectionné
// parametre : aucun
// retour : true/false en fonction si le test est ok ou si il y a un prb
    if(objet.value===""){
        afficheErreur("objet","Veuillez choisir un objet")
        return false
    }else{
        enleveErreur("objet")
        return true
    }
}
function afficheRefProduit(){
    // role : si objet en relation avec les produit selectionné affiche le champ ref produits
    // parametre : aucun
    // retour : aucun
        if(objet.selectedOptions[0].value==="info-prd" || objet.selectedOptions[0].value==="prb-prd"){
            selectPrd.classList.remove("d-none")
        }else{
            selectPrd.classList.add("d-none")
        }
}
function testRef(){
// role : test que la ref soit renseigné correctement, avec le bon nbre de caractère sans caractere spécial
// parametre : aucun
// retour : true/false en fonction si le test est ok ou si il y a un prb
    if(objet.selectedOptions[0].value==="info-prd" || objet.selectedOptions[0].value==="prb-prd"){
        let reg = /^[a-zA-Z]{3}-[0-9]{6}$/
        if(ref.value===""){ // test si le champs est vide
            // affichage du message d'erreur + bordure rouge sur l'input
            afficheErreur(ref.id,"Ce champs ne peux pas être vide")
            return false
        }else if(reg.test(ref.value)===false){
            // affichage du message d'erreur + bordure rouge sur l'input
            afficheErreur(ref.id,"la référence est composé de 3 lettres, 1 tiret et 6 chiffres (ex: xxx-123456)")
            return false
        }
        enleveErreur(ref.id)
        return true
    }
}
function testMsg(){
// role : test que le msg soit renseigné correctement, qans qu'il ne soit trop long ou qu'il n'y ai de script dedans
// parametre : aucun
// retour : true/false en fonction si le test est ok ou si il y a un prb
    if(msg.value===""){
        // Test si le champs est vide
        afficheErreur("msg", "Veuillez formuler votre demande")
        return false
    }else if(hasCode(msg.value)){
        // si champs ne comporte pas de code
        afficheErreur("msg", "Vous ne pouvez pas injecter de code ici !")
        return false
    }else if(msg.value > 500){
        // si le champs n'est pas plus long que 500
        afficheErreur("msg", "Vous avez tapez un message trop long")
        return false
    }
    enleveErreur("msg")
    return true
}
function hasCode(text){
// role : test si le texte contient du code (<script)
// parametre: le texte à tester
// retour : true si le texte contient script / false si il n'en contient pas
    // création de l'expression régulière
    let reg = /<script/
    // retourne le résultat du test
    return reg.test(text)
}
function afficheErreur(id,msgErr){
// role : on affiche une bordure rouge sur l'input qui remonte une erreur et remplir le message d'erreur associé
// parametre : id - id de l'input en erreur
//             msgErr - message a afficher sous l'input
// retour : rien
    // récupération de l'input concerné
    let input = document.getElementById(id)
    // ajuot de la class input-error
    input.classList.add("input-error")
    // recupération du paragraphe a afficher
    let p = document.getElementById("error-"+id)
    // remplissage du paragraphe
    p.innerText = msgErr
    // activation du paragraphe
    p.classList.remove("d-none")
}
function enleveErreur(id){
// enlève l'erreur sur l'input et cache le paragraphe associé
// parametre : id - id de l'input qui n'est plus en ereur
// retour - rien
    // récupération de l'input concerné
    let input = document.getElementById(id)
    // retrait de la class input-error
    input.classList.remove("input-error")
    // recupération du paragraphe a désactiver
    let p = document.getElementById("error-"+id)
    // initialisation du paragraphe
    p.innerText = ""
    // désactivation du paragraphe
    p.classList.add("d-none")
}

/* animation */
// on anime que si nous avons une largeur d'écran supérieur à 690
// récupération de la largeur de la fenêtre :
let largeurFenetre = window.innerWidth
// Animation au scroll : inspiré de la librairie AOS
// https://michalsnik.github.io/aos/
window.addEventListener("scroll",animateOnScroll)
function animateOnScroll(){
    // Role : verifier pour chacune des divs animable si celle ci est entierement affichée a l'ecran , 
    // dans ce cas animer son apparition (enlevant la classe qui cree le décalage)
    // parametre : aucun
    // retour : rien
    if(largeurFenetre > 689){
        // récupération de toute les divs animables
        let divs = document.querySelectorAll(".animatedScroll")
        //On parcours le tableau et pour chaque element du tableau :
        for(let i= 0; i<divs.length; i++){
            let winHeigt = window.innerHeight;
            // sureveillance de la position de la box par rapport à la fenêtre
            let box = divs[i].getBoundingClientRect();
            // récupération de la valeur du data-animation = ce qui donne la classe à enlever/ajouter
            let animation = divs[i].getAttribute("data-animation")
            // si le top de la box dépasse le haut de la fenetre (y>0) et si le bas de la box est a une position inférieur au bas de la fenetre
            if(box.y>-150 && box.bottom< winHeigt+150){
                // on anime
                divs[i].classList.remove(animation)
            }else{
                // sinon on enleve l'animation
                divs[i].classList.add(animation)
            }
        }
    } 
}