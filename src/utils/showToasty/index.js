import { RNToasty } from "react-native-toasty";

export const showToasty = (message, type) => {
    if(type === 'success'){
        return RNToasty.Success({
            title: message,
            titleSize: 11,
            position: 'center',
        })
    }else if (type === 'info') {
        return RNToasty.Info({
            title: message,
            titleSize: 11,
            position: 'center',
        }) 
    }else if (type === 'warning') {
        return RNToasty.Warn({
            title: message,
            titleSize: 11,
            position: 'center',
        }) 
    }else if (type === 'error') {
        return RNToasty.Error({
            title: message,
            titleSize: 11,
            position: 'center',
        }) 
    }else if (type === 'show') {
        return RNToasty.Show({
            title: message,
            titleSize: 11,
            position: 'center',
        }) 
    }else{
        return RNToasty.Normal({
            title: message,
            titleSize: 11,
            position: 'center',
        }) 
    }
}