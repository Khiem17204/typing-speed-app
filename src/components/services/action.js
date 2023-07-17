import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    updateDoc,
} from "firebase/firestore";
import {firebaseConfig} from "./config"
import {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    logout,
    showLoading,
    hideLoading,
} from "./firebase"
import { update } from "tar";


const updateUserData = async (image, bio, name) => {
    try {
        const user = auth.currentUser
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        await updateDoc(docs, {
            ...docs,
            img: image,
            bio: bio,
            name: name,
        })
    }catch (err) {
        console.error(err)
    }
}



export {
    updateUserData
}