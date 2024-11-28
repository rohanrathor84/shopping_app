import React from 'react';
import {Text, StyleSheet, TextProps, TextStyle} from 'react-native';

interface CustomTextProps extends TextProps {
  fontFamily?: 'Poppins-Regular' | 'Poppins-Bold' | 'Poppins-Italic';
  fontSize?: number;
  color?: string;
  textAlign?: TextStyle['textAlign'];
  fontWeight?: TextStyle['fontWeight'];
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  fontFamily = 'Poppins-Regular', // Default font
  fontSize = 16, // Default font size
  color = '#000', // Default color
  textAlign = 'left', // Default alignment
  fontWeight,
  style,
  ...rest
}) => {
  return (
    <Text
      style={[
        styles.text,
        {
          fontFamily,
          fontSize,
          color,
          textAlign,
          fontWeight,
        },
        style, // Spread any other custom styles passed to this component
      ]}
      {...rest} // Pass along any other props like numberOfLines, ellipsizeMode, etc.
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins-Regular', // Default font
    fontSize: 16, // Default size
    color: '#000', // Default text color
    textAlign: 'left', // Default alignment
  },
});

export default CustomText;
