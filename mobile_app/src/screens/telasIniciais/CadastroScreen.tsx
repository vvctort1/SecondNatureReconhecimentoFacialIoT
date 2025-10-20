import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from "react-native"
import { RootStack } from "../../types/rotas";
import { useRef, useState } from "react";
import GradientWord from "../../components/GradientWord";
import GradientButton from "../../components/GradientButton";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from "../../config/firebaseConfig";
import { Camera, CameraView } from 'expo-camera';
import axios from 'axios';

// Inicializar Storage explicitamente
const storage = getStorage(app);

const CadastroScreen = ({ navigation }: NativeStackScreenProps<RootStack, "CadastroScreen">) => {

    const API_URL = 'http://ip_da_sua_maquina:5000';

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [fotoCapturada, setFotoCapturada] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);

    const auth = getAuth(app);
    const database = getFirestore(app);

    const abrirCameraParaCadastro = async () => {
        if (!nome.trim() || !email.trim() || !senha.trim() || !confirmacaoSenha.trim()) {
            Alert.alert("Erro", "Preencha todos os campos antes de cadastrar o rosto");
            return;
        }

        if (senha.trim().length < 8) {
            Alert.alert("Erro", "Senha deve conter no mínimo 8 caracteres!");
            return;
        }

        if (senha.trim() !== confirmacaoSenha.trim()) {
            Alert.alert("Erro", "Falha na confirmação da senha!");
            return;
        }

        try {
            console.log("=== SOLICITANDO PERMISSÃO DA CÂMERA ===");
            const { status } = await Camera.requestCameraPermissionsAsync();
            console.log("Status da permissão:", status);

            if (status === 'granted') {
                setShowCamera(true);
            } else {
                Alert.alert(
                    "Permissão Negada",
                    "Precisamos de acesso à câmera para o cadastro facial."
                );
            }
        } catch (error) {
            console.error("Erro ao solicitar permissão:", error);
            Alert.alert("Erro", "Não foi possível acessar a câmera");
        }
    };

    // Capturar foto
    const capturarFoto = async () => {
        if (!cameraRef.current) {
            Alert.alert("Erro", "Câmera não está pronta");
            return;
        }

        setLoading(true);

        try {
            console.log("Capturando foto...");
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.7,
                base64: true
            });

            if (!photo?.base64) {
                throw new Error("Falha ao capturar imagem");
            }

            console.log("Foto capturada com sucesso! Tamanho:", photo.base64.length);
            setFotoCapturada(photo.base64);
            setShowCamera(false);
            Alert.alert("Sucesso!", "Foto capturada! Agora você pode confirmar o cadastro.");

        } catch (error: any) {
            console.error("Erro ao capturar foto:", error);
            Alert.alert("Erro", "Não foi possível capturar a foto: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Confirmar cadastro (criar usuário + salvar foto)
    const confirmarCadastro = async () => {
        if (!nome.trim() || !email.trim() || !senha.trim() || !confirmacaoSenha.trim()) {
            Alert.alert("Erro", "Preencha todos os campos");
            return;
        }

        if (senha.trim().length < 8) {
            Alert.alert("Erro", "Senha deve conter no mínimo 8 caracteres!");
            return;
        }

        if (senha.trim() !== confirmacaoSenha.trim()) {
            Alert.alert("Erro", "Falha na confirmação da senha!");
            return;
        }

        setLoading(true);

        try {
            console.log("=== CRIANDO USUÁRIO ===");
            const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), senha.trim());
            const user = userCredential.user;
            console.log("Usuário criado:", user.uid);

            await updateProfile(user, { displayName: nome.trim() });

            // Salvar dados no Firestore
            await setDoc(doc(database, "users", user.uid), {
                nome: nome.trim(),
                email: email.trim().toLowerCase(),
                createdAt: new Date(),
                hasFacialRecognition: !!fotoCapturada
            });

            console.log("Dados salvos no Firestore");

            // Se tem foto capturada, processar reconhecimento facial
            if (fotoCapturada) {
                setLoading(true);
                console.log("=== PROCESSANDO FOTO FACIAL ===");
                
                try {
                    // Primeiro, registrar no backend Python para reconhecimento facial
                    console.log("=== REGISTRANDO NO BACKEND ===");
                    console.log("User ID:", user.uid);
                    console.log("Tamanho base64:", fotoCapturada.length);
                    
                    // Remover qualquer prefixo data:image se existir
                    const cleanBase64 = fotoCapturada.replace(/^data:image\/\w+;base64,/, '');
                    
                    const response = await axios.post(`${API_URL}/register-face`, {
                        userId: user.uid,
                        imageB64: cleanBase64,
                    }, {
                        timeout: 30000, // 30 segundos de timeout
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    console.log("Rosto registrado no backend com sucesso!", response.data);
                    setLoading(false)
                    Alert.alert("Sucesso","Conta criada com reconhecimento facial!");

                    // Depois, tentar salvar no Storage (se falhar, não impede o cadastro)
                    try {
                        console.log("=== SALVANDO FOTO NO STORAGE ===");
                        console.log("Storage bucket:", storage.app.options.storageBucket);
                        
                        // Converter base64 para blob
                        const base64Data = fotoCapturada.replace(/^data:image\/\w+;base64,/, '');
                        const response = await fetch(`data:image/jpeg;base64,${base64Data}`);
                        const blob = await response.blob();
                        
                        console.log("Blob criado - Tamanho:", blob.size, "Tipo:", blob.type);
                        
                        if (blob.size === 0) {
                            throw new Error("Blob vazio - foto inválida");
                        }
                        
                        // Upload para Firebase Storage
                        const timestamp = Date.now();
                        const storageRef = ref(storage, `faces/${user.uid}/profile_${timestamp}.jpg`);
                        
                        console.log("Iniciando upload para:", storageRef.fullPath);
                        
                        const metadata = {
                            contentType: 'image/jpeg',
                            customMetadata: {
                                uploadedAt: new Date().toISOString(),
                                userId: user.uid
                            }
                        };
                        
                        const uploadResult = await uploadBytes(storageRef, blob, metadata);
                        console.log("Upload concluído!");
                        
                        const photoURL = await getDownloadURL(storageRef);
                        console.log("URL da foto:", photoURL);
                        
                        // Atualizar documento com URL da foto
                        await setDoc(doc(database, "users", user.uid), {
                            photoURL: photoURL
                        }, { merge: true });
                        
                    } catch (storageError: any) {
                        console.warn("Erro ao salvar no Storage (não crítico):", storageError);
                        // Não mostra erro ao usuário, pois o cadastro facial já foi feito
                    }

                    
                    
                } catch (backendError: any) {
                    console.error("Erro ao registrar no backend:", backendError);
                    console.error("Response data:", backendError.response?.data);
                    console.error("Status:", backendError.response?.status);
                    console.error("Message:", backendError.message);
                    
                    let errorMessage = "Erro ao cadastrar o reconhecimento facial.";
                    
                    if (backendError.response?.data?.error) {
                        errorMessage = backendError.response.data.error;
                    } else if (backendError.message) {
                        errorMessage = backendError.message;
                    }
                    
                    // Se falhou no backend, ainda deixa criar a conta
                    Alert.alert(
                        "Atenção",
                        `Conta criada, mas houve um erro no reconhecimento facial: ${errorMessage}\n\nVocê pode fazer login com email e senha.`,
                        [{ text: "OK", onPress: () => navigation.navigate("LoginScreen") }]
                    );
                }
            } else {
                Alert.alert(
                    "Sucesso!",
                    "Conta criada! Você pode fazer login com email e senha.",
                    [{ text: "OK", onPress: () => navigation.navigate("LoginScreen") }]
                );
            }

        } catch (error: any) {
            console.error("Erro no cadastro:", error);
            
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert("Erro", "Este e-mail já está em uso.");
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert("Erro", "O endereço de e-mail não é válido.");
            } else {
                Alert.alert("Erro", "Ocorreu um erro ao criar a conta: " + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    // Remover foto capturada
    const removerFoto = () => {
        Alert.alert(
            "Remover Foto",
            "Deseja remover a foto capturada?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Remover",
                    style: "destructive",
                    onPress: () => setFotoCapturada(null)
                }
            ]
        );
    };

    // Tela da câmera
    if (showCamera) {
        return (
            <View style={styles.cameraContainer}>
                <CameraView
                    style={styles.camera}
                    facing="front"
                    ref={cameraRef}
                >
                    <View style={styles.cameraHeader}>
                        <Text style={styles.cameraTitle}>Cadastro Facial</Text>
                        <Text style={styles.cameraInstructions}>
                            Posicione seu rosto no centro da tela{'\n'}
                            Certifique-se de estar bem iluminado
                        </Text>
                    </View>
                    <View style={styles.cameraButtonContainer}>
                        <TouchableOpacity
                            style={[styles.captureButton, loading && styles.captureButtonDisabled]}
                            onPress={capturarFoto}
                            disabled={loading}
                        >
                            <Text style={styles.captureButtonText}>
                                {loading ? "Processando..." : "📸 Capturar Foto"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setShowCamera(false)}
                            disabled={loading}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>
                {loading &&
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={styles.loadingText}>Processando foto...</Text>
                    </View>
                }
            </View>
        );
    }

    // Tela principal de cadastro
    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Image source={require("../../Images/Label.png")} style={styles.img} />
            </View>
            <View style={styles.container2}>
                <View style={styles.viewGradient}>
                    <GradientWord style={styles.txtGradient}>Crie sua conta</GradientWord>
                    <Text style={styles.text1}> para salvar seu</Text>
                </View>
                <Text style={styles.text2}>progresso com segurança</Text>

                <TextInput
                    style={styles.textInputs}
                    placeholder="Nome"
                    onChangeText={setNome}
                    value={nome}
                />
                <TextInput
                    style={styles.textInputs}
                    placeholder="Email"
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.textInputs}
                    placeholder="Senha"
                    onChangeText={setSenha}
                    secureTextEntry={true}
                    value={senha}
                />
                <TextInput
                    style={styles.textInputs}
                    placeholder="Confirmar Senha"
                    secureTextEntry={true}
                    onChangeText={setConfirmacaoSenha}
                    value={confirmacaoSenha}
                />

                {/* Botão de Cadastro Facial */}
                <TouchableOpacity
                    style={[
                        styles.facialButton,
                        fotoCapturada && styles.facialButtonSuccess
                    ]}
                    onPress={fotoCapturada ? removerFoto : abrirCameraParaCadastro}
                >
                    <Text style={styles.facialButtonIcon}>
                        {fotoCapturada ? "✅" : "📷"}
                    </Text>
                    <View style={styles.facialButtonTextContainer}>
                        <Text style={styles.facialButtonTitle}>
                            {fotoCapturada ? "Foto Cadastrada" : "Cadastrar Rosto (Opcional)"}
                        </Text>
                        <Text style={styles.facialButtonSubtitle}>
                            {fotoCapturada
                                ? "Toque para remover e tirar outra"
                                : "Para login com reconhecimento facial"
                            }
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Botão Confirmar Cadastro */}
                <GradientButton
                    title={loading ? "Cadastrando..." : "Confirmar Cadastro"}
                    onPress={confirmarCadastro}
                    style={styles.btnConfirmar}
                    disabled={loading}
                />

                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => navigation.navigate("LoginScreen")}
                >
                    <Text style={styles.textButton1}>Já possuo uma conta</Text>
                </TouchableOpacity>
            </View>

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#000" />
                    <Text style={styles.loadingText}>Criando conta...</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container1: {
        height: "15%",
        alignItems: "center",
        elevation: 5,
        backgroundColor: "#fff"
    },
    img: {
        alignSelf: "center",
        marginTop: "21%"
    },
    container2: {
        top: "5%"
    },
    textInputs: {
        borderWidth: 2,
        marginHorizontal: "7%",
        marginVertical: "2%",
        borderRadius: 8,
        borderColor: "#1B1B1B",
        fontFamily: "Inter",
        fontSize: 16,
        color: "#1B1B1B",
        paddingLeft: 20,
        height: 50,
    },
    facialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: "7%",
        marginVertical: "3%",
        padding: 15,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#1B1B1B",
        borderStyle: 'dashed',
        backgroundColor: '#f9f9f9',
    },
    facialButtonSuccess: {
        borderColor: "#4CAF50",
        backgroundColor: '#e8f5e9',
        borderStyle: 'solid',
    },
    facialButtonIcon: {
        fontSize: 32,
        marginRight: 15,
    },
    facialButtonTextContainer: {
        flex: 1,
    },
    facialButtonTitle: {
        fontSize: 16,
        fontFamily: "Inter",
        fontWeight: "600",
        color: "#1B1B1B",
        marginBottom: 4,
    },
    facialButtonSubtitle: {
        fontSize: 12,
        fontFamily: "Inter",
        color: "#666",
    },
    btnConfirmar: {
        height: 50,
        width: "86%",
        marginTop: "5%",
        alignSelf: 'center',
    },
    button2: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    viewGradient: {
        flexDirection: "row",
        marginHorizontal: "7%"
    },
    txtGradient: {
        fontSize: 24,
        fontFamily: "Inter",
        fontWeight: "800",
    },
    text1: {
        fontSize: 24,
        fontFamily: "Inter",
        fontWeight: "800",
    },
    text2: {
        fontSize: 24,
        fontFamily: "Inter",
        fontWeight: "800",
        marginHorizontal: "7%",
        marginBottom: "5%"
    },
    textButton1: {
        color: "#1B1B1B",
        fontSize: 16,
        fontFamily: "Inter"
    },
    // Estilos da câmera
    cameraContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    camera: {
        flex: 1,
    },
    cameraHeader: {
        paddingTop: 60,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        alignItems: 'center',
        paddingBottom: 20,
    },
    cameraTitle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cameraInstructions: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    cameraButtonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 50,
    },
    captureButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        paddingHorizontal: 40,
        paddingVertical: 18,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 15,
    },
    captureButtonDisabled: {
        opacity: 0.5,
    },
    captureButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#fff',
        fontSize: 16,
        marginTop: 15,
        fontFamily: "Inter",
    }
});

export default CadastroScreen;