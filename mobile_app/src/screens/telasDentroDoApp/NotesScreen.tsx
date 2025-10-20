import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Note } from "../../types/Lists";
import GradientButton from "../../components/GradientButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";



const NotesScreen = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [anotacao, setAnotacao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [notes, setNotes] = useState<Note[]>([]);


    const [checkboxes, setCheckboxes] = useState([
        { id: 1, label: "Impulsos", isChecked: false, color: "#1B1B1B" },
        { id: 2, label: "Vitória", isChecked: false, color: "#1B1B1B" },
        { id: 3, label: "Recaída", isChecked: false, color: "#1B1B1B" },
        { id: 4, label: "Reflexão livre", isChecked: false, color: "#1B1B1B" },
    ]);

    const toggleCheckbox = (id: number) => {
        setCheckboxes((prevCheckboxes) =>
            prevCheckboxes.map((checkbox) => ({
                ...checkbox,
                isChecked: checkbox.id === id
            }))
        );
        const selected = checkboxes.find((checkbox) => checkbox.id === id);
        if (selected) {
            setCategoria(selected.label)
        }
    }

    const addNote = () => {
        if (!anotacao.trim() || !categoria.trim()) return alert("Existem campos não preenchidos");

        const newNote: Note = {
            categoria: categoria.trim(),
            anotacao: anotacao.trim(),
        }

        setNotes([...notes, newNote]);
        setModalVisible(!modalVisible);

    }

    const removeNote = (indexToRemove: number) => {
        setNotes((prevNotes) => prevNotes.filter((_, index) => index !== indexToRemove));
    };


    const novaAnotacao = () => {
        setModalVisible(!modalVisible);
        setAnotacao("");
        setCategoria("");
        setCheckboxes((prevCheckboxes) =>
            prevCheckboxes.map((checkbox) => ({
                ...checkbox,
                isChecked: false,
            }))
        );
    }

    return (

        <View style={styles.container}>

            <Text style={styles.txtTitulo1}>Minhas anotações</Text>
            <FlatList
                data={notes}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 100 }} // espaço extra para rolar até o final
                renderItem={({ item, index }) => (
                    <View style={styles.cardNote}>
                        <View style={styles.txtContainer}>
                            <Text style={styles.txtCategoria}>{item.categoria}</Text>
                            <Text style={styles.txtAnotacao}>{item.anotacao}</Text>
                        </View>
                        <TouchableOpacity onPress={() => removeNote(index)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </TouchableOpacity>
                    </View>
                )}
            />

            <LinearGradient
                colors={['#BCE051', '#4DA764']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}>
                <TouchableOpacity style={styles.touchable} onPress={novaAnotacao}>
                    <Image source={require("../../Images/plus.png")} />
                </TouchableOpacity>
            </LinearGradient>
            <Modal animationType="fade" transparent={true} visible={modalVisible} navigationBarTranslucent={true} statusBarTranslucent={true}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.headerModalContainer}>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                <Image source={require("../../Images/seta.png")} />
                            </TouchableOpacity>
                            <Text style={styles.txtModalTitulo}>Nova anotação</Text>
                        </View>
                        <TextInput
                            multiline={true}
                            placeholder="Escreva sobre o que está sentindo, o que aconteceu hoje, ou algo que quer lembrar..."
                            style={styles.txtModalInputArea}
                            numberOfLines={3}
                            textAlignVertical="top"
                            onChangeText={setAnotacao}
                        />
                        <Text style={styles.txtModalTitulo2}>Categoria:</Text>
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
                        <GradientButton title="Salvar" onPress={addNote} style={styles.buttonModalSalvar} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    txtTitulo1: {
        fontFamily: "Inter",
        fontSize: 24,
        fontWeight: 800,
        marginLeft: "6%",
        marginTop: "10%",
        marginBottom: "5%"
    },
    cardNote: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90%",
        borderColor: "transparent",
        elevation: 3,
        borderRadius: 12,
        marginTop: "4%",
        padding: "3%",
        flexDirection: "row"
    },
    txtContainer: {
        width: "90%",
    },
    txtCategoria: {
        fontSize: 14,
        fontFamily: "Inter",
        marginLeft: "5%",
        marginBottom: "2%"

    },
    txtAnotacao: {
        fontSize: 14,
        fontFamily: "Inter",
        fontStyle: "italic",
        marginLeft: "5%"
    },
    gradient: {
        height: "8%",
        width: "15%",
        borderRadius: 50,
        marginLeft: "80%",
        marginTop: "150%",
        backgroundColor: "transparent",
        position: "absolute",
        zIndex: 1
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
    },
    centeredView: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center"
    },
    modalView: {
        width: "92%",
        height: "65%",
        alignSelf: "center",
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 30,
            height: 40,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 100,
    },
    headerModalContainer: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        marginBottom: "7%"
    },
    txtModalTitulo: {
        fontFamily: "Inter",
        fontWeight: 700,
        fontSize: 18,
        marginLeft: "4%",
    },
    txtModalTitulo2: {
        fontFamily: "Inter",
        fontWeight: 700,
        fontSize: 18,
        marginLeft: "2%",
        marginTop: "10%",
        marginBottom: "8%"
    },
    txtModalInputArea: {
        borderWidth: 2,
        height: "27%",
        width: "100%",
        borderColor: "#1B1B1B",
        borderRadius: 8,
        fontFamily: "Inter",
        fontSize: 12,
        padding: 15,
        alignSelf: "center"
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        left: "2%",
        marginBottom: "5%",
        alignSelf: "flex-start"
    },
    checkboxText: {
        fontFamily: "Inter",
        fontSize: 13,
        color: "1B1B1B"
    },
    buttonModalSalvar: {
        height: "10%",
        width: "100%",
        elevation: 6,
        marginTop: "10%"
    },
})

export default NotesScreen;