import { useState } from "react";
import { StyleSheet, View } from "react-native";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState<"login" | "register">(
    "login",
  );
  const [registeredAccount, setRegisteredAccount] = useState({
    email: "",
    password: "",
  });
  const [registrationMessage, setRegistrationMessage] = useState("");

  const handleRegisterSuccess = (email: string, password: string) => {
    setRegisteredAccount({ email, password });
    setRegistrationMessage("Registrasi berhasil! Silakan login.");
    setCurrentScreen("login");
  };

  return (
    <View style={styles.container}>
      {currentScreen === "login" ? (
        <LoginScreen
          onNavigateRegister={() => {
            setRegistrationMessage("");
            setCurrentScreen("register");
          }}
          registeredEmail={registeredAccount.email}
          registeredPassword={registeredAccount.password}
          registrationMessage={registrationMessage}
        />
      ) : (
        <RegisterScreen
          onNavigateLogin={() => setCurrentScreen("login")}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
