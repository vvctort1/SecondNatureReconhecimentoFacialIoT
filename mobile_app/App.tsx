
import { useFonts, PatrickHand_400Regular } from '@expo-google-fonts/patrick-hand';
import { Inter_400Regular } from "@expo-google-fonts/inter";
import RootNavigator from './src/navigations/RootNavigator';


export default function App() {

  let [fontsLoaded] = useFonts({
    'Patrick Hand': PatrickHand_400Regular,
    'Inter': Inter_400Regular,
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <RootNavigator/>
  );
}

