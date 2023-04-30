import axios from "axios";
import ApiConfigLocal from "../../../config/ApiConfigLocal";
import ApiHeader from "../../../config/ApiHeader";
import { storeData, showMessage, showToasty } from "../../../utils";
import { setLoading, setLoadingScreen } from "../global";
// import popUpMessage from "../../../utils/PopUpMessage";
import { useState } from "react";
import { Alert } from "react-native";

export const registrasiAction = (dataRegistrasi, onCallback = res => {}, onError = err => {}) => (dispatch) => {

    console.log('data registrasi:', dataRegistrasi)
    dispatch(setLoadingScreen(true));
    // showToasty('...Memproses')
    axios.post('http://10.0.2.2:5000/register', dataRegistrasi)
    .then((res) => {
        console.log('response:', res);
        // dispatch({ type: 'SET_REGISTRATION_ON_SUCCESS', value: true});
        // storeData('token', {value : res.data.id});
        // onCallback(res.data)
        Alert.alert(
            'Aktivasi Akun', 'Silahkan periksa email untuk aktivasi akun Anda.'
        );
        // navigation.reset({ index: 0, routes: [{name: 'MinatKategori'}] });
    })
    .catch((err) => {
        console.log('Error:', err)
        // showMessage('Registrasi Gagal', 'danger')
        Alert.alert(
            'Error', 'Email sudah terdaftar, gunakan email lain atau silahkan login.'
        );
    })
    .finally(() => {
        dispatch(setLoadingScreen(false));
        
    })
}