import axios from "axios";
import ApiConfigLocal from "../../../config/ApiConfigLocal";
import ApiHeader from "../../../config/ApiHeader";
import { storeData, showMessage } from "../../../utils";
import { setLoading } from "../global";

export const registrasiAction = (dataRegistrasi, navigation) => (dispatch) => {
    console.log('data registrasi:', dataRegistrasi)
    dispatch(setLoading(true));

    axios.post(`${ApiConfigLocal}/register`, dataRegistrasi,
    {header : ApiHeader})
    .then((res) => {
        console.log('response:', res);
        storeData('token', {value : res.data.id});
        showMessage('Registrasi Berhasil', 'success')
        navigation.reset({ index: 0, routes: [{name: 'MinatKategori'}] });
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
        dispatch(setLoading(false));
        
    })
}