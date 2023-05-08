import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "../showMessage";

export const storeData = async (storageKey, value) => {
    try{
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(storageKey, jsonValue)
        console.log('jsonValue:', jsonValue);
    } catch (e) {
        console.log("Error storageData", e)
        // showMessage('Tidak dapat menyimpan di local storage')
    }
}

export const getData = async (storageKey) => {
    try{
        const jsonValue = await AsyncStorage.getItem(storageKey)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log("Error getData", e)
        // showMessage('Tidak dapat mengambil data di local storage' + e)
    }
}

export const authHeader = () => {
    const user = getData ('token');
    return { "x-auth-token" : user}
    // if (user && user.access_token){
        
    // } else {
    //     return{};
    // }
}