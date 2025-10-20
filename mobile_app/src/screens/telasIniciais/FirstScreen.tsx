import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { RootStack } from "../../types/rotas";
import GradientWord from "../../components/GradientWord";
import GradientButton from "../../components/GradientButton";


const FirstScreen = ({ navigation }: NativeStackScreenProps<RootStack, "FirstScreen">) => {
    return (
        <View style={styles.container}>
            <Image source={require("../../Images/logo.png")} style={styles.img} />
            <View style={{ flexDirection: "row", marginTop: "10%" }}>
                <Text style={styles.txt}>BEM-VINDO AO </Text>
                <GradientWord style={styles.txtGradient}>SECONDNATURE.</GradientWord>
            </View>
            <Text style={styles.txt2}>UM ESPAÇO SEGURO PARA TE</Text>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.txt}>AJUDAR A RETOMAR O </Text>
                <GradientWord style={styles.txtGradient}>CONTROLE</GradientWord>
            </View>
            <Text style={styles.txt2}>SOBRE O IMPULSO DE APOSTAR.</Text>
            <Image source={require("../../Images/arvores.png")} style={styles.img2} />
                <GradientButton title="Vamos Começar" onPress={() => navigation.navigate("CadastroScreen")}/>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("LoginScreen")}>
                <Text style={styles.txtBtn}>Já possuo uma conta</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    img: {
        height: "3%",
        width: "6%",
        alignSelf: "center",
        marginTop: "17%",
        marginBottom: "10%"
    },
    txtGradient: {
        fontSize: 18,
        lineHeight: 24,
        fontFamily: "Inter",
        fontWeight: 800,
    },
    txt: {
        fontSize: 18,
        fontFamily: "Inter",
        fontWeight: 800,
        marginLeft: "9%",
    },
    txt2: {
        fontSize: 18,
        fontFamily: "Inter",
        fontWeight: 800,
        marginLeft: "9%",
    },
    img2: {
        height: "20%",
        width: "80%",
        alignSelf: "center",
        marginTop: "20%"
    },
    btn: {
        width: "80%",
        height: "6%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        borderWidth: 3,
        borderColor: "1B1B1B",
        marginTop: "5%"
    },
    txtBtn:{
        fontFamily: "Inter",
        fontWeight: 800,
        color: "#1B1B1B",
        fontSize: 20
    }

})

export default FirstScreen;