// src/navigations/RootNavigator.tsx

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import { getAuth, onAuthStateChanged, User as FirebaseAuthUser } from 'firebase/auth';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore'; // Importe onSnapshot
import app from '../config/firebaseConfig';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStack } from '../types/rotas';

// Importe TODAS as suas telas aqui
import FirstScreen from '../screens/telasIniciais/FirstScreen';
import CadastroScreen from '../screens/telasIniciais/CadastroScreen';
import LoginScreen from '../screens/telasIniciais/LoginScreen';
import IntroScreen from '../screens/telasQuestionarios/IntroScreen';
import Question1Screen from '../screens/telasQuestionarios/Question1Screen';
import Question2Screen from '../screens/telasQuestionarios/Question2Screen';
import Question3Screen from '../screens/telasQuestionarios/Question3Screen';
import Question4Screen from '../screens/telasQuestionarios/Question4Screen';
import Question5Screen from '../screens/telasQuestionarios/Question5Screen';
import AutorizacaoScreen from '../screens/telasQuestionarios/AutorizacaoScreen';
import ReadyScreen from '../screens/telasQuestionarios/ReadyScreen';
import BottomTabs from './BottomTabs';
import ImpulsoScreen from '../screens/telasDentroDoApp/ImpulsoScreen';
import CheckinScreen from '../screens/telasDentroDoApp/CheckinScreen';

const auth = getAuth(app);
const db = getFirestore(app);
const Stack = createStackNavigator<RootStack>();

// Pilha de telas para Autenticação (Login, Cadastro, etc.)
function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="FirstScreen" component={FirstScreen} />
            <Stack.Screen name="CadastroScreen" component={CadastroScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    );
}

// Pilha de telas para o Questionário
function QuestionnaireStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="IntroScreen" component={IntroScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Question1Screen" component={Question1Screen} options={{headerTitle: () => <Image source={require("../Images/logo.png")} style={styles.logo}/>, headerTitleAlign: "center"}}/>
            <Stack.Screen name="Question2Screen" component={Question2Screen} options={{headerTitle: () => <Image source={require("../Images/logo.png")} style={styles.logo}/>, headerTitleAlign: "center"}}/>
            <Stack.Screen name="Question3Screen" component={Question3Screen} options={{headerTitle: () => <Image source={require("../Images/logo.png")} style={styles.logo}/>, headerTitleAlign: "center"}}/>
            <Stack.Screen name="Question4Screen" component={Question4Screen} options={{headerTitle: () => <Image source={require("../Images/logo.png")} style={styles.logo}/>, headerTitleAlign: "center"}}/>
            <Stack.Screen name="Question5Screen" component={Question5Screen} options={{headerTitle: () => <Image source={require("../Images/logo.png")} style={styles.logo}/>, headerTitleAlign: "center"}}/>
            <Stack.Screen name="AutorizacaoScreen" component={AutorizacaoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ReadyScreen" component={ReadyScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

// Pilha de telas para o App Principal (após login e questionário)
function AppStack({ user }: { user: FirebaseAuthUser }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="BottomT" component={BottomTabs} initialParams={{ user: user }} options={{headerShown: false}}/>
            <Stack.Screen name="CheckinScreen" component={CheckinScreen} options={{
          headerTitle: () => <Image source={require("../Images/logo.png")} style={styles.logo}/>, headerTitleAlign: "center"
        }}/>
        <Stack.Screen name="ImpulsoScreen" component={ImpulsoScreen} options={{
          headerTitle: () => <Image source={require("../Images/logo.png")} style={styles.logo}/>, headerTitleAlign: "center", headerLeft: () => null
        }}/>
        </Stack.Navigator>
    );
}

export default function RootNavigator() {
    const [user, setUser] = useState<FirebaseAuthUser | null>(null);
    const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listener 1: Verifica apenas o estado de login/logout
        const unsubscribeAuth = onAuthStateChanged(auth, (authenticatedUser) => {
            setUser(authenticatedUser);
            if (!authenticatedUser) {
                // Se o usuário fez logout, reseta tudo e para de carregar
                setHasCompletedQuestionnaire(false);
                setLoading(false);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        if (user) {
            // Listener 2: Se o usuário está logado, escuta MUDANÇAS em seu documento no Firestore
            const userDocRef = doc(db, "users", user.uid);
            
            const unsubscribeSnapshot = onSnapshot(userDocRef, (snapshot) => {
                if (snapshot.exists() && snapshot.data().questionnaireCompleted) {
                    setHasCompletedQuestionnaire(true);
                } else {
                    setHasCompletedQuestionnaire(false);
                }
                setLoading(false); // Para de carregar assim que obtém a informação
            }, (error) => {
                console.error("Erro ao escutar documento do usuário:", error);
                setLoading(false); // Para de carregar mesmo se der erro
            });

            return () => unsubscribeSnapshot();
        }
    }, [user]); // Este listener roda sempre que o objeto 'user' mudar

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? (
                hasCompletedQuestionnaire ? <AppStack user={user} /> : <QuestionnaireStack />
            ) : (
                <AuthStack />
            )}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  logo: {
    height: "34%",
    width: 20
  }
})