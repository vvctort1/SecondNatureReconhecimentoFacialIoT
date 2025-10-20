import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, View } from "react-native";
import { RootStack } from "../../types/rotas";
import GradientButton from "../../components/GradientButton";
import GradientWord from "../../components/GradientWord";
import { getAuth } from "firebase/auth";
import app from "../../config/firebaseConfig";



const IntroScreen = ({ navigation }: NativeStackScreenProps<RootStack,"IntroScreen">) => {

    const auth = getAuth(app)
    const user = auth.currentUser;

    const handleContinue = () => {
        if (user) {
            navigation.navigate("Question1Screen", {})
        }
    }

    return(
        <View style={styles.container}>
            <Image source={require("../../Images/logo.png")} style={styles.img0}/>
            <Text style={styles.txt1}>VOCÊ ESTÁ PRONTO PARA COMEÇAR</Text>
            <View style={styles.viewGradient}>
                <Text style={styles.txt2}> UMA </Text>
                <GradientWord style={styles.txt2}>NOVA FASE</GradientWord>
                <Text style={styles.txt2}>. VAMOS ENTENDER </Text>
            </View>
            <View style={styles.viewGradient}>
                <Text style={styles.txt2}>COMO PODEMOS TE</Text>
                <GradientWord style={styles.txt2}> APOIAR </GradientWord>
                <Text style={styles.txt2}>MELHOR.</Text>
            </View>
            <Image source={require("../../Images/placa.png")} style={styles.img}/>
            <GradientButton title="Continuar" onPress={handleContinue} style={styles.btnContinuar}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    img0: {
        marginTop: "18%",
        marginBottom: "20%",
        alignSelf: "center"
    },
    viewGradient: {
        flexDirection: "row",
        marginLeft: "7%"
    },
    txt1: {
        fontFamily: "Inter",
        fontWeight: 800,
        fontSize: 15,
        marginLeft: "7%"
    },
    txt2:{
        fontFamily: "Inter",
        fontWeight: 800,
        fontSize: 15
    },
    img: {
        width: "80%",
        height: "40%",
        borderRadius: 2,
        alignSelf: "center",
    },
    btnContinuar: {
        marginTop: "170%",
        position: "absolute"
    }
})

export default IntroScreen;