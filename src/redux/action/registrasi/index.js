import axios from "axios";
import ApiConfigLocal from "../../../config/ApiConfigLocal";
import ApiHeader from "../../../config/ApiHeader";
import { storeData, showMessage, showToasty } from "../../../utils";
import { setLoading, setLoadingScreen } from "../global";
// import popUpMessage from "../../../utils/PopUpMessage";
import { useState } from "react";

export const registrasiAction = (dataRegistrasi, onCallback = res => {}, onError = err => {}) => (dispatch) => {

    console.log('data registrasi:', dataRegistrasi)
    dispatch(setLoadingScreen(true));
    // showToasty('...Memproses')
    axios.post('http://10.0.2.2:5000/register', dataRegistrasi)
    .then((res) => {
        console.log('response:', res);
        dispatch({ type: 'SET_REGISTRATION_ON_SUCCESS', value: true});
        // storeData('token', {value : res.data.id});
        // showToasty('Please check email to activate your account', 'success')
        // popUpMessage('Please check email to activate your account', setLoading(false), setLoading(false))
        // onCallback(res.data)
        // navigation.reset({ index: 0, routes: [{name: 'MinatKategori'}] });
    })
    .catch((err) => {
        console.log('Error:', err)
        // showMessage('Registrasi Gagal', 'danger')
        showMessage(
            // `Error Sign Up , email / username sudah terdaftar, gunakan email atau username lain !!! ${err?.response?.data?.data?.message}`,
            `Email sudah terdaftar, gunakan email lain atau silahkan login.`,
            'danger',
          );
    })
    .finally(() => {
        dispatch(setLoadingScreen(false));
        
    })
}