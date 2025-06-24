import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "react-native-ui-datepicker";
import DatePicker from "react-native-modern-datepicker";
import CustomButton from "./CustomButton";
import { AntDesign } from "@expo/vector-icons";
import BottomModal from "./BottomModal";
import { baseurl, publicUrl } from "@/app/api/baseurl";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import moment from "moment";

const MeetupDate = ({ show, setShow, prop }: any) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();
  const data = {
    property_id: prop?.id,
    tenantId: 1,
    checkIn: moment(selectedDate, 'YYYY/MM/DD').toDate(),
    checkOut: moment(selectedDate, 'YYYY/MM/DD').toDate(),
    totalAmount: 500.0,
    guestCount: 2,
    status: "PENDING",
  };

  const scheduleAppointment = async () => {
    setLoading(true)
    try{
      console.log(data, "data")
    await axios.post(`${publicUrl}/bookings`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-user-account-type": "tenant",
        "x-api-key": "tpk_midrq21up6ogy5nxdcpoe"
      },
    });
    }catch(err: any){
      console.log(err, "error from booking")
    }finally{
      setLoading(false)
    }
  };

  console.log(moment(new Date()).format("YYYY-MM-D"), "current date");

  return (
    <Modal animationType="slide" transparent visible={show}>
      <View style={styles.overlayContainer}>
        <View style={styles.container} className="space-y-5">
          <Pressable
            onPress={() => setShow(!show)}
            className="items-end w-full"
          >
            <AntDesign name="closesquareo" size={30} color="black" />
          </Pressable>
          <DatePicker
            isGregorian
            options={{
              backgroundColor: "#FFFFFF",
              textHeaderColor: "#F47D7B",
              textDefaultColor: "#000000",
              selectedTextColor: "#fff",
              mainColor: "#F47D7B",
              textSecondaryColor: "#000000",
              borderColor: "rgba(122, 146, 165, 0.1)",
            }}
            current={moment(new Date()).format("YYYY-MM-D")}
            selected={moment(new Date()).format("YYYY-MM-D")}
            // mode="calendar"
            minuteInterval={30}
            style={{ borderRadius: 10 }}
            onSelectedChange={(date) => setSelectedDate(date)}
            onDateChange={(date) => setSelectedDate(date)}
          />

          <View className="flex-row justify-between items-center w-full">
            <View />

            <View className="w-[50%]">
              <CustomButton lab="Schedule" bg="#F47D7B" textColor="#fff" onPress={scheduleAppointment} />
            </View>
          </View>
        </View>
      </View>
      <BottomModal
        open={loading}
        loading={loading}
        text="Has successfully booked your appointment"
      />
    </Modal>
  );
};

export default MeetupDate;

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black background
  },
  container: {
    backgroundColor: "#F5FCFF",
    borderRadius: 10,
    padding: 20,
    margin: 20,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
