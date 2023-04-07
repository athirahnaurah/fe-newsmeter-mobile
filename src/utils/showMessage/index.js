import { View } from "react-native";
import { showMessage as showToast } from "react-native-flash-message";
import { colors } from "../colors";

export const showMessage = (message, type) => {
    showToast({
        message, 
        type: type === 'success' ? 'success' : 'danger',
        backgroundColor: type === 'success' ? '#1ABC9C': '#D9435E'
    })
}

// export const showMessage2 = (message, type) => {
//     {type === 'success' (
//         {message}
//     )}
//     {type === 'danger' (
//         {message}
//     )}
// }