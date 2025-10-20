
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GradientWord from "../../components/GradientWord";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStack } from "../../types/rotas";
import { User as FirebaseAuthUser } from "firebase/auth";



const SummaryScreen = ({ navigation }:NativeStackScreenProps<RootStack>) => {

    const [qtdDias, setQtdDias] = useState('5');

    const route = useRoute();
    const { user } = route.params as { user: FirebaseAuthUser };


    return (
        <LinearGradient style={styles.container} colors={['#BCE0514D', '#4DA7646E']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}>
            <View style={styles.container2}>
            </View>

            <View style={styles.card}>
                <View style={styles.containerGradient}>
                    <Text style={styles.titutoTxtCard}>Olá, </Text>
                    <GradientWord style={styles.titutoTxtCard}>{user.displayName ?? "Usuário"} </GradientWord>
                </View>
                <View style={styles.containerGradient}>
                    <Text style={styles.txtCard}>Você está a </Text>
                    <GradientWord style={styles.txtCard}>{qtdDias}</GradientWord>
                    <Text style={styles.txtCard}> dias sem apostar.</Text>
                </View>
                <View style={styles.periodoContainer}>
                    <Image source={require("../../Images/calender.png")} />
                    <Text style={styles.txtCardPeriodo}>12/23 - 01/03</Text>
                </View>
            </View>
            <View style={styles.container3}>
                <View style={styles.container4}>
                    <View style={styles.containerIcone}>
                        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("CheckinScreen")}>
                            <Image source={require("../../Images/checkin.png")} />
                            <Text style={styles.txtIcon}>Check-in </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divisoria}></View>
                    <View style={styles.containerIcone}>
                        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("ImpulsoScreen")}>
                            <Image source={require("../../Images/impulso.png")} />
                            <Text style={styles.txtIcon}>Impulso</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divisoria}></View>
                    <View style={styles.containerIcone}>
                        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => setQtdDias('0')}>
                            <Image source={require("../../Images/recomecar.png")}/>
                            <Text style={styles.txtIcon}>Recomeçar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.tituloTxt}>Motivos para largar as apostas</Text>
                <LinearGradient style={styles.bordGradient} colors={['#BCE051', '#4DA764']}>
                    <View style={styles.userMotivation}>
                        <GradientWord style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 24, }}>Minha família</GradientWord>
                    </View>
                </LinearGradient>
                <TouchableOpacity style={styles.btnAdd}>
                    <Text style={styles.txtAdd}>Adicionar outro motivo</Text>
                </TouchableOpacity>
                <Text style={styles.tituloTxt}>Já economizei</Text>
                <LinearGradient style={styles.bordGradient} colors={['#BCE051', '#4DA764']}>
                    <View style={styles.userEconomy}>
                        <GradientWord style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 24, }}>R$ 1000,00</GradientWord>
                    </View>
                </LinearGradient>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    container2: {
        height: "10%",
        width: "100%",
    },
    container3: {
        backgroundColor: "#fff",
        width: "100%",
        height: "90%",
        marginTop: "15%",

    },
    container4: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: "17%",
        paddingTop: "30%",
        height: "35%"
    },
    containerIcone: {
        alignItems: "center"
    },
    container5: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    card: {
        backgroundColor: "#fff",
        width: "90%",
        height: "22%",
        borderRadius: 10,
        padding: "5%",
        marginTop: "15%",
        elevation: 5,
        position: 'absolute',
        zIndex: 1,
    },
    containerGradient: {
        flexDirection: "row"
    },
    titutoTxtCard: {
        fontFamily: "Inter",
        fontSize: 28,
        marginBottom: "2%"
    },
    txtCard: {
        fontFamily: "Inter",
        fontSize: 15,
        marginBottom: "7%"
    },
    periodoContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    txtCardPeriodo: {
        fontFamily: "Inter",
        fontSize: 10,
        marginLeft: "2%"
    },
    txtIcon: {
        marginTop: "15%",
        fontSize: 10
    },
    divisoria: {
        width: 2,
        height: 25,
        backgroundColor: "#eee"
    },
    tituloTxt: {
        fontSize: 18,
        fontFamily: "Inter",
        marginLeft: "6%",
        fontWeight: 700
    },
    userMotivation: {
        borderWidth: 3,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        borderColor: "transparent",
        borderRadius: 8
    },
    bordGradient: {
        marginTop: "4%",
        borderRadius: 8,
        height: "10%",
        marginHorizontal: "6%",
        padding: "0.8%"
    },
    btnAdd: {
        marginBottom: "16%",
        marginTop: "2%",
        marginLeft: "6%"
    },
    txtAdd: {
        fontSize: 10,
        fontFamily: "Inter",
        fontWeight: 500,
        color: "#337581"
    },
    userEconomy: {
        borderWidth: 3,
        borderColor: "transparent",
        borderRadius: 8,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF"
    },
})

export default SummaryScreen;