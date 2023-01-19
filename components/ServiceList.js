import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function ServiceList() {
  const [clicked, setClicked] = useState(false);
  const [servicesList, setServicesList] = useState([{ key: null, value: "" }]);
  const [selectedService, setSelectedService] = useState("");
  async function fetchService() {
    const countryData = await fetch(
      "http://182.76.237.238/~wellness/wellness/api/category_list"
    );
    const response = await countryData.json();
    const data = response.data.map((item) => {
      return { key: item.id, value: item.name };
    });
    setServicesList(data);
  }
  // console.log("selectedService");
  function handlePress(item) {
    console.log(item);
    setSelectedService(item.value);
    setClicked(false);
  }

  useEffect(() => {
    fetchService();
  }, []);
  return (
    <View
      style={{
        width: "80%",
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: "#fff",
        color: "#fff",
      }}
    >
      <TouchableOpacity
        style={{
          width: "100%",
          borderRadius: 10,
          borderWidth: 1,
          paddingHorizontal: 5,
          alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => {
          setClicked(!clicked);
        }}
      >
        <Text style={{ color: "#fff", marginVertical: 5 }}>
          {selectedService == "" ? "Select Service..." : selectedService}
        </Text>
      </TouchableOpacity>
      {clicked ? (
        <View
          style={{
            marginTop: 10,
            alignSelf: "center",
            width: "100%",
            backgroundColor: "#000",
            color: "#fff",
            paddingHorizontal: 5,
          }}
        >
          {servicesList.map((item) => {
            return (
              <ScrollView>
                <TouchableOpacity
                  key={item.key}
                  style={{
                    width: "100%",
                    alignSelf: "center",
                    height: 50,
                    justifyContent: "center",
                    borderBottomWidth: 0.5,
                    borderColor: "#8e8e8e",
                  }}
                  onPress={() => handlePress(item)}
                >
                  <Text style={{ color: "#fff" }}>{item.value}</Text>
                </TouchableOpacity>
              </ScrollView>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}
