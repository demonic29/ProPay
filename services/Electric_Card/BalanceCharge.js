import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Modal,
  } from "react-native";
  import React, { useState, useRef } from "react";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import { useWindowDimensions } from "react-native";
  import Header from "../../components/Header";
  import HeaderImg from "../../components/HeaderImg";
  import FooterBtn from "../../components/FooterBtn";
  
  const BalanceCharge = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
  
    // Charge Amounts
    const [amount, setAmount] = useState([
      "1000",
      "2000",
      "3000",
      "4000",
      "5000",
      "10000",
    ]);
  
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
  
    const animatedValues = useRef(
      amount.reduce((acc, item) => {
        acc[item] = new Animated.Value(1);
        return acc;
      }, {})
    ).current;
  
    const toggleAmountSelection = (amount) => {
      setSelectedAmount((prevSelectedAmount) =>
        prevSelectedAmount === amount ? null : amount
      );
      animateSelection(amount);
    };
  
    const animateSelection = (amount) => {
      Animated.timing(animatedValues[amount], {
        toValue: selectedAmount === amount ? 1 : 1.1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(animatedValues[amount], {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    };
  
    const showDialog = () => {
      setDialogVisible(true);
      Animated.parallel([
        Animated.timing(dialogScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dialogOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    };
  
    const hideDialog = () => {
      Animated.parallel([
        Animated.timing(dialogScale, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dialogOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setDialogVisible(false);
      });
    };
  
    const dialogScale = useRef(new Animated.Value(0.8)).current;
    const dialogOpacity = useRef(new Animated.Value(0)).current;
  
    return (
      <View style={styles.container}>
        {/* Header */}
        <Header navigation={() => navigation.navigate("FAQ")} />
  
        {/* Main Image */}
        <HeaderImg img={require("../imgs/5.png")} />
  
        <View style={{ marginTop: 20 }}>
          {/* Charge Amount */}
          <View style={styles.amountContainer}>
            {amount.map((item) => {
              const isSelected = selectedAmount === item;
              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => toggleAmountSelection(item)}
                >
                  <Animated.Text
                    style={[
                      styles.amountText,
                      isSelected && styles.selectedAmountText,
                      { transform: [{ scale: animatedValues[item] }] },
                    ]}
                  >
                    {item}
                  </Animated.Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
  
        {/* Footer Button */}
        <FooterBtn title={"Charge PayPro Card"} navigation={showDialog} />
  
        {/* Confirm Dialog */}
        <Modal
          transparent={true}
          visible={dialogVisible}
          onRequestClose={hideDialog}
          animationType="none"
        >
          <View style={styles.modalBackground}>
            <Animated.View
              style={[
                styles.dialogContainer,
                {
                  transform: [{ scale: dialogScale }],
                  opacity: dialogOpacity,
                },
              ]}
            >
              <Text style={styles.dialogTitle}>Confirm Dialog</Text>
              <Text style={styles.dialogMessage}>
                Are you sure about that?
              </Text>
              <View style={styles.dialogButtons}>
                <TouchableOpacity
                  style={styles.dialogButton}
                  onPress={() => {
                    hideDialog();
                    navigation.navigate("ChargeSuccess");
                  }}
                >
                  <Text style={styles.dialogButtonText}>YES</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dialogButton}
                  onPress={hideDialog}
                >
                  <Text style={styles.dialogButtonText}>NO</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </Modal>
      </View>
    );
  };
  
  export default BalanceCharge;
  
  const styles = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: "#fff",
    },
    cancelBtn : {
        paddingHorizontal: 40,
        paddingVertical :10,
        borderRadius: 5,
        backgroundColor: "#606060",
    },
    amountContainer: {
      gap: 20,
      paddingHorizontal: 10,
      justifyContent: "center",
    },
    amountText: {
      borderWidth: 1,
      borderColor: "#6EBAD0",
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 5,
      color: "#000",
    },
    selectedAmountText: {
      backgroundColor: "#6EBAD0",
      color: "#fff",
    },
    modalBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    dialogContainer: {
      width: "80%",
      padding: 20,
      backgroundColor: "#fff",
      borderRadius: 10,
      alignItems: "center",
    },
    dialogTitle: {
      fontSize: 25,
      fontFamily : 'Poppins-Bold',
    
      marginBottom: 10,
    },
    dialogMessage: {
      fontSize: 12,
      marginBottom: 20,
      fontFamily : 'Poppins-Regular',
      color : '#707070'
    },
    dialogButtons: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
    },
    dialogButton: {
        paddingHorizontal: 40,
        paddingVertical :10,
      borderRadius: 5,
      backgroundColor: "#6EBAD0",
    },
    dialogButtonText: {
      color: "#fff",
    },
  });
  