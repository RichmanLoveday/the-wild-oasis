// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage'

import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://zcpyhfuzxitffokvcyqe.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjcHloZnV6eGl0ZmZva3ZjeXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0Mzg3MzYsImV4cCI6MjAxNTAxNDczNn0.k8akOKvYNT9BQBFjjZqEqV_YscbWl2wVdssqVlawkQs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;



// const firebaseConfig = {
//     apiKey: "AIzaSyC-ItegJynTMQuYS-xXsNyUv7cqTRwXPec",
//     authDomain: "the-wild-oasis-db503.firebaseapp.com",
//     projectId: "the-wild-oasis-db503",
//     storageBucket: "the-wild-oasis-db503.appspot.com",
//     messagingSenderId: "793138689793",
//     appId: "1:793138689793:web:fbe7e365dd679175e00d00",
//     measurementId: "G-0VJ84B1L3F"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);
// export const storage = getStorage(app);