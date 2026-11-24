// Validasi format email
export const validateEmail = (email: string): string => {
  if (!email.trim()) {
    return "Email wajib diisi";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Masukkan alamat email yang valid";
  }

  return "";
};

// Validasi password untuk Login
export const validateLoginPassword = (password: string): string => {
  if (!password) {
    return "Password wajib diisi";
  }

  if (password.length < 6) {
    return "Password minimal 6 karakter";
  }

  return "";
};

// Validasi nama untuk Register
export const validateName = (name: string): string => {
  if (!name.trim()) {
    return "Nama lengkap wajib diisi";
  }

  if (name.trim().length < 3) {
    return "Nama minimal 3 karakter";
  }

  if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
    return "Nama tidak boleh menggunakan karakter khusus atau angka";
  }

  return "";
};

// Validasi password untuk Register
export const validateRegisterPassword = (password: string): string => {
  if (!password) {
    return "Password wajib diisi";
  }

  if (password.length < 8) {
    return "Password minimal 8 karakter";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password harus memiliki huruf kapital";
  }

  if (!/[0-9]/.test(password)) {
    return "Password harus memiliki angka";
  }

  return "";
};

// Validasi konfirmasi password
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
): string => {
  if (!confirmPassword) {
    return "Konfirmasi password wajib diisi";
  }

  if (password !== confirmPassword) {
    return "Password tidak cocok";
  }

  return "";
};
