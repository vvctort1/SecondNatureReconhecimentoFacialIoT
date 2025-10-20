import { LinearGradient } from "expo-linear-gradient";
import { Text, View, StyleSheet } from "react-native";
import GradientWord from "../../components/GradientWord";




const SavingsScreen = () => {
    return (
        <LinearGradient style={styles.container} colors={['#BCE0514D', '#4DA7646E']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}>
            <View style={styles.container2}></View>
            <View style={styles.cardEconomy}>
                <Text style={styles.txtTitulo}>Economia total</Text>
                <Text style={styles.txtSubTitulo}>Baseado na sua média semanal de apostas</Text>
                <GradientWord style={styles.txtGradient1}>R$ 1000,00</GradientWord>
                <View style={styles.divider}/>
                <View style={styles.cardView}>
                    <Text style={styles.txt}>Valor gasto por sessão</Text>
                    <Text style={styles.txt2}>R$ 100,00</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.cardView}>
                    <Text style={styles.txt}>Sessões por semana</Text>
                    <Text style={styles.txt3}>x3</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.cardView}>
                    <Text style={styles.txt}>Dias sem apostar</Text>
                    <Text style={styles.txt3}>21</Text>
                </View>
                <View style={styles.divider}/>
                <Text style={styles.txtSubTitulo2}>Economia atual</Text>
                <View style={styles.divider}/>
                <View style={styles.cardView}>
                    <Text style={styles.txt}>Dias desde o início</Text>
                    <Text style={styles.txt3}>5</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.cardView}>
                    <Text style={styles.txt}>Dinheiro economizado</Text>
                    <Text style={styles.txt3}>R$ 100,00</Text>
                </View>
                <View style={styles.divider}/>
                <GradientWord style={styles.txtGradient2}>Cada dia importa. </GradientWord>
                <GradientWord style={styles.txtGradient3}>Cada real economizado também.</GradientWord>
            </View>
            <View style={styles.container3}></View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container2: {
        height: "10%"
    },
    cardEconomy:{
        backgroundColor: "#FFF",
        elevation: 5,
        position: "absolute",
        zIndex: 1,
        height: "85%",
        width: "90%",
        alignSelf: "center",
        borderRadius: 8,
        marginTop: "15%"
    },
    txtTitulo: {
        fontSize: 18,
        fontFamily: "Inter",
        fontWeight: 700,
        color: "#1B1B1B",
        margin: "4%"
    },
    txtSubTitulo:{
        marginLeft: "4%",
        fontSize: 13,
        fontFamily: "Inter",
        fontWeight: 500,
        color: "#1B1B1B",
    },
    txtGradient1:{
        alignSelf: "center",
        fontSize: 30,
        fontWeight: 700,
        fontFamily: "Inter",
        marginVertical: "8%"
    },
    divider: {
        height: 1,
        backgroundColor: "#EEE",
        marginVertical: "2%"
    },
    cardView:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: "4%"
    },
    txt: {
        fontSize: 10,
        color: "#454545",
        fontFamily: "Inter"
    },
    txt2: {
        fontSize: 10,
        fontWeight: 700,
        color: "#337581",
        fontFamily: "Inter"
    },
    txt3:{
        fontSize: 10,
        fontWeight: 600,
        fontFamily: "Inter",
        color: "#1B1B1B"
    },
    txtSubTitulo2: {
        marginLeft: "4%",
        fontSize: 13,
        fontFamily: "Inter",
        fontWeight: 500,
        color: "#1B1B1B",
        marginTop: "5%"
    },
    txtGradient2:{
        alignSelf: "center",
        marginTop: "10%",
    },
    txtGradient3:{
        alignSelf: "center",
    },
    container3: {
        backgroundColor: "#FFF",
        height: "90%",
        marginTop: "15%"
    }
})

export default SavingsScreen;