import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, Image } from "react-native";
import GradientButton from "../../components/GradientButton";
import GradientWord from "../../components/GradientWord";




const UrgesScreen = () => {
    return (
        <LinearGradient style={styles.container} colors={['#4DA7646E', '#BCE0514D']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}>
            <View style={styles.container2}></View>
            <View style={styles.cardUrges}>
                <GradientButton title="Estou com vontade de apostar" onPress={() => { }} style={styles.btn} />
                <Text style={styles.txtTitulo}>Meus impulsos</Text>
                <Text style={styles.txtSubTitulo}>Meus motivos para sentir impulsos</Text>
                <View style={styles.humorView}>
                    <Image style={styles.imgTriste} source={require("../../Images/triste.png")}/>
                    <Text style={styles.txtHumor}>Eu estava triste</Text>
                    <Text style={styles.txtData}>          18 Jan</Text>
                </View>
                <View style={styles.humorView}>
                    <Image style={styles.img} source={require("../../Images/irritado.png")}/>
                    <Text style={styles.txtHumor}>Eu estava irritado</Text>
                    <Text style={styles.txtData}>      14 Jan</Text>
                </View>
                <View style={styles.humorView}>
                    <Image style={styles.img} source={require("../../Images/estressado.png")}/>
                    <Text style={styles.txtHumor}>Eu estava estressado</Text>
                    <Text style={styles.txtData}>13 Jan</Text>
                </View>
                <View style={styles.humorView}>
                    <Image style={styles.imgTriste} source={require("../../Images/triste.png")}/>
                    <Text style={styles.txtHumor}>Eu estava triste</Text>
                    <Text style={styles.txtData}>           5 Jan</Text>
                </View>
                <GradientWord style={styles.txtGradient}>Cada dia importa. </GradientWord>
                <GradientWord style={styles.txtGradient2}>Cada real economizado também.</GradientWord>
            </View>
            <View style={styles.container3}></View>
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container2: {
        height: "10%"
    },
    cardUrges: {
        backgroundColor: "#FFF",
        position: "absolute",
        zIndex: 1,
        height: "88%",
        elevation: 5,
        width: "90%",
        alignSelf: "center",
        marginTop: "15%",
        borderRadius: 8,
        padding: "3%"
    },
    btn: {
        width: "100%",
        height: "14%",
        marginTop: "2%"
    },
    txtTitulo: {
        fontWeight: 700,
        fontFamily: "Inter",
        fontSize: 18,
        marginTop: "10%",
        marginBottom: "5%",
        color: "#1B1B1B"
    },
    txtSubTitulo: {
        fontFamily: "Inter",
        fontSize: 13,
        fontWeight: 500,
        color: "#1B1B1B"
    },
    humorView:{
        flexDirection: "row",
        alignItems: "center",
        marginTop: "11%",
    },
    img: {
        height: "180%",
        width: "12%",
    },
    imgTriste:{
        height: "180%",
        width: "10%",
        marginLeft: "1%"
    },
    txtHumor:{
        marginLeft: "4%",
        fontWeight: 500,
        fontFamily: "Inter",
        color: "#454545",
        fontSize: 10
    },
    txtData: {
        marginLeft: "33%",
        fontFamily: "Inter",
        fontWeight: 500,
        color: "#337581",
        fontSize: 10
    },
    txtGradient:{
        alignSelf: "center",
        marginTop: "25%"
    },
    txtGradient2:{
        alignSelf: "center",
    },
    container3: {
        height: "90%",
        backgroundColor: "#FFF",
        marginTop: "15%"
    }
})

export default UrgesScreen;
