/* eslint-disable*/
import { getCurrentUTCTimestampWithMonthInWords } from "../utils/helpers";


import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zcpyhfuzxitffokvcyqe.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjcHloZnV6eGl0ZmZva3ZjeXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0Mzg3MzYsImV4cCI6MjAxNTAxNDczNn0.k8akOKvYNT9BQBFjjZqEqV_YscbWl2wVdssqVlawkQs";
const supabase = createClient(supabaseUrl, supabaseKey);

// import {
//     addDoc,
//     collection,
//     deleteDoc,
//     doc,
//     getDocs,
// } from "firebase/firestore";

// cabin ref for data base
// const cabinsRef = collection(db, "cabins");

// export async function getCabins() {
//     try {
//         let cabins = [];
//         let allCabins = await getDocs(cabinsRef);

//         if (allCabins.empty) throw new Error("Data could not be loaded");

//         allCabins.forEach((doc) => {
//             const data = doc.data();
//             data.id = doc.id;
//             cabins.push(data);
//         });
//         return cabins;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }

// }

// export async function deleteCabin(id) {
//     try {
//         const cabin = doc(db, "cabins", id);
//         const delCabin = await deleteDoc(cabin);

//     } catch (error) {
//         console.log("Error deleting cabin", error);
//         throw new Error('Cabin could not be deleted');
//     }
// }


// export async function createCabin(newCabin) {
//     // randomize image
//     const imageName = `${Math.random()}-${newCabin.image}`.replaceAll('/', '')

//     const mountainImagesRef = ref(storage, `avatar/${imageName}`);

//     try {
//         // Add new cabin row
//         const docRef = await addDoc(cabinsRef, { ...newCabin, created_at: getCurrentUTCTimestampWithMonthInWords() });

//     } catch (error) {
//         // console.log("Error adding document", error);
//         throw new Error("Unable to create cabin");
//     }
// }


// FOR SUPABASE 
export async function getCabins() {
    let { data: cabins, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }

    return cabins;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase
        .from("cabins")
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error("Cabin could not be deleted");
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    console.log(newCabin);
    const hasImagePath = newCabin.image?.startsWith(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', "");

    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create cabin
    let query = supabase.from("cabins");


    // A) For new data
    if (!id) query = query.insert([{ ...newCabin, image: imagePath, }])

    // B) For Updating data  
    if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

    // getting data and error
    const { data, error } = await query.select().single();

    // Errro for create new cabin
    if (error && id) throw new Error('Cabin could not be created');

    // Error for updated data
    // if (error && !id) throw new Error("Cabin could not be updated");

    console.log(imageName)
    // 2. Upload image
    const { error: storageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    console.log(storageError);

    // 3. Delete cabin if there was an error uploading
    if (storageError) {
        await supabase.from("cabin").delete().eq('id', data.id);
        throw new Error("Cabin image could not be uploaded and the cabin was not created");
    }

    return data;
}