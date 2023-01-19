import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState, useEffect } from "react";

export default function StateList({ countryID }) {
  const [clicked, setClicked] = useState(false);
  const [stateList, setStateList] = useState([{ key: null, value: "" }]);
  const [selectedState, setSelectedState] = useState("");
  async function fetchState(countryID) {
    const countryData = await fetch(
      `http://182.76.237.238/~wellness/wellness/api/state_list/${countryID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const response = await countryData.json();
    const data = response.data.map((item) => {
      return { key: item.id, value: item.country_name };
    });
    // setStateList(data);
    console.log("response",response);
  }

  function handlePress(item) {
    setSelectedState(item.value);
    setClicked(false);
  }

  useEffect(() => {
    // fetchState(countryID);
  }, [countryID]);
  return (
    <View>
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
              {selectedCountry == "" ? "Select State..." : selectedState}
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
              <FlatList
                data={stateList}
                renderItem={({ item }) => {
                  return (
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
                  );
                }}
              />
            </View>
          ) : null}
        </View>
      </>
    </View>
  );
}
