import MaskedView from "@react-native-masked-view/masked-view";
import { Text } from "react-native";
 import { LinearGradient } from "expo-linear-gradient";

type GradientWordProps = {
    children: string | string[];
    style?: any;
};

const GradientWord = ({ children, style }: GradientWordProps) => (
    <MaskedView
        maskElement={
            <Text style={[style, { backgroundColor: 'transparent' }]}>{children}</Text>
        }
    >
        <LinearGradient
            colors={['#BCE051', '#4DA764']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
        >
            <Text style={[style, { opacity: 0, fontFamily: "Inter", fontWeight: 800}]}>{children}</Text>
        </LinearGradient>
    </MaskedView>
);

export default GradientWord;