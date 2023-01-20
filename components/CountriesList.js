import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import StateList from "./StateList";

export default function CountriesList() {
  const [clicked, setClicked] = useState(false);
  const [countriesList, setCountriesList] = useState([
    { key: null, value: "" },
  ]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryID, setCountryID] = useState(1);
  async function fetchCountry() {
    const countryData = await fetch(
      "http://182.76.237.238/~wellness/wellness/api/country_list"
    );
    const response = await countryData.json();
    const data = response.data.map((item) => {
      return { key: item.id, value: item.country_name };
    });
    setCountriesList(data);
  }

  function handlePress(item) {
    setSelectedCountry(item.value);
    setCountryID(item.key);
    setClicked(false);
  }

  useEffect(() => {
    fetchCountry();
  }, []);
  return (
    <>
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
            {selectedCountry == "" ? "Select Country..." : selectedCountry}
          </Text>
        </TouchableOpacity>
        {clicked ? (
          <View
            style={{
              marginTop: 10,
              height: 100,
              alignSelf: "center",
              width: "100%",
              backgroundColor: "#000",
              color: "#fff",
              paddingHorizontal: 5,
            }}
          >
            {countriesList.map((item) => {
              return (
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
              );
            })}
          </View>
        ) : null}
      </View>
      <StateList countryID={countryID} />
      
    </>
  );
}
