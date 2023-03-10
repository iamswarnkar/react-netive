import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";

export default function StateList({ stateID }) {
  const [clicked, setClicked] = useState(false);
  const [cityList, setCityList] = useState([{ key: null, value: "" }]);
  const [selectedCity, setSelectedState] = useState("");

  async function fetchCity(stateID) {
    console.log("function call in city", stateID);
    if (countryID !== "") {
      try {
        const countryData = await fetch(
          `http://182.76.237.238/~wellness/wellness/api/state_list/`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ state_id: 1 }),
          }
        );
        const response = await countryData.json();
        const data = response.data.map((item) => {
          return { key: item.id, value: item.state_name };
        });
        setCityList(data);
        console.log("response", response);
      } catch (err) {
        alert(err);
      }
    }
  }

  function handlePress(item) {
    setSelectedState(item.value);
    setClicked(false);
  }

  useEffect(() => {
    fetchCity(stateID);
  }, [stateID]);
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
            stateID == ""
              ? alert("Please Select State First")
              : setClicked(!clicked);
          }}
        >
          <Text style={{ color: "#fff", marginVertical: 5 }}>
            {selectedCity == "" ? "Select City..." : selectedCity}
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
            {cityList.map((item) => {
              return (
                <ScrollView key={item.key}>
                  <TouchableOpacity
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
    </>
  );
}
