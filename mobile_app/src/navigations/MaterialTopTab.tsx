import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialTopTabBar } from "@react-navigation/material-top-tabs";
import { RootTopTabs } from "../types/rotas";
import SummaryScreen from "../screens/telasDentroDoApp/SummaryScreen";
import CalendarScreen from "../screens/telasDentroDoApp/CalendarScreen";
import SavingsScreen from "../screens/telasDentroDoApp/SavingsScreen";
import UrgesScreen from "../screens/telasDentroDoApp/UrgesScreen";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { User as FirebaseAuthUser } from "firebase/auth";

const TopTab = createMaterialTopTabNavigator<RootTopTabs>();


const tabColors: Record<string, any> = {
    Resumo: ['#BCE051', '#4DA7646E'],
    Calendário: ["#4DA7646E", "#BCE0514D"],
    Economias: ["#BCE0514D", "#4DA7646E"],
    Impulsos: ["#4DA7646E", "#BCE0514D"]
};

function CustomTabBar(props: any) {
    const { state } = props;
    const routeName = state.routeNames[state.index];
    const gradientColors = tabColors[routeName] || ['#FFF', '#EEE'];

    return (
        <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
        >
            <MaterialTopTabBar {...props} />
        </LinearGradient>
    );
}

const MaterialTopTab = () => {
    const route = useRoute();
    const { user } = route.params as { user: FirebaseAuthUser }

    return (
        <TopTab.Navigator 
            initialRouteName="Resumo" 
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                tabBarLabelStyle: { fontFamily: "Inter", fontSize: 10 },
                tabBarIndicatorStyle: { backgroundColor: "#1B1B1B", height: 3, width: 55, marginLeft: '6%' },
                tabBarStyle: { backgroundColor: "transparent", elevation: 0 }
            }}
        >
            <TopTab.Screen name="Resumo" component={SummaryScreen} initialParams={{ user: user }} />
            <TopTab.Screen name="Calendário" component={CalendarScreen} />
            <TopTab.Screen name="Economias" component={SavingsScreen} />
            <TopTab.Screen name="Impulsos" component={UrgesScreen} />
        </TopTab.Navigator>
    )
}

export default MaterialTopTab;