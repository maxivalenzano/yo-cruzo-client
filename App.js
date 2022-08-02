import * as React from "react";
import { View, Text, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source="https://instagram.faep6-1.fna.fbcdn.net/v/t51.2885-19/289082099_1023048275247055_7801578516483573379_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.faep6-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=Aq2VVwZyCRsAX-tDmmx&tn=XXGGyuFTgASw_nMW&edm=APU89FABAAAA&ccb=7-5&oh=00_AT_lYMkyI0-ZWO5fABMzM2b7Y2L5utEk6vuNbGLd_UIH2A&oe=62EF741F&_nc_sid=86f79a"
    />
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Text>my first screen</Text>
      <Button
        title="Iniciar sesión"
        onPress={() => navigation.navigate("LoginScreen")}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("LoginScreen")}
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("HomeScreen")}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Yo cruzo",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitle: (props) => <LogoTitle {...props} />,
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={DetailsScreen}
          options={{ title: "Iniciar Sesión" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
