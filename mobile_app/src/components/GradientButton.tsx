import React from 'react';
import { Text, TouchableOpacity, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

type GradientButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  colors?: any;
  disabled?: boolean;
};

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  colors = ['#BCE051', '#4DA764'],
  disabled,
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
      style={[styles.btn, style]}
    >
      <TouchableOpacity onPress={onPress} style={[styles.touchable, disabled && {opacity: 0.5,backgroundColor: "#eee"}]} disabled={disabled}>
        <Text style={[styles.txtBtn, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: '80%',
    height: '6%',
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: '20%',
    justifyContent: 'center'
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  txtBtn: {
    fontFamily: 'Inter',
    fontWeight: '800',
    color: '#FFF',
    fontSize: 20
  }
});

export default GradientButton;
