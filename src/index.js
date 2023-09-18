import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, serverTimestamp, reset, initializeFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBzZ_z_XZGU8XCqsbHTsCuf0niDvsk_ivI",
    authDomain: "hackathon-project-4ca7d.firebaseapp.com",
    projectId: "hackathon-project-4ca7d",
    storageBucket: "hackathon-project-4ca7d.appspot.com",
    messagingSenderId: "1009554277068",
    appId: "1:1009554277068:web:f777e4ec63552aa65ff869"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize database firestore
const db = getFirestore(app);

const conducteursRef = collection(db, "Chauffeurs");
let conducteurs = [];

getDocs(conducteursRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
        conducteurs.push((doc.data()));
    });
    console.log(conducteurs);

    affichage(conducteurs)
})



//Ajout de documents dans firestore

const addConductorForm = document.querySelector(".mainForm");
if (addConductorForm) {
    addConductorForm.addEventListener('submit', (e) => {
        e.preventDefault();

        //Ajouter un nouveau document avec un id genere
        addDoc(conducteursRef, {
            DateDepart: addConductorForm.Date_Depart.value,
            DateArrivee: addConductorForm.Date_arriver.value,
            HeureDepart: addConductorForm.Heure_Depart.value,
            HeureArrivee: addConductorForm.Heure_arriver.value,
            LieuDepart: addConductorForm.Lieu_Depart.value,
            LieuArrivee: addConductorForm.Lieu_arriver.value,
            PrixPlace: addConductorForm.Prix_Place.value,
            numero: addConductorForm.num.value,
            telephone: addConductorForm.tel.value,
            matricule: addConductorForm.immatriculation.value,

        }).then(() => addConductorForm.reset());
    })
}

function affichage(conducteurs) {

    if (conducteurs.length == 0)
        return;

    const ElementRecherche = document.querySelector("#conducteur-content");
    ElementRecherche.innerHTML = ''


    for (let i = 0; i < conducteurs.length; i++) {
        const article = conducteurs[i];
        const part = document.createElement("div");
        part.innerHTML = ""
        const DateDepartElement = document.createElement("p");
        DateDepartElement.innerText = `Date de Depart du conducteur : ${article.DateDepart}`;
        const DateArrivieeElement = document.createElement("p");
        DateArrivieeElement.innerText = `Date d arrivee du conducteur d'arrivee : ${article.DateArrivee}`;
        const HeureDepartElement = document.createElement("p");
        HeureDepartElement.innerText = `Heure de depart du conducteur : ${article.HeureDepart}`;
        const HeureArriveeElement = document.createElement("p");
        HeureArriveeElement.innerText = ` Heure d arrivee du conducteur : ${article.HeureArrivee}`;
        const LieuDepartElement = document.createElement("p");
        LieuDepartElement.innerText = `Lieu de depart du conducteur : ${article.LieuDepart}`;
        const LieuArriveeElement = document.createElement("p");
        LieuArriveeElement.innerText = `Lieu d'arrivee du conducteur : ${article.LieuArrivee}`;
        const PrixPlaceElement = document.createElement("p");
        PrixPlaceElement.innerText = `Prix d'une place : ${article.PrixPlace}`;
        const numElement = document.createElement("p");
        numElement.innerText = `Nombre de places disponibles : ${article.numero}`;
        const telephoneElement = document.createElement("p");
        telephoneElement.innerText = `Numero de telephone : ${article.telephone}`;
        const matriculeElement = document.createElement("p");
        matriculeElement.innerText = `Numero de telephone : ${article.matricule}`;

        //Rattachement de nos balises au DOM
        ElementRecherche.appendChild(part);
        part.appendChild(DateDepartElement);
        part.appendChild(DateArrivieeElement);
        part.appendChild(HeureDepartElement);
        part.appendChild(HeureArriveeElement);
        part.appendChild(LieuDepartElement);
        part.appendChild(LieuArriveeElement);
        part.appendChild(PrixPlaceElement);
        part.appendChild(numElement);
        part.appendChild(telephoneElement);
        part.appendChild(matriculeElement);
    };
}


function search(lieu_arriver, lieu_Depart) {
    if (conducteurs != []) {
        let searchTab = conducteurs.filter(conducteur => conducteur.LieuDepart.trim().toLowerCase().includes(lieu_Depart.trim().toLowerCase()) && conducteur.LieuArrivee.trim().toLowerCase().includes(lieu_arriver.trim().toLowerCase()))
        console.log({ searchTab })
        affichage(searchTab)
    }

}

function btnclick() {
    console.log(conducteurs)
    const lieu_arrive = document.getElementById('Lieu-arriver').value
    const lieu_Depart = document.getElementById('Lieu-Depart').value
    search(lieu_arrive, lieu_Depart )
}

const searchConducteurBtn = document.querySelector("#btn-conducteur-search");

searchConducteurBtn.addEventListener('click', (e) => {
    btnclick()
})