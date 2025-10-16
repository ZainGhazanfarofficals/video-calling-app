// components/GoogleSignInButton.tsx
import * as React from "react";
import {  TouchableOpacity,Text } from "react-native";
import { useRouter } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";

const APP_SCHEME = "videocallapp"; // <- match your app.json scheme

export default function SignInWithOAuth() {
  const router = useRouter();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      // Build a native redirect like: videocallapp://oauth-native-callback
      const redirectUrl = AuthSession.makeRedirectUri({
        scheme: APP_SCHEME,
        path: "oauth-native-callback",
        // For Expo Go, you can also set useProxy: true,
        // but prefer this scheme approach for dev builds/prod:
        // useProxy: Platform.OS !== "web" && __DEV__,
      });

      const { createdSessionId, setActive, signIn, signUp } =
        await startOAuthFlow({ redirectUrl });

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.replace("/(call)"); // go to your home
        return;
      }

      // If more steps are required (MFA, org selection, etc.), handle here:
      if (signIn) {
        // await signIn?.someNextStep()
      } else if (signUp) {
        // await signUp?.someNextStep()
      }
    } catch (err) {
      console.error("Google OAuth error:", err);
    }
  }, [startOAuthFlow, router]);

  return (
  
  <TouchableOpacity style={{
        backgroundColor: "white",
        padding: 12,
        borderRadius: 5,
        width:"100%",
       
    }} onPress={onPress}>
  {/* <Button  title="SignIn with Google" onPress={onPress} /> */}
  <Text style={{
        color:"#50C878",
        fontSize:16,
        textAlign:"center",
        fontWeight:"bold"
      }}>SignIn  with Google</Text>
  </TouchableOpacity>
  );
}
