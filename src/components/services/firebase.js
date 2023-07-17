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
} from "firebase/firestore";
import {firebaseConfig} from "./config";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// google auth signin
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const date = new Date().toUTCString().slice(5, 16)
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "===", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                joined: date,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// Function to show the loading container
const showLoading = () => {
    const loadingContainer = document.getElementsByClassName('loading-container')[0];
    loadingContainer.style.display = 'flex';
};

// Function to hide the loading container
const hideLoading = () => {
    const loadingContainer = document.getElementsByClassName('loading-container')[0];
    loadingContainer.style.display = 'none';
};

// login with email and password
const logInWithEmailAndPassword = async (email, password) => {
    try {
        showLoading()
        await signInWithEmailAndPassword(auth, email, password);
        hideLoading()
    } catch (err) {
        console.error(err);
        alert(err.message);
        hideLoading()
    }
};
// register with email
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        showLoading()
        const date = new Date().toUTCString().slice(5, 16)
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            joined: date,
        });
        hideLoading()
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};


export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    logout,
    showLoading,
    hideLoading,
};