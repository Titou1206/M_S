// récupération de l'input du burger par son selecteur css
let burger = document.querySelector(".burger")
// surveillance du click sur le burger et lance la fonction affiche menu
burger.addEventListener("click", (e) => {
	afficheMenu()
})

function afficheMenu(){
// role : affiche le menu et modifie le logo burger
// parametre : rien
// retour : rien
	// récupération du menu par son selecteur css
	let menu = document.querySelector(".menu")
	// enleve ou ajoute la class menu-ouvert
	menu.classList.toggle("menu-ouvert")
	// récupération du hero, main et footer
	let blurs = document.querySelectorAll(".menu-blur")
	// enleve ou ajoute la class blur2
	blurs.forEach(blur=>{
		blur.classList.toggle("blur2")
	})
	// recupération des 3 trait du burger
	let burgerTop = document.querySelector("span.top")
	let burgerMiddle = document.querySelector("span.middle")
	let burgerBottom = document.querySelector("span.bottom")
	// incline les trait haut et bas avec les class associé et fais s'échapper le trait du milieu
	burgerTop.classList.toggle("top-check")
	burgerMiddle.classList.toggle("middle-check")
	burgerBottom.classList.toggle("bottom-check")
}
/* switch mode access - normal */
let body = document.querySelector("body")
let switchAccess = document.getElementById("switch-access")
let btnAccess = document.getElementById("button-access")
switchAccess.addEventListener("change",(e)=>{
    if(switchAccess.checked){
        body.setAttribute("data-style","access")
    }else{
        body.setAttribute("data-style","normal")
    }
})	

/* color mode 
let colorMode = document.getElementById("switch-mode")
colorMode.addEventListener("change",(e)=>{
    console.log("yoyo")
    if(colorMode.checked){
        body.setAttribute("data-mode","dark")
    }else{
        body.setAttribute("data-mode","light")
    }
}) */

/* création d'une carte avec la librairie leaflet */
// centrage de la carte sur une lattitude longitude
var map = L.map('map').setView([45.44977, 4.38139], 13);
// utilisation d'un fond de carte leaflet
var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(map);
// positionnement d'un marqueur aux coordonnées géographique de M'S + pop up
L.marker([45.44977, 4.38139]).addTo(map)
    .bindPopup("M'S Saint Etienne :<br><br>1 Boulevard des Etats Unis<br>42000 Saint Etienne")
    //.openPopup();