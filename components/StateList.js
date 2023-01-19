import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import City from "./City";

export default function StateList({ countryID }) {
  const [clicked, setClicked] = useState(false);
  const [stateList, setStateList] = useState([{ key: null, value: "" }]);
  const [stateID, setStateID] = useState("");
  const [selectedState, setSelectedState] = useState("");

  async function fetchState(countryID) {
    console.log("function call", countryID);
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
            body: JSON.stringify({ country_id: countryID }),
          }
        );
        const response = await countryData.json();
        const data = response.data.map((item) => {
          return { key: item.id, value: item.state_name };
        });
        setStateList(data);
        console.log("response", response);
      } catch (err) {
        alert(err);
      }
    }
  }

  function handlePress(item) {
    setSelectedState(item.value);
    setStateID(item.id);
    setClicked(false);
  }

  useEffect(() => {
    fetchState(countryID);
  }, [countryID]);
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
            countryID == ""
              ? alert("Please Select Country First")
              : setClicked(!clicked);
          }}
        >
          <Text style={{ color: "#fff", marginVertical: 5 }}>
            {selectedState == "" ? "Select State..." : selectedState}
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
            {stateList.map((item) => {
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
      <City stateID={stateID} />
    </>
  );
}
