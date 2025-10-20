import { useState } from "react"
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native"
import { Url } from "../../types/Lists";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import GradientButton from "../../components/GradientButton";

export const BlockScreen = () => {

    const [url, setUrl] = useState("");
    const [urls, setUrls] = useState<Url[]>([]);

    const addUrl = () => {

        if (!url.trim()) {
            return alert("Campo vazio, digite um domínio!")
        }

        const newUrl: Url = {
            domain: url.trim()
        }
        setUrls([...urls, newUrl]);
        setUrl("")
    }

    const removeUrl = (indexToRemove: number) => {
        setUrls((prevUrls) => prevUrls.filter((_, index) => index !== indexToRemove));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo1}>Controle de Domínios</Text>
            <TextInput placeholder="Digite a URL" onChangeText={setUrl} style={styles.txtInput} value={url} />
            <GradientButton title="Adicionar" onPress={addUrl} style={styles.botaoAdd} />
            <View style={styles.divider} />
            <Text style={styles.titulo2}>Lista de monitoramento</Text>
            <View style={styles.lista}>
                <FlatList data={urls} renderItem={({ item, index }) => (
                    <View style={styles.domainItem}>
                        <Text>{item.domain}</Text>
                        <TouchableOpacity onPress={() => removeUrl(index)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </TouchableOpacity>
                    </View>

                )} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        height: "100%"
    },
    titulo1: {
        alignSelf: "center",
        fontSize: 18,
        marginTop: "3%",
        fontWeight: "bold"
    },
    titulo2: {
        alignSelf: "center",
        fontSize: 18,
        marginTop: "4%",
        fontWeight: "bold",
        marginBottom: "2%"
    },
    divider: {
        width: "90%",
        alignSelf: "center",
        borderRadius: 20,
        backgroundColor: "#ccc",
        height: "1%"
    },
    txtInput: {
        borderWidth: 1,
        margin: "3%",
        borderRadius: 5,
        paddingLeft: "3%",
        backgroundColor: "#FFF"
    },
    botaoAdd: { 
        height: "7%", 
        margin: "3%", 
        marginTop: "2%", 
        width: "94%" 
    },
    lista: {
        height: "67%"
    },
    domainItem: {
        flexDirection: "row",
        backgroundColor: "#FFF",
        borderWidth: 2,
        borderRadius: 8,
        margin: "2%",
        paddingHorizontal: "4%",
        paddingVertical: "2%",
        justifyContent: "space-between"
    }
})