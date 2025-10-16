import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Tabs, useRouter } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useAuth,useUser } from "@clerk/clerk-expo";
import {
  LogLevel,
  logLevels,
  StreamVideo,
  StreamVideoClient,
  User,
} from '@stream-io/video-react-native-sdk';
const apiKey = process.env.EXPO_PUBLIC_GET_STREAM_API_KEY; // fixed key
if (!apiKey) {
  throw new Error(
    "Missing API key. Please set EXPO_PUBLIC_GET_STREAM_API_KEY in your .env"
  );
}

export default function CallRoutesLayout() {
  const { isSignedIn } = useAuth();
  const {user:clerkUser}= useUser();
  if (!isSignedIn||!clerkUser||!apiKey) {
    return <Redirect href="/(auth)/sign-in" />; // fixed path & quotes
  }

  const router = useRouter();

  const client = StreamVideoClient.getOrCreateInstance({
    apiKey,
    user,
    tokenProvider,
    options:{
        logger:(logLevels:LogLevel,message:string,...args:unknown[])=>{},
    },
  });


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StreamVideo client={client}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#50C878",
          tabBarStyle: { display: route.name === "[id]" ? "none" : "flex" },
          tabBarLabelStyle: { zIndex: 100, paddingBottom: 5 },
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "All Calls",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="call-outline" size={size ?? 24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="[id]"
          options={{
            title: "Start",
            headerShown: false,
            tabBarLabel: "",
            tabBarButton: ({ onPress, accessibilityLabel, accessibilityState, testID }) => (
              <Pressable
                onPress={() => {
                  // Push to a concrete route (e.g., "new" or an actual id)
                  router.push("/(call)/new");
                }}
                // (Optional) forward a11y/test props if you want
                accessibilityLabel={accessibilityLabel}
                accessibilityState={accessibilityState}
                testID={testID}
                style={({ pressed }) => [
                  {
                    position: "absolute",
                    top: -18,
                    alignSelf: "center",
                    height: 56,
                    width: 56,
                    borderRadius: 28,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 4,
                    shadowColor: "#000",
                    shadowOpacity: 0.15,
                    shadowRadius: 8,
                    shadowOffset: { width: 0, height: 4 },
                  },
                  pressed && { opacity: 0.85 },
                ]}
                accessibilityRole="button"
              >
                <FontAwesome name="plus-circle" size={34} color="#50C878" />
              </Pressable>
            ),
          }}
        />

        <Tabs.Screen
          name="join"
          options={{
            title: "Join Calls",
            headerTitle: "Enter the Room ID",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="enter-outline" size={size ?? 24} color={color} />
            ),
          }}
        />
      </Tabs>
      </StreamVideo>
    </SafeAreaView>
  );
}
