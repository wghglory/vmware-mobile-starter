/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {Text as DefaultText, View as DefaultView} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

/**
 * define light/dark color for a property such as text color, or background color
 * @param props lightMode color, darkMode color string
 * @param colorName text, background, etc
 * @returns
 */
export function useThemeColor(
  props: {light?: string; dark?: string},
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme(); // light | dark
  const colorFromProps = props[theme];

  // if defined inline light, dark color, use it
  if (colorFromProps) {
    return colorFromProps;
  } else {
    // otherwise use the default color from the Color constants
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');

  return <DefaultText style={[{color}, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const {style, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    'background',
  );

  return <DefaultView style={[{backgroundColor}, style]} {...otherProps} />;
}
