// app/(auth)/sign-up.tsx
import * as React from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import StyledButton from "@/components/StyledButton";

const HOME_ROUTE = "/"; // or "/(tabs)" or "/home" – set this to your app’s home

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [err, setErr] = React.useState<string | null>(null);

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setErr(null);
    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (e: any) {
      console.error(e);
      setErr(e?.errors?.[0]?.longMessage ?? e?.message ?? "Sign up failed");
      Alert.alert("Sign up failed", err ?? "Try again");
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setErr(null);
    try {
      const attempt = await signUp.attemptEmailAddressVerification({ code });
      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId }); // IMPORTANT
        router.replace("/(call)"); // go to your main app screen
      } else {
        console.warn("Verification not complete:", attempt);
      }
    } catch (e: any) {
      console.error(e);
      setErr(
        e?.errors?.[0]?.longMessage ?? e?.message ?? "Verification failed"
      );
      Alert.alert("Verification failed", err ?? "Check the code and try again");
    }
  };

  if (pendingVerification) {
    return (
      <View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 12, backgroundColor:"#50C878" }}>
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 6, color:"white", textAlign:"center" }}>
         A Verify code is sent to your email. <br/> Please enter it below.
        </Text>
        <TextInput
          value={code}
          onChangeText={setCode}
          placeholder="Enter verification code"
          keyboardType="number-pad"
          style={{ padding: 16, backgroundColor: "white", borderRadius: 10 }}
        />
        <TouchableOpacity
          onPress={onVerifyPress}
          style={{ padding: 16, backgroundColor: "white", borderRadius: 10 }}
        >
          <Text style={{ color: "#50C878", textAlign: "center" }}>
            Verify & Continue
          </Text>
        </TouchableOpacity>
        {err ? <Text style={{ color: "red" }}>{err}</Text> : null}
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={{
        flex: 1,
        backgroundColor: "#50C878",
        paddingHorizontal: 10,
        justifyContent: "center",
        gap: 10,
      }}
    >
      <MaterialIcons
        name="video-chat"
        size={160}
        color="white"
        style={{ alignSelf: "center", paddingBottom: 20 }}
      /> 
      <Text style={{color:"white", textAlign:"center"}}>Enter Your Details to get Started!</Text>
      <TextInput
        style={{
          padding: 20,
          width: "100%",
          backgroundColor: "white",
          borderRadius: 10,
        }}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={setEmailAddress}
      />
      <TextInput
        style={{
          padding: 20,
          width: "100%",
          backgroundColor: "white",
          borderRadius: 10,
        }}
        value={password}
        placeholder="Enter password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <View
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 1,
          marginVertical: 20,
        }}
      />
      <StyledButton title="Sign Up" onPress={onSignUpPress} />
  
      <View style={{ flexDirection: "row", gap: 3 }}>
        <Text style={{ color: "white" }}>Already have an account?</Text>
        <Link href="/(auth)/sign-in">
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            Sign in
          </Text>
        </Link>
      </View>
      {err ? <Text style={{ color: "red", marginTop: 8 }}>{err}</Text> : null}
    </KeyboardAvoidingView>
  );
}
