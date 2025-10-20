import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { RootBottomTabs } from "../types/rotas";
import MaterialTopTab from "./MaterialTopTab";
import AccountScreen from "../screens/telasDentroDoApp/AccountScreen";
import NotesScreen from "../screens/telasDentroDoApp/NotesScreen";
import { Modal, TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { faHome, faStickyNote, faUser, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRoute } from "@react-navigation/native";
import GradientButton from "../components/GradientButton";
import { BlockScreen } from "../screens/telasDentroDoApp/MonitorScreen";
import { User as FirebaseAuthUser } from "firebase/auth";


const Tab = createBottomTabNavigator<RootBottomTabs>();

const BottomTabs = () => {

    const route = useRoute();
    const { user } = route.params as { user: FirebaseAuthUser};

    const [modalVisible, setModalVisible] = useState(true);

    return (
        <View style={{ flex: 1}}>
            <Modal animationType="fade" transparent={true} visible={modalVisible} navigationBarTranslucent={true} statusBarTranslucent={true}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Deseja receber lembretes e dicas para te ajudar nos momentos mais difíceis?</Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                style={styles.buttonModalNo}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.txtModalButtonNo}>Agora não</Text>
                            </TouchableOpacity>
                            <GradientButton title="Quero receber" onPress={() => setModalVisible(!modalVisible)} style={styles.buttonModalYes}/>
                        </View>

                    </View>
                </View>
            </Modal>
            <Tab.Navigator screenOptions={{
                headerTitle: "",
                tabBarLabelStyle: { fontFamily: "Patrick Hand", fontSize: 14 },
                tabBarActiveTintColor: "#1B1B1B",
                headerLeft: ()=> <Image source={require("../Images/logo.png")} style={{height: "30%", width: "15%", marginLeft: "13%"}}/>,
                headerRight: () => (<TouchableOpacity><Image source={require("../Images/setting.png")} style={{marginRight: "18%", height: "35%", width: "45%"}}/></TouchableOpacity>)
            }}>
                <Tab.Screen name="Menu" component={MaterialTopTab} initialParams={{user: user}} options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon={faHome} size={size} color={color} />
                    ),
                }} />
                <Tab.Screen name="Monitor" component={BlockScreen} options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon={faEye} size={size} color={color} />
                    ),
                }}/>
                <Tab.Screen name="Notas" component={NotesScreen} options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon={faStickyNote} size={size} color={color} />
                    ),
                }}/>
                <Tab.Screen name="Perfil" component={AccountScreen} options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon={faUser} size={size} color={color} />
                    ),
                }}/>
            </Tab.Navigator>
        </View>

    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        width: "80%",
        height: "30%",
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 30,
            height: 40,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 100,
        borderWidth: 2
    },
    modalText: {
        fontFamily: "Inter",
        fontSize: 14
    },

    modalButtonContainer: {
        marginTop: "5%",
        height: "70%",
        width: "80%"
    },
    buttonModalNo: {
        borderRadius: 8,
        padding: 10,
        elevation: 6,
        backgroundColor: '#fff',
        marginHorizontal: "15%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "6%"
    },
    txtModalButtonNo: {
        color: "#1B1B1B",
        fontFamily: "Inter",
        fontWeight: 800
    },
    buttonModalYes: {
        height: "30%",
        elevation: 6,
        marginTop: "10%",
    },
})

export default BottomTabs;