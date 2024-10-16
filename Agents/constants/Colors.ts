/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#8A2BE2'
const tintColorDark = '#E6E6FA'

export const Colors = {
  light: {
    text: '#4B0082',
    background: '#F8F4FF',
    tint: tintColorLight,
    icon: '#9370DB',
    tabIconDefault: '#9370DB',
    tabIconSelected: tintColorLight
  },
  dark: {
    text: '#E6E6FA',
    background: '#2E0854',
    tint: tintColorDark,
    icon: '#D8BFD8',
    tabIconDefault: '#D8BFD8',
    tabIconSelected: tintColorDark
  }
}
