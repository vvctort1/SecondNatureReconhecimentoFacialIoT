
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStack } from "../../types/rotas";
import GradientButton from "../../components/GradientButton";
import { QuestionnaireData } from "../../types/Questionnaire";
import { getAuth } from "firebase/auth";
import app from "../../config/firebaseConfig";



const Question1Screen = ({ navigation }: NativeStackScreenProps<RootStack, "Question1Screen">) => {

    const auth = getAuth(app)
    const user = auth.currentUser;

    const [checkboxes, setCheckboxes] = useState([
        { id: 1, label: "Observar meus hábitos", isChecked: false, color: "#1B1B1B" },
        { id: 2, label: "Reduzir frequência em apostas", isChecked: false, color: "#1B1B1B" },
        { id: 3, label: "Parar completamente de apostar", isChecked: false, color: "#1B1B1B" },
    ]);

    const toggleCheckbox = (id: number) => {
        setCheckboxes((prevCheckboxes) =>
            prevCheckboxes.map((checkbox) => ({
                ...checkbox,
                isChecked: checkbox.id === id
            }))
        );
    }

    const handleContinue = () => {
        const selectedOption = checkboxes.find(c => c.isChecked);
        if (!selectedOption) return;

        const currentAnswers: QuestionnaireData = {
            objective: selectedOption.label
        };

        if (user) {
            navigation.navigate("Question2Screen", {
                answers: currentAnswers
            });
        }


    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Qual é o seu objetivo com este app?</Text>
            <Text style={styles.subText}>Selecione uma das opções abaixo.</Text>
            {checkboxes.map((checkboxes) => (
                <TouchableOpacity
                    key={checkboxes.id}
                    style={styles.checkboxContainer}
                    onPress={() => toggleCheckbox(checkboxes.id)}
                >
                    <MaterialCommunityIcons
                        name={checkboxes.isChecked ? 'checkbox-marked-outline' : 'checkbox-blank-outline'}
                        size={24}
                        color={checkboxes.isChecked ? checkboxes.color : '#1B1B1B'}
                    />
                    <Text style={styles.checkboxText}>  {checkboxes.label}</Text>
                </TouchableOpacity>
            ))}
            <GradientButton title="Continuar" onPress={handleContinue} style={styles.btnContinuar} disabled={!checkboxes.some((c) => c.isChecked)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    text: {
        fontFamily: "Inter",
        fontSize: 15,
        color: "1B1B1B",
        alignSelf: "center",
        top: "4%"
    },
    subText: {
        fontFamily: "Inter",
        fontSize: 10,
        color: "#929292",
        left: "12%",
        marginBottom: "20%",
        top: "5%"
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        left: "12%",
        marginBottom: "5%",
        alignSelf: "flex-start"
    },
    checkboxText: {
        fontFamily: "Inter",
        fontSize: 14,
        color: "1B1B1B"
    },
    btnContinuar: {
        width: "75%",
        marginTop: "144%",
        position: "absolute",

    }
})

export default Question1Screen;