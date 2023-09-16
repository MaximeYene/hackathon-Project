import { initializeApp } from "firebase/app";
import {addDoc, collection, getDocs, getFirestore, serverTimestamp,reset, initializeFirestore} from "firebase/firestore"

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

const conducteurs=collection(db, "Chauffeurs");

getDocs(conducteurs).then((snapshot)=>{
    let conducteurs=[];
    snapshot.docs.forEach((doc)=>{
        conducteurs.push((doc.data()));
    });
    console.log(conducteurs);
})

//Ajout de documents dans firestore

const addConductorForm=document.querySelector(".mainForm");
if(addConductorForm){
    addConductorForm.addEventListener('submit',(e)=>{
        e.preventDefault();
    
        //Ajouter un nouveau document avec un id genere
        addDoc(conducteurs,{
            DateDepart:addConductorForm.Date_Depart.value,
            DateArrivee:addConductorForm.Date_arriver.value,
            HeureDepart:addConductorForm.Heure_Depart.value,
            HeureArrivee:addConductorForm.Heure_arriver.value,
            LieuDepart:addConductorForm.Lieu_Depart.value,
            LieuArrivee:addConductorForm.Lieu_arriver.value,
            PrixPlace:addConductorForm.Prix_Place.value,
            Numero:addConductorForm.num.value,
            telephone:addConductorForm.tel.value,
            matricule:addConductorForm.immatriculation.value, 
            dateAjout: serverTimestamp()
    
        }).then(()=>addConductorForm.reset());
    })
}