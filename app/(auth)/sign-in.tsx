import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import StyledButton from "@/components/StyledButton";
import SignInWithOAuth from "@/components/SignInWithOAuth";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(call)");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      //   console.error(JSON.stringify(err, null, 2));
      Alert.alert(
        "Whoops!",
        "Look like you entered wrong email or password. \n\n please try again"
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: "#50C878",
        paddingHorizontal: 20,
        justifyContent: "center",
        gap: 10,
      }}
    >
      <MaterialIcons
        name="video-chat"
        size={160}
        color="white"
        style={{
          alignSelf: "center",
          paddingBottom: 20,
        }}
      />
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
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
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
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <View
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 1,
          marginVertical: 20,
        }}
      />
  
      <StyledButton title="Sign In" onPress={onSignInPress} />
       <Text style={{
        textAlign:"center",
        color:"white",
       }}>
        OR
       </Text>
      {/* <SignInWithAuth/> */}
        <SignInWithOAuth/>
      <View
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 1,
          marginVertical: 20,
        }}
      />

      <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
        <Text style={{color:"white"}}>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text style={{
            color:"white",
            fontWeight:"bold",
            textDecorationLine:"underline",
          }}>Sign up</Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}
