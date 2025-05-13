import { View, Text, Modal, Image, StyleSheet, ModalProps } from "react-native";
import React, { ReactNode, useEffect, useState } from "react";
import { MotiView } from "moti";
// @ts-ignore
import logo from "@/assets/images/logo.png";
import CustomButton from "./CustomButton";

type Props = ModalProps & {
  children?: ReactNode;
  loading: boolean;
  text: string;
  open?: boolean;
  button?: ReactNode;
  lab?: string;
  bg?: string;
  onPress?: () => void;
};

const BottomModal = ({
  children,
  text = "is confirming your verification code",
  loading,
  //   onClose,
  open,
  button,
  bg,
  lab,
  onPress,
  ...modalProps
}: Props) => {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const onClose = () => {
    loading = false;
  };

  useEffect(() => {
    if (!loading) {
      // Show checkmark for 4 seconds after loading is done
      setShowCheckmark(true);
      const timer = setTimeout(() => {
        setShowCheckmark(false);
        onClose(); // Close the modal after showing the checkmark
      }, 4000);

      return () => clearTimeout(timer); // Clear the timer on unmount
    }
  }, [loading, onClose]);

  const renderIcon = () => {
    if (loading) {
      return (
        <View className="flex-1 justify-center items-center">
          <MotiView
            from={{ rotate: "0deg" }}
            animate={{ rotate: "360deg" }}
            transition={{
              type: "timing",
              loop: true,
              repeatReverse: false,
              duration: 2000,
            }}
            style={{ width: 50, height: 50 }} // Ensuring MotiView has consistent dimensions
          >
            <Image
              source={require("@/assets/images/loader.png")}
              style={{ width: 50, height: 50 }}
              resizeMode="contain"
            />
          </MotiView>
        </View>
      );
    } else if (showCheckmark) {
      return (
        <View className="flex-1 justify-center items-center">
          <Image
            source={require("@/assets/images/check.png")}
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
          />
        </View>
      );
    }
    return null;
  };

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
      {...modalProps}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.modalText}>RentStraight</Text>
          </View>
          {text && <Text style={styles.textContent}>{text}</Text>}
          <View style={[styles.iconContainer, { position: 'absolute', bottom: 20, right: 20 }]}>
            {renderIcon()}
          </View>
          {button && (
            <View style={styles.buttonContainer}>
              <CustomButton lab={lab} bg="#F47D7B" onPress={onPress} />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 300, // Ensure a minimum height for the modal
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  modalText: {
    fontSize: 24,
    color: "#111111",
    fontWeight: "600",
    fontFamily: "Montserrat-SemiBold",
  },
  textContent: {
    fontSize: 28,
    color: "#111111",
    fontFamily: "Montserrat-Regular",
    marginBottom: 20,
    textAlign: "center",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default BottomModal;
