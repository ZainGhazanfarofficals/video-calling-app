import { View, Text, TouchableOpacity } from "react-native";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import Dialog from "react-native-dialog";

export default function IndexScreen() {
  const { isSignedIn, signOut } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }
  return (
    <View>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 100,
        }}
        onPress={() => setDialogOpen(true)}
      >
        <MaterialCommunityIcons name="exit-run" size={24} color={"#50C878"} />
      </TouchableOpacity>
      <Dialog.Container visible={dialogOpen}>
        <Dialog.Title>Sign out</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to sign out?
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setDialogOpen(false)} />
        <Dialog.Button
          label="Signout"
          onPress={async () => {
            await signOut();
            setDialogOpen(false);
          }}
        />
      </Dialog.Container>
      <Text>Hello World</Text>
      <SignedIn>
        <Text>You are Signed in</Text>
      </SignedIn>

      <SignedOut>
        <Text>You are Signed Out</Text>
      </SignedOut>
    </View>
  );
}
