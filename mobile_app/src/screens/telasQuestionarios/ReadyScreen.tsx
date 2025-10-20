// src/screens/telasQuestionarios/ReadyScreen.tsx

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { RootStack } from "../../types/rotas";
import GradientWord from "../../components/GradientWord";
import GradientButton from "../../components/GradientButton";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import app from "../../config/firebaseConfig";
import { useState } from "react";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);

const ReadyScreen = ({ route }: NativeStackScreenProps<RootStack, "ReadyScreen">) => {
    // A tela agora não precisa mais se preocupar com navegação ou 'onComplete'
    const { answers } = route.params;
    const [loading, setLoading] = useState(false);
    
    const finishQuestionnaire = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            Alert.alert("Erro", "Sua sessão expirou. Por favor, faça login novamente.");
            return;
        }

        setLoading(true);

        try {
            const userDocRef = doc(db, "users", currentUser.uid);
            // Apenas atualiza o banco de dados. É só isso!
            await updateDoc(userDocRef, {
                questionnaire: answers,
                questionnaireCompleted: true
            });
            // O RootNavigator vai ver essa mudança e trocar a tela automaticamente.
            // Não precisamos fazer mais nada aqui.

        } catch (error) {
            console.error("Erro ao salvar questionário: ", error);
            Alert.alert("Erro", "Não foi possível salvar suas respostas. Tente novamente.");
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Image source={require("../../Images/logo.png")} style={styles.img}/>
            <View style={styles.viewGradient}>
                <GradientWord style={styles.txt}>TUDO PRONTO!</GradientWord>
                <Text style={styles.txt}> A PARTIR DE</Text>
            </View>
            <View style={styles.viewGradient}>
                <Text style={styles.txt}>AGORA, </Text>
                <GradientWord style={styles.txt}>ESTAMOS AQUI COM</GradientWord>
            </View>
            <View style={styles.viewGradient}>
                <GradientWord style={styles.txt}>VOCÊ </GradientWord>
                <Text style={styles.txt}>A CADA PASSO. UM DIA</Text>
            </View>
            <Text style={styles.txt2}>DE CADA VEZ.</Text>
            <Image source={require("../../Images/botas.png")} style={styles.img1} />
            <GradientButton 
                title={loading ? "Salvando..." : "Ir para o app"} 
                onPress={finishQuestionnaire} 
                style={styles.btn}
                disabled={loading}
            />
        </View>
    );
}

// Seus estilos aqui...
const styles = StyleSheet.create({
    txt: {
        fontFamily: "Inter",
        fontSize: 15,
        fontWeight: '800',
        alignSelf: "center"
    },
    txt2:{
        fontFamily: "Inter",
        fontSize: 15,
        fontWeight: '800',
        marginLeft: "20%"
    },
    img: {
        marginTop: "25%",
        marginBottom: "22%",
        alignSelf: "center"
    },
    viewGradient: {
        flexDirection: "row",
        marginLeft: "20%"
    },
    img1: {
        width: "50%",
        height: "43%",
        alignSelf: "center",
    },
    btn:{
        position: "absolute",
        marginTop: "175%",
        width: "90%"
    }
})

export default ReadyScreen;