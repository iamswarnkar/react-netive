import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import ServiceList from "./ServiceList";
import CountriesList from "./CountriesList";
import Checkbox from "expo-checkbox";
import DocumentPicker from "react-native-document-picker";

export default function Registration() {
  const [gen, setGen] = useState("");
  const gender = [
    { key: 1, value: "Male" },
    { key: 2, value: "Female" },
  ];
  // const [image, setImage] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile_no: null,
    email: "",
    company_name: "",
    password: "",
    confirm_password: "",
    gender: 1,
    image: "img/path",
    reference_name: "",
    reference_mobile_no: null,
    reference_relation: "",
    alternate_mobile_no: null,
    service_category: null,
    experience: "",
    country: 1,
    state: 2,
    city: 3,
    pin_code: "",
    lat: "123",
    long: "2333",
    id_proof: "file/path",
    term_condition: "",
    device_token: "null",
  });

  // console.log("formData", formData);

  function handleSubmit() {
    if (formData.password !== formData.confirm_password) {
      alert("Password and confirm Password Must be same ");
    } else if (
      formData.name === "" ||
      formData.mobile_no === "" ||
      formData.email === "" ||
      formData.company_name === "" ||
      formData.reference_name === "" ||
      formData.reference_mobile_no === "" ||
      formData.service_category === "" ||
      formData.experience === "" ||
      formData.pin_code === "" ||
      formData.password === "" ||
      formData.confirm_password === ""
    ) {
      console.log(formData);
      alert("All field Required ");
    } else if (formData.term_condition === "") {
      alert("Please agree Term Condition");
    } else {
      submitForm();
      alert("Registration Done");
    }
  }
  // console.log(formData);

  function getService(data) {
    setFormData({ ...formData, service_category: data });
  }

  async function submitForm() {

    try {
      const countryData = await fetch(
        `http://182.76.237.238/~wellness/wellness/api/provider_registration`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const response = await countryData.json();
      
      console.log("response", response);
    } catch (err) {
      alert(err);
    }
  }

  async function handleFile() {
    try {
      let result = await DocumentPicker.pick();
      console.log("result", result);
    } catch (err) {
      console.log(err);
      alert("hello some error");
    }
  }
  return (
    <>
      <View style={styles.registrationContainer}>
        <Text style={styles.textStyle}>User Registration Form</Text>
        <TextInput
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          style={styles.input}
          placeholder="Enter Your Name"
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          value={formData.mobile_no}
          onChangeText={(text) => setFormData({ ...formData, mobile_no: text })}
          placeholder="Enter Your Mobile No"
          keyboardType="numeric"
          placeholderTextColor="#fff"
          maxLength={10}
        />
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          placeholder="Enter Your Email"
          placeholderTextColor="#fff"
          inputMode="email"
        />
        <TextInput
          style={styles.input}
          value={formData.company_name}
          onChangeText={(text) =>
            setFormData({ ...formData, company_name: text })
          }
          placeholder="Enter Company Name"
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry={true}
          placeholder="Enter Password"
          placeholderTextColor="#fff"
        />
        <TextInput
          value={formData.confirm_password}
          onChangeText={(text) =>
            setFormData({ ...formData, confirm_password: text })
          }
          style={styles.input}
          secureTextEntry={true}
          placeholder="Confirm Password"
          placeholderTextColor="#fff"
        />

        {/* <SelectList
          data={gender}
          setGen={(val) => setGen(val)}
          boxStyles={{ marginTop: 10, width: 280 }}
          inputStyles={{ color: "#fff" }}
          placeholderTextColor="#fff"
          dropdownTextStyles={{ color: "#fff" }}
          search={false}
          maxHeight={90}
          placeholder="Select Gender"
        /> */}
        {/* <TouchableOpacity style={styles.input} onPress={handleFile}>
          <Text
            style={{
              color: "#fff",
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            Choose Your Profile Image
          </Text>
        </TouchableOpacity> */}
        <TextInput
          style={styles.input}
          value={formData.reference_name}
          onChangeText={(text) =>
            setFormData({ ...formData, reference_name: text })
          }
          placeholder="Enter Reference Name"
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          value={formData.reference_mobile_no}
          onChangeText={(text) =>
            setFormData({ ...formData, reference_mobile_no: text })
          }
          placeholder="Reference Mobile No"
          keyboardType="numeric"
          placeholderTextColor="#fff"
          maxLength={10}
        />
        <TextInput
          style={styles.input}
          value={formData.reference_relation}
          onChangeText={(text) =>
            setFormData({ ...formData, reference_relation: text })
          }
          placeholder="Reference Relation"
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          value={formData.alternate_mobile_no}
          onChangeText={(text) =>
            setFormData({ ...formData, alternate_mobile_no: text })
          }
          placeholder="Alternate Mobile No"
          keyboardType="numeric"
          placeholderTextColor="#fff"
          maxLength={10}
        />
        <ServiceList getService={getService} />
        <TextInput
          style={styles.input}
          value={formData.experience}
          onChangeText={(text) =>
            setFormData({ ...formData, experience: text })
          }
          placeholder="Experience"
          placeholderTextColor="#fff"
        />
        <CountriesList />
        {/* <TextInput
          style={styles.input}
          placeholder="Country"
          placeholderTextColor="#fff"
        /> */}
        <TextInput
          style={styles.input}
          value={formData.pin_code}
          onChangeText={(text) => setFormData({ ...formData, pin_code: text })}
          placeholder="Pin Code"
          placeholderTextColor="#fff"
        />
        {/* <TextInput
          style={styles.input}
          placeholder="id_proof"
          placeholderTextColor="#fff"
        /> */}
        <View style={styles.check}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={(e) => {
              setChecked(!isChecked);
              setFormData({
                ...formData,
                term_condition: !isChecked ? 1 : null,
              });
            }}
            color={isChecked ? "#56ffff" : undefined}
          />
          <Text style={styles.paragraph}>I agree to terms and conditions.</Text>
        </View>
        <TouchableOpacity
          disabled={formData.term_condition !== null ? false : true}
          style={[
            styles.input,
            {
              marginBottom: 80,
              opacity: formData.term_condition !== null ? 1 : 0.2,
            },
          ]}
          onPress={handleSubmit}
        >
          <View>
            <Text
              style={[
                styles.paragraph,
                {
                  alignSelf: "center",
                },
              ]}
            >
              Submit
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  registrationContainer: {
    backgroundColor: "#000",
    color: "#fff",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  textStyle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
  },
  input: {
    width: "80%",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "#fff",
    color: "#fff",
  },
  selectStyle: {
    color: "#fff",
    marginTop: 10,
  },
  check: {
    width: "80%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 14,
    backgroundColor: "#000",
  },
  paragraph: {
    fontSize: 15,
    color: "#fff",
  },
  btn: {
    width: "80%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#fff",
    marginBottom: 80,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    marginTop: 15,
  },
});
