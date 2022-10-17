import {initializeApp} from 'firebase/app';
import{
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCXZO06P03A0ERJR3q_8QWN08FM2Upe3Ko",
    authDomain: "zh-clothing-db.firebaseapp.com",
    projectId: "zh-clothing-db",
    storageBucket: "zh-clothing-db.appspot.com",
    messagingSenderId: "502664335886",
    appId: "1:502664335886:web:ecaf97ea8bdfc75bef625f"
  };
  
// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
        })

    await batch.commit()
    console.log("Done")

};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data()
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})

    return categoryMap;
};


export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message)
        }
        return userDocRef;
    }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    
    const user = await createUserWithEmailAndPassword(auth, email, password)

    return user
}

export const signInEmailAndPasswordThroughFirebase = async (email, password) => {
    const UserCredential = await signInWithEmailAndPassword(auth,email,password);
    return UserCredential;
}

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListner = (callback) => 
    onAuthStateChanged(auth, callback);
