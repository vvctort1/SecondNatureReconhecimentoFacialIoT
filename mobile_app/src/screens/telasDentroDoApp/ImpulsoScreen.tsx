import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import GradientButton from "../../components/GradientButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStack } from "../../types/rotas";




const ImpulsoScreen = ({ navigation }: NativeStackScreenProps<RootStack>) => {

    const ansiosoImg = require('../../Images/ansioso2.png');
    const estressadoImg = require('../../Images/estressado2.png');
    const tristeImg = require('../../Images/triste2.png');
    const bravoImg = require('../../Images/ansioso2.png');
    const entediadoImg = require('../../Images/irritado2.png');
    const propagandaImg = require('../../Images/propaganda.png');
    const habitoImg = require('../../Images/calendar2.png');
    const amigosImg = require('../../Images/users.png');
    const naoSeiImg = require('../../Images/question.png');



    const [checkboxes, setCheckboxes] = useState([
        { id: 1, label: "Estou ansioso", isChecked: false, color: "#1B1B1B", image: ansiosoImg },
        { id: 2, label: "Estou estressado", isChecked: false, color: "#1B1B1B", image: estressadoImg },
        { id: 3, label: "Estou triste", isChecked: false, color: "#1B1B1B", image: tristeImg },
        { id: 4, label: "Estou bravo", isChecked: false, color: "#1B1B1B", image: bravoImg },
        { id: 5, label: "Estou entediado", isChecked: false, color: "#1B1B1B", image: entediadoImg },
        { id: 6, label: "Propagandas", isChecked: false, color: "#1B1B1B", image: propagandaImg },
        { id: 7, label: "Hábito", isChecked: false, color: "#1B1B1B", image: habitoImg },
        { id: 8, label: "Amigos/Família", isChecked: false, color: "#1B1B1B", image: amigosImg },
        { id: 9, label: "Eu não sei", isChecked: false, color: "#1B1B1B", image: naoSeiImg },
    ]);

    const toggleCheckbox = (id: number) => {
        setCheckboxes((prevCheckboxes) =>
            prevCheckboxes.map((checkbox) =>
                checkbox.id === id ? { ...checkbox, isChecked: !checkbox.isChecked } : checkbox
            )
        );
    }



    return (
        <View style={styles.container}>
            <Text style={styles.txtTitulo}>O que te fez querer apostar?</Text>
            <Text style={styles.txtAviso}>Selecione uma ou mais opções.</Text>
            {checkboxes.map((checkboxes) => (
                <View style={styles.container2}>
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
                        <Text style={styles.checkboxText}>{checkboxes.label}</Text>

                    </TouchableOpacity>
                    <Image source={checkboxes.image} style={styles.checkboxIcon} />
                </View>

            ))}
            <GradientButton title="Confirmar" onPress={() => navigation.goBack()}  disabled={!checkboxes.some((c)=>c.isChecked)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },

    txtTitulo: {
        fontSize: 18,
        fontFamily: "Inter",
        marginLeft: "10%",
        marginTop: "10%",
        marginBottom: "2%"
    },
    txtAviso: {
        fontSize: 10,
        fontFamily: "Inter",
        color: "#929292",
        marginLeft: "10%",
        marginBottom: "10%"
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    container2: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: "10%",
        marginBottom: "5%",
    },
    checkboxText: {
        fontFamily: "Inter",
        fontSize: 13,
        color: "1B1B1B"
    },
    checkboxIcon: {
        marginLeft: "20%"
    },
})

export default ImpulsoScreen