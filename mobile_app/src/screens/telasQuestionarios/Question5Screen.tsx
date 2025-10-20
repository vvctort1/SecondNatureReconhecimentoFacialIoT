import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStack } from "../../types/rotas";
import GradientButton from "../../components/GradientButton";
import { QuestionnaireData } from "../../types/Questionnaire";

const Question5Screen = ({ navigation, route }: NativeStackScreenProps<RootStack, "Question5Screen">) => {

    const { answers } = route.params;

    const [otherMotivation, setOtherMotivation] = useState("");

    const [checkboxes, setCheckboxes] = useState([
        { id: 1, label: "Saúde mental", isChecked: false, color: "#1B1B1B" },
        { id: 2, label: "Minha família", isChecked: false, color: "#1B1B1B" },
        { id: 3, label: "Controlar melhor meu dinheiro", isChecked: false, color: "#1B1B1B" },
        { id: 4, label: "Outro motivo:", isChecked: false, color: "#1B1B1B" }
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

        if (selectedOption.label === "Outro motivo:") {
            const currentAnswers: QuestionnaireData = {
                ...answers,
                motivation: otherMotivation

            }

            navigation.navigate("AutorizacaoScreen", {
                answers: currentAnswers
            });

            return;
        }

        const currentAnswers: QuestionnaireData = {
            ...answers,
            motivation: selectedOption.label
        }

        navigation.navigate("AutorizacaoScreen", {
            answers: currentAnswers
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Por que você quer mudar seu{'\n'}comportamento com apostas?</Text>
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
            <TextInput multiline={true} placeholder="Quero parar porque..." style={styles.txtInputArea} numberOfLines={3} textAlignVertical="top" onChangeText={setOtherMotivation} />
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
        left: "12%",
        top: "4%"
    },
    subText: {
        fontFamily: "Inter",
        fontSize: 10,
        color: "#929292",
        left: "12%",
        marginBottom: "15%",
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
    txtInputArea: {
        borderWidth: 2,
        height: "17%",
        width: "65%",
        left: "22%",
        borderColor: "#1B1B1B",
        borderRadius: 8,
        fontFamily: "Inter",
        fontSize: 10,
        padding: 15
    },
    btnContinuar: {
        width: "75%",
        marginTop: "144%",
        position: "absolute",
    }
})

export default Question5Screen;