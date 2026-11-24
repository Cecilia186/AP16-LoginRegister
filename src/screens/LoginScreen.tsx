import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { validateEmail, validateLoginPassword } from "../utils/validators";

type Props = {
  onNavigateRegister: () => void;
  registeredEmail: string;
  registeredPassword: string;
  registrationMessage: string;
};

export default function LoginScreen({
  onNavigateRegister,
  registeredEmail,
  registeredPassword,
  registrationMessage,
}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [focused, setFocused] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const handleLogin = () => {
    const emailError = validateEmail(email);
    const passwordError = validateLoginPassword(password);

    setErrors({ email: emailError, password: passwordError });
    setLoginMessage("");

    if (emailError || passwordError) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (
        registeredEmail &&
        email.trim().toLowerCase() === registeredEmail.trim().toLowerCase() &&
        password === registeredPassword
      ) {
        setLoginMessage("success");
      } else {
        setLoginMessage("error");
      }
    }, 1000);
  };

  const isFormValid =
    email.trim() !== "" &&
    password !== "" &&
    !validateEmail(email) &&
    !validateLoginPassword(password);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>A</Text>
          </View>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login to continue your journey</Text>
        </View>

        <View style={styles.form}>
          {registrationMessage ? (
            <View style={styles.notice}>
              <Text style={styles.successText}>{registrationMessage}</Text>
            </View>
          ) : null}

          {loginMessage === "success" ? (
            <View style={styles.notice}>
              <Text style={styles.successText}>
                ✓ Login Berhasil! Selamat datang.
              </Text>
            </View>
          ) : null}

          {loginMessage === "error" ? (
            <View style={styles.errorNotice}>
              <Text style={styles.errorNoticeText}>
                Email atau password salah. Periksa kembali data kamu.
              </Text>
            </View>
          ) : null}

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[
              styles.input,
              focused === "email" && styles.focusedInput,
              errors.email && styles.errorInput,
            ]}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              setLoginMessage("");
              setErrors((prev) => ({
                ...prev,
                email: validateEmail(value),
              }));
            }}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused("")}
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[
              styles.input,
              focused === "password" && styles.focusedInput,
              errors.password && styles.errorInput,
            ]}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={(value) => {
              setPassword(value);
              setLoginMessage("");
              setErrors((prev) => ({
                ...prev,
                password: validateLoginPassword(value),
              }));
            }}
            onFocus={() => setFocused("password")}
            onBlur={() => setFocused("")}
          />
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}

          <TouchableOpacity
            style={[
              styles.button,
              (!isFormValid || isLoading) && styles.disabledButton,
            ]}
            onPress={handleLogin}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={onNavigateRegister}>
              <Text style={styles.link}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FFFC" },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 28,
  },
  header: { alignItems: "center", marginBottom: 45 },
  logo: {
    width: 75,
    height: 75,
    borderRadius: 22,
    backgroundColor: "#00B894",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  logoText: { color: "#fff", fontSize: 38, fontWeight: "bold" },
  title: { fontSize: 28, fontWeight: "bold", color: "#263A35" },
  subtitle: { fontSize: 14, color: "#888", marginTop: 8 },
  form: { width: "100%" },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#263A35",
    marginBottom: 9,
    marginTop: 18,
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    backgroundColor: "#fff",
    color: "#263A35",
  },
  focusedInput: { borderColor: "#00B894", borderWidth: 1.5 },
  errorInput: { borderColor: "#F44336" },
  errorText: { color: "#F44336", fontSize: 12, marginTop: 6 },
  button: {
    height: 54,
    backgroundColor: "#00B894",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  disabledButton: { opacity: 0.45 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  footerText: { color: "#777", fontSize: 14 },
  link: { color: "#00B894", fontWeight: "bold", fontSize: 14 },
  notice: {
    backgroundColor: "#E8F8F2",
    borderWidth: 1,
    borderColor: "#00B894",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  successText: { color: "#008F70", fontSize: 13, fontWeight: "600" },
  errorNotice: {
    backgroundColor: "#FFF0F0",
    borderWidth: 1,
    borderColor: "#F44336",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  errorNoticeText: { color: "#C62828", fontSize: 13 },
});
