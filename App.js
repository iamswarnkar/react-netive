import React from "react";
import { View, ScrollView, SafeAreaView, StatusBar } from "react-native";
import Registration from "./components/Registration";

//before run your project plz run -> ( export NODE_OPTIONS=--openssl-legacy-provider ) on git bash
export default function App() {
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <StatusBar style="auto" />
          <View>
            <Registration />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
