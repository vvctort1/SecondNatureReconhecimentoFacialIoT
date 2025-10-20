import { createStackNavigator } from "@react-navigation/stack";
import { RootStack } from "../types/rotas";
import FirstScreen from "../screens/telasIniciais/FirstScreen";
import CadastroScreen from "../screens/telasIniciais/CadastroScreen";
import LoginScreen from "../screens/telasIniciais/LoginScreen";
import Question2Screen from "../screens/telasQuestionarios/Question2Screen";
import ReadyScreen from "../screens/telasQuestionarios/ReadyScreen";
import BottomTabs from "./BottomTabs";
import IntroScreen from "../screens/telasQuestionarios/IntroScreen";
import Question1Screen from "../screens/telasQuestionarios/Question1Screen";
import Question3Screen from "../screens/telasQuestionarios/Question3Screen";
import Question4Screen from "../screens/telasQuestionarios/Question4Screen";
import Question5Screen from "../screens/telasQuestionarios/Question5Screen";
import { Image, StyleSheet } from "react-native";
import AutorizacaoScreen from "../screens/telasQuestionarios/AutorizacaoScreen";
import CheckinScreen from "../screens/telasDentroDoApp/CheckinScreen";
import ImpulsoScreen from "../screens/telasDentroDoApp/ImpulsoScreen";
import { BlockScreen } from "../screens/telasDentroDoApp/MonitorScreen";



const InternalStack = createStackNavigator<RootStack>()

const Stack = () => {
    return(
        <InternalStack.Navigator 
        initialRouteName="FirstScreen"
        >
        <InternalStack.Screen name="FirstScreen" component={FirstScreen} options={
          {headerShown: false}
        }/>
        <InternalStack.Screen name="CadastroScreen" component={CadastroScreen} options={
          {headerShown: false}
        }/>
        <InternalStack.Screen name="LoginScreen" component={LoginScreen} options={
          {headerShown: false}
        }/>
        <InternalStack.Screen name="IntroScreen" component={IntroScreen}options={
          {headerShown: false}
        }/>
        <InternalStack.Screen name="Question1Screen" component={Question1Screen} options={{
          headerTitle: () => <Image source={require("../Images/logo.png")} style={styles.logo}/>, headerTitleAlign: "center"
        }}/>
        <InternalStack.Screen name="Question2Screen" component={Question2Screen} options={{
          headerTitle: () => <Image source={require("../Images/logo.png")} style={styles.logo}/>, headerTitleAlign: "center"
        }}/>
        <InternalStack.Screen name="Question3Screen" component={Question3Screen} options={{
          headerTitle: () => <Image source={require("../Images/logo.png")} style={styles.logo}/>, headerTitleAlign: "center"
        }}/>
        <InternalStack.Screen name="Question4Screen" component={Question4Screen} options={{
          headerTitle: () => <Image source={require("../Images/logo.png")} style={styles.logo}/>, headerTitleAlign: "center"
        }}/>
        <InternalStack.Screen name="Question5Screen" component={Question5Screen} options={{
          headerTitle: () => <Image source={require("../Images/logo.png")} style={styles.logo}/>, headerTitleAlign: "center"
        }}/>
        <InternalStack.Screen name="AutorizacaoScreen" component={AutorizacaoScreen} options={{
          headerShown: false
        }}/>
        <InternalStack.Screen name="ReadyScreen" component={ReadyScreen} options={{
          headerShown: false
        }}/>
        <InternalStack.Screen name="BottomT" component={BottomTabs} options={{
          headerShown: false
        }}/>
        <InternalStack.Screen name="CheckinScreen" component={CheckinScreen} options={{
          headerTitle: () => <Image source={require("../Images/logo.png")} style={styles.logo}/>, headerTitleAlign: "center"
        }}/>
        <InternalStack.Screen name="ImpulsoScreen" component={ImpulsoScreen} options={{
          headerTitle: () => <Image source={require("../Images/logo.png")} style={styles.logo}/>, headerTitleAlign: "center", headerLeft: () => null
        }}/>
      </InternalStack.Navigator>
    )
}

const styles = StyleSheet.create({
  logo: {
    height: "34%",
    width: 20
  }
})

export default Stack;