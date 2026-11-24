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

import {
    validateConfirmPassword,
    validateEmail,
    validateName,
    validateRegisterPassword,
} from "../utils/validators";

type Props = {
  onNavigateLogin: () => void;
  onRegisterSuccess: (email: string, password: string) => void;
};

export default function RegisterScreen({
  onNavigateLogin,
  onRegisterSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = () => {
    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validateRegisterPassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
    };

    setErrors(newErrors);

    if (
      newErrors.name ||
      newErrors.email ||
      newErrors.password ||
      newErrors.confirmPassword ||
      !agree
    ) {
      return;
    }

    setSuccessMessage("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onRegisterSuccess(email.trim(), password);
    }, 1500);
  };

  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    password !== "" &&
    confirmPassword !== "" &&
    agree &&
    !validateName(name) &&
    !validateEmail(email) &&
    !validateRegisterPassword(password) &&
    !validateConfirmPassword(password, confirmPassword);

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

          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us and get started today</Text>
        </View>

        <View style={styles.form}>
          {successMessage ? (
            <View style={styles.successBox}>
              <Text style={styles.successTitle}>✓ Registrasi Berhasil!</Text>
              <Text style={styles.successText}>{successMessage}</Text>

              <TouchableOpacity
                style={styles.loginNowButton}
                onPress={onNavigateLogin}
              >
                <Text style={styles.loginNowText}>Login Sekarang</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={[
              styles.input,
              focused === "name" && styles.focusedInput,
              errors.name && styles.errorInput,
            ]}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
            autoCapitalize="words"
            value={name}
            onChangeText={(value) => {
              setName(value);
              setErrors((prev) => ({
                ...prev,
                name: validateName(value),
              }));
            }}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused("")}
          />
          {errors.name ? (
            <Text style={styles.errorText}>{errors.name}</Text>
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
            placeholder="Create a password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={(value) => {
              setPassword(value);
              setErrors((prev) => ({
                ...prev,
                password: validateRegisterPassword(value),
                confirmPassword: confirmPassword
                  ? validateConfirmPassword(value, confirmPassword)
                  : "",
              }));
            }}
            onFocus={() => setFocused("password")}
            onBlur={() => setFocused("")}
          />
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={[
              styles.input,
              focused === "confirmPassword" && styles.focusedInput,
              errors.confirmPassword && styles.errorInput,
            ]}
            placeholder="Confirm your password"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(value) => {
              setConfirmPassword(value);
              setErrors((prev) => ({
                ...prev,
                confirmPassword: validateConfirmPassword(password, value),
              }));
            }}
            onFocus={() => setFocused("confirmPassword")}
            onBlur={() => setFocused("")}
          />
          {errors.confirmPassword ? (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          ) : null}

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setAgree(!agree)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, agree && styles.checkedBox]}>
              {agree && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxText}>
              I agree with Terms & Conditions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              (!isFormValid || isLoading) && styles.disabledButton,
            ]}
            onPress={handleRegister}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={onNavigateLogin}>
              <Text style={styles.link}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FFFC",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 28,
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 65,
    height: 65,
    borderRadius: 20,
    backgroundColor: "#00B894",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  logoText: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#263A35",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 8,
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#263A35",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    backgroundColor: "#fff",
    color: "#263A35",
  },
  focusedInput: {
    borderColor: "#00B894",
    borderWidth: 1.5,
  },
  errorInput: {
    borderColor: "#F44336",
  },
  errorText: {
    color: "#F44336",
    fontSize: 12,
    marginTop: 5,
  },
  successBox: {
    backgroundColor: "#E8F8F2",
    borderColor: "#00B894",
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  successTitle: {
    color: "#008F70",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  successText: {
    color: "#35665A",
    fontSize: 13,
    lineHeight: 20,
  },
  loginNowButton: {
    backgroundColor: "#00B894",
    padding: 12,
    borderRadius: 9,
    alignItems: "center",
    marginTop: 12,
  },
  loginNowText: {
    color: "#fff",
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "#BDBDBD",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: "#00B894",
    borderColor: "#00B894",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  checkboxText: {
    color: "#555",
    fontSize: 13,
  },
  button: {
    height: 53,
    backgroundColor: "#00B894",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  disabledButton: {
    opacity: 0.45,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  footerText: {
    color: "#777",
    fontSize: 14,
  },
  link: {
    color: "#00B894",
    fontWeight: "bold",
    fontSize: 14,
  },
});
