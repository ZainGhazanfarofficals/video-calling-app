import { View, Text } from 'react-native';
import {useAuth} from"@clerk/clerk-expo";
import { Redirect, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthRoutesLayout() {
    const {isSignedIn} = useAuth();
    if (isSignedIn) {
    return <Redirect href={'/(call)/index'} />
  }
  return (
    <SafeAreaView style={{flex:1}}>
        <Stack>
            <Stack.Screen 
              name="sign-in"
              options={{
                title:"Sign in to get Started",
                headerShown:false,

                headerStyle: {backgroundColor: "#50C878"},
                headerTintColor: "white",
              }}
            >
            </Stack.Screen>
            <Stack.Screen 
              name="sign-up"
              options={{
                title:"Create new account",
                headerBackTitle: "Sign In",
                headerShown:true,
                headerStyle: {backgroundColor: "#50C878"},
                headerTintColor: "white",
              }}
            >
            </Stack.Screen>
        </Stack>
    </SafeAreaView>
  )
}