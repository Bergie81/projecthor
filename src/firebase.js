import firebase from "firebase";
import { config } from "../private/firebaseConfig";
/* import {
    user
} from './store/modules/user'; */

// Initialize Firebase
const firebaseApp = firebase.initializeApp(config);
export const db = firebaseApp.database();

// Paths to projects in Firebase
export const dbUsersRef = db.ref("users");
export const dbProjectsRef = db.ref("projects");
export const dbFinishedRef = db.ref("done");
//export const dbProjectsRef = db.ref(`users/${user}/projects`);
