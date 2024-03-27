import Toast, { ToastShowParams } from "react-native-toast-message";

export default function ToastService() {
    const baseProps: ToastShowParams = {
        autoHide: true,
        visibilityTime: 2000,
        position: 'bottom'
    }
    const error = (title: string, detail?: string) => {
        Toast.show({
            type: 'error',
            text1: title,
            text2: detail,
            ...baseProps
        })
    }
    const success = (title: string, detail?: string) => {
        Toast.show({
            type: 'success',
            text1: title,
            text2: detail,
            ...baseProps
        })
    }
    return { error, success }
}