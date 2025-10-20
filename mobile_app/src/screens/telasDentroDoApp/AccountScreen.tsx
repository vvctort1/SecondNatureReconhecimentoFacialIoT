import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { RootStack } from "../../types/rotas";
import { getAuth, signOut } from "firebase/auth";
import app from "../../config/firebaseConfig";





const AccountScreen = () => {

    const auth = getAuth(app);
    const user = auth.currentUser;

    const handleLogout = async () => {
        try{
            await signOut(auth);
        } catch (error) {
            console.error("Erro ao fazer logout: ", error);
            Alert.alert("Erro", "Não foi possível fazer logout.");
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.txtTitulo}>Meu Perfil</Text>
                <FontAwesomeIcon icon={faCircleUser} size={60} />
            </View>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txt}>Editar dados</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txt}>Configurações de privacidade</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txt}>Termos de serviço</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.txt}>Deletar conta</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.btn} onPress={handleLogout}>
                <Text style={styles.txt}>Logout</Text>
            </TouchableOpacity>

            <View style={styles.divider} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "8%",
        marginBottom: "10%",
        marginHorizontal: "9%"
    },
    txtTitulo: {
        fontFamily: "Inter",
        fontWeight: 700,
        fontSize: 22
    },
    divider: {
        height: 1,
        backgroundColor: "#EEE",
        marginVertical: "5%"
    },
    btn:{
        alignSelf: "flex-start"
    },
    txt: {
        fontSize: 12,
        fontFamily: "Inter",
        color: "#454545",
        marginHorizontal: "9%"
    }
})

export default AccountScreen;