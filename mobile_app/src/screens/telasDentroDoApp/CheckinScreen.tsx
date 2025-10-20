import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import GradientButton from "../../components/GradientButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStack } from "../../types/rotas";





const CheckinScreen = ({navigation}:NativeStackScreenProps<RootStack>) => {


    const [checkboxes, setCheckboxes] = useState([
        { id: 1, label: "Não, consegui resistir", isChecked: false, color: "#1B1B1B" },
        { id: 2, label: "Sim, eu apostei", isChecked: false, color: "#1B1B1B" },
        { id: 3, label: "Prefiro não responder", isChecked: false, color: "#1B1B1B" },
    ]);

    const toggleCheckbox = (id: number) => {
        setCheckboxes((prevCheckboxes) =>
            prevCheckboxes.map((checkbox) => ({
                ...checkbox,
                isChecked: checkbox.id === id
            }))
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.txtTitulo}>Como está se sentindo?</Text>
            <TouchableOpacity style={styles.emocaoContainer}>
                <Image source={require("../../Images/bem.png")} />
                <Text style={styles.txtEmocao}>Bem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emocaoContainer}>
                <Image source={require("../../Images/tranquilo.png")} />
                <Text style={styles.txtEmocao}>Tranquilo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emocaoContainer}>
                <Image source={require("../../Images/neutro.png")} />
                <Text style={styles.txtEmocao}>Neutro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emocaoContainer}>
                <Image source={require("../../Images/ansioso.png")} />
                <Text style={styles.txtEmocao}>Ansioso</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emocaoContainer}>
                <Image source={require("../../Images/triste2.png")} />
                <Text style={styles.txtEmocao}>Triste</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emocaoContainer}>
                <Image source={require("../../Images/irritado2.png")} />
                <Text style={styles.txtEmocao}>Irritado/Estressado</Text>
            </TouchableOpacity>
            <Text style={styles.txtTitulo2}>Você apostou hoje?</Text>
            <Text style={styles.txtAviso}>Seja honesto com você mesmo. Esse é um espaço {'\n'}seguro — sem julgamentos</Text>
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

            <GradientButton title="Confirmar" onPress={() => {navigation.goBack()}} style={styles.btnGradient} disabled={!checkboxes.some((c)=>c.isChecked)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingTop: "7%"
    },
    txtTitulo: {
        fontFamily: "Inter",
        fontSize: 18,
        marginBottom: "8%",
        marginLeft: "13%"
    },
    emocaoContainer: {
        flexDirection: "row",
        marginBottom: "5%",
        alignItems: "center",
        alignSelf: "flex-start",
        marginLeft: "13%"
    },
    txtEmocao: {
        fontSize: 13,
        fontFamily: "Inter",
        marginLeft: "5%"
    },
    txtTitulo2: {
        fontFamily: "Inter",
        fontSize: 18,
        marginBottom: "2%",
        marginTop: "5%",
        marginLeft: "13%"
    },
    txtAviso:{
        color: "#929292",
        marginBottom: "6%",
        marginLeft: "13%", 
        fontSize: 10
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "5%",
        marginLeft: "13%",
        alignSelf: "flex-start"
    },
    checkboxText: {
        fontFamily: "Inter",
        fontSize: 13,
        color: "1B1B1B"
    },
    btnGradient:{
        alignSelf: "center",
        marginTop: "7%",
        height: "8%",
        width: "73%"
    }
})

export default CheckinScreen;
