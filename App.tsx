import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {ThemeProvider, createTheme} from '@rneui/themed';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const theme = createTheme({});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}
