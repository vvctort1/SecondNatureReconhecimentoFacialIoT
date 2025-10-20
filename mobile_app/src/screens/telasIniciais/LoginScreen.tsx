import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStack } from "../../types/rotas"
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Image, Alert, ActivityIndicator } from "react-native"
import { useRef, useState } from "react";
import GradientWord from "../../components/GradientWord";
import GradientButton from "../../components/GradientButton";
import { getAuth, signInWithCustomToken, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../config/firebaseConfig";
import { Camera, CameraView } from 'expo-camera';
import axios from 'axios';

const LoginScreen = ({navigation}: NativeStackScreenProps<RootStack,"LoginScreen">) => {

    const API_URL = 'http://ip_da_sua_maquina:5000';

    const [emailLogin, setEmailLogin] = useState("");
    const [senhaLogin, setSenhaLogin] = useState("");
    const [loading, setLoading] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const cameraRef = useRef<CameraView>(null);

    const auth = getAuth(app);

    // Login com email e senha
    const HandleLogin = async() => {

        if (!emailLogin.trim() || !senhaLogin.trim()){
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }

        setLoading(true);

        try{
            await signInWithEmailAndPassword(auth, emailLogin.trim(), senhaLogin.trim());
            // Navegação é automática pelo estado de auth
        } catch (error: any) {
            setLoading(false);
            console.error("Erro no login: ", error.code);
            Alert.alert("Erro", "E-mail ou senha inválidos. Por favor, tente novamente.");
        }
    }

    // Abrir câmera para login facial
    const abrirCameraParaLogin = async () => {
        try {
            console.log("=== SOLICITANDO PERMISSÃO DA CÂMERA PARA LOGIN ===");
            const { status } = await Camera.requestCameraPermissionsAsync();
            console.log("Status da permissão:", status);

            if (status === 'granted') {
                setShowCamera(true);
            } else {
                Alert.alert(
                    "Permissão Negada",
                    "Precisamos de acesso à câmera para o login facial."
                );
            }
        } catch (error) {
            console.error("Erro ao solicitar permissão:", error);
            Alert.alert("Erro", "Não foi possível acessar a câmera");
        }
    };

    // Capturar foto e fazer login facial
    const capturarFotoParaLogin = async () => {
        if (!cameraRef.current) {
            Alert.alert("Erro", "Câmera não está pronta");
            return;
        }

        setLoading(true);

        try {
            console.log("=== CAPTURANDO FOTO PARA LOGIN ===");
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.7,
                base64: true
            });

            if (!photo?.base64) {
                throw new Error("Falha ao capturar imagem");
            }

            console.log("Foto capturada! Tamanho:", photo.base64.length);

            // Limpar base64 (remover prefixo se existir)
            const cleanBase64 = photo.base64.replace(/^data:image\/\w+;base64,/, '');

            console.log("=== ENVIANDO PARA RECONHECIMENTO FACIAL ===");
            
            const response = await axios.post(`${API_URL}/login-face`, {
                imageB64: cleanBase64,
            }, {
                timeout: 30000, 
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log("Resposta do backend:", response.data);

            if (response.data.status === 'success') {
                const { uid, email } = response.data;
                
                console.log("Rosto reconhecido! UID:", uid, "Email:", email);
                
                // Fechar câmera
                setShowCamera(false);
                
                const customToken = response.data.customToken;

                await signInWithCustomToken(auth, customToken);

                

            } else {
                throw new Error(response.data.message || "Rosto não reconhecido");
            }

        } catch (error: any) {
            console.error("Erro no login facial:", error);
            console.error("Response data:", error.response?.data);
            
            let errorMessage = "Não foi possível reconhecer seu rosto.";
            
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            Alert.alert(
                "Falha no Login Facial",
                errorMessage + "\n\nTente novamente ou use email e senha.",
                [
                    {
                        text: "Tentar Novamente",
                        onPress: () => {
                            setLoading(false);
                            // Mantém a câmera aberta
                        }
                    },
                    {
                        text: "Usar Email",
                        onPress: () => {
                            setShowCamera(false);
                            setLoading(false);
                        },
                        style: "cancel"
                    }
                ]
            );
        } finally {
            setLoading(false);
        }
    };

    // Tela da câmera para login facial
    if (showCamera) {
        return (
            <View style={styles.cameraContainer}>
                <CameraView
                    style={styles.camera}
                    facing="front"
                    ref={cameraRef}
                >
                    <View style={styles.cameraHeader}>
                        <Text style={styles.cameraTitle}>Login Facial 🔐</Text>
                        <Text style={styles.cameraInstructions}>
                            Posicione seu rosto no centro da tela{'\n'}
                            Certifique-se de estar bem iluminado
                        </Text>
                    </View>
                    
                    <View style={styles.cameraOverlay}>
                        <View style={styles.faceGuide} />
                    </View>

                    <View style={styles.cameraButtonContainer}>
                        <TouchableOpacity
                            style={[styles.captureButton, loading && styles.captureButtonDisabled]}
                            onPress={capturarFotoParaLogin}
                            disabled={loading}
                        >
                            <Text style={styles.captureButtonText}>
                                {loading ? "Verificando..." : "🔓 Fazer Login"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => {
                                setShowCamera(false);
                                setLoading(false);
                            }}
                            disabled={loading}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>
                {loading &&
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={styles.loadingText}>Reconhecendo seu rosto...</Text>
                    </View>
                }
            </View>
        );
    }

    // Tela principal de login
    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Image source={require("../../Images/Label.png")} style={styles.img}/>
            </View>
            <View style={styles.container2}>
                <View style={styles.viewGradient}>
                    <GradientWord style={styles.txtGradient}>Acesse sua conta</GradientWord>
                    <Text style={styles.text1}> para continuar</Text>
                </View>
                <Text style={styles.text2}>sua jornada.</Text>

                {/* Botão de Login Facial */}
                <TouchableOpacity 
                    style={styles.facialLoginButton}
                    onPress={abrirCameraParaLogin}
                >
                    <View style={styles.facialLoginIcon}>
                        <Text style={styles.facialLoginEmoji}>👤</Text>
                    </View>
                    <View style={styles.facialLoginTextContainer}>
                        <Text style={styles.facialLoginTitle}>Login com Reconhecimento Facial</Text>
                        <Text style={styles.facialLoginSubtitle}>Rápido e seguro</Text>
                    </View>
                </TouchableOpacity>

                {/* Divisor */}
                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>ou</Text>
                    <View style={styles.dividerLine} />
                </View>

                {/* Login tradicional */}
                <TextInput 
                    style={styles.textInputs} 
                    placeholder="Email" 
                    onChangeText={setEmailLogin}
                    value={emailLogin}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput 
                    style={styles.textInputs} 
                    placeholder="Senha" 
                    secureTextEntry={true} 
                    onChangeText={setSenhaLogin}
                    value={senhaLogin}
                />
                
                <GradientButton 
                    title={loading ? "Entrando..." : "Entrar"} 
                    onPress={HandleLogin} 
                    style={styles.btnEntrar} 
                    disabled={!(emailLogin && senhaLogin) || loading}
                />
                
                <TouchableOpacity 
                    style={styles.textButton2} 
                    onPress={() => navigation.navigate("CadastroScreen")}
                >
                    <Text style={styles.textButton}>Não possuo uma conta</Text>
                </TouchableOpacity>
            </View>
            
            {loading && (
                <View style={styles.loadingOverlayLight}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            )}
        </View>
    )
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
    container2:{
        top: "5%"
    },
    viewGradient: {
        flexDirection: "row",
        marginHorizontal: "7%"
    },
    txtGradient:{
        fontSize: 24,
        fontFamily: "Inter",
        fontWeight: "800",
    },
    textInputs: {
        borderWidth: 2,
        marginHorizontal: "7%",
        marginVertical: "2%",
        borderRadius: 8,
        borderColor: "#1B1B1B",
        fontFamily: "Inter",
        fontSize: 18,
        paddingLeft: 20,
        height: 50,
    },
    text1: {
        fontSize: 24,
        fontFamily:"Inter",
        fontWeight: "800"
    },
    text2:{
        fontSize: 24,
        fontFamily: "Inter",
        marginLeft: "7%",
        fontWeight: "800",
        marginBottom: "5%"
    },
    // Botão de Login Facial
    facialLoginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: "7%",
        marginVertical: "4%",
        padding: 18,
        borderRadius: 12,
        backgroundColor: '#f0f4ff',
        borderWidth: 2,
        borderColor: '#4A90E2',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    facialLoginIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    facialLoginEmoji: {
        fontSize: 28,
    },
    facialLoginTextContainer: {
        flex: 1,
    },
    facialLoginTitle: {
        fontSize: 16,
        fontFamily: "Inter",
        fontWeight: "700",
        color: "#1B1B1B",
        marginBottom: 4,
    },
    facialLoginSubtitle: {
        fontSize: 13,
        fontFamily: "Inter",
        color: "#4A90E2",
        fontWeight: "500",
    },
    // Divisor
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: "7%",
        marginVertical: "4%",
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#999',
        fontSize: 14,
        fontFamily: "Inter",
    },
    btnEntrar: {
        height: 50,
        width: "86%",
        marginTop: "5%",
        alignSelf: 'center',
    },
    textButton2: {
        marginTop: 20,
        alignItems: "center",
    },
    textButton: {
        color: "#1B1B1B",
        fontSize: 16,
        fontFamily:"Inter",
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
        lineHeight: 24,
    },
    cameraOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    faceGuide: {
        width: 250,
        height: 320,
        borderRadius: 125,
        borderWidth: 3,
        borderColor: '#4A90E2',
        borderStyle: 'dashed',
    },
    cameraButtonContainer: {
        backgroundColor: 'transparent',
        paddingBottom: 50,
        alignItems: 'center',
    },
    captureButton: {
        backgroundColor: '#4A90E2',
        paddingHorizontal: 40,
        paddingVertical: 18,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 15,
        minWidth: 200,
        alignItems: 'center',
    },
    captureButtonDisabled: {
        opacity: 0.6,
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
    loadingOverlayLight: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
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

export default LoginScreen