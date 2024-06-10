import { Text } from "react-native-svg";
import CustomButton from "./CustomButton";
import ModalWrapper from "./ModalWrapper";

interface Props {
    setSubscribeModalOpen: (val: boolean) => void
}

export default function SubscribeModal({ setSubscribeModalOpen }: Props) {
    function handleCloseModal() {
        setSubscribeModalOpen(false)
    }
    return (
        <ModalWrapper handleCloseModal={handleCloseModal}>
            <>
                <CustomButton>
                    <Text>Upgrade to Premium</Text>
                </CustomButton>
            </>
        </ModalWrapper>
    )
}
