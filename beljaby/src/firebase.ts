import firebase from 'firebase'
import { firebaseKey } from './secrets'

var firebaseConfig = {
    apiKey: firebaseKey,
    authDomain: "beljabi-34d09.firebaseapp.com",
    projectId: "beljabi-34d09",
    storageBucket: "beljabi-34d09.appspot.com",
    messagingSenderId: "171554853932",
    appId: "1:171554853932:web:fd07aff095bb27e2f1ed89"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db