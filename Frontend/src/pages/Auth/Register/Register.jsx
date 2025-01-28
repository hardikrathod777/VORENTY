import { useState } from "react";
import "./register.css";
import RG from "../../../assets/images/cover/Sign up-rafiki.png";
import { UserDataRegistration } from "../../../Service/Api/api";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { auth, googleAuthProvider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";
const baseUrl = import.meta.env.VITE_BASE_URL;

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [registrationError, setRegistrationError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setAgreeTerms(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!phone.trim()) newErrors.phone = "Phone is required.";
    if (!password.trim()) newErrors.password = "Password is required.";
    if (!agreeTerms)
      newErrors.agreeTerms = "You must agree to the terms and conditions.";
    return newErrors;
  };


  const handleRegister = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      toast.error("Please fill out all required fields.");
    } else {
      const registrationData = {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Phone: phone,
        Password: password,
      };
      console.log("Sending registration data:", registrationData);

      UserDataRegistration(
        registrationData,
        setRegistrationError,
        resetForm,
        navigate
      );
    }
  };


  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;

      const userData = {
        firstName: user.displayName.split(" ")[0],
        lastName: user.displayName.split(" ")[1] || "",
        email: user.email,
        phoneNumber: user.phoneNumber || "1425639685",
        profileImg: user.photoURL,
      };
      
      const response = await fetch(`${baseUrl}/auth/google-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success("Login successful!");
        console.log("Backend response:", data);
        navigate("/home");
      } else {
        toast.error("Failed to log in.");
      }
    } catch (err) {
      console.error("Error during Google sign-in:", err);
      toast.error("An error occurred during login.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-img">
        <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">
          <div className="grid w-full max-w-4xl gap-8 rounded-2xl bg-white p-8 shadow-lg md:grid-cols-2">
            {/* Left Side - Register Form */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-2">
                <div className="flex h-[40px] w-full items-center">
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#37B5FF]">VORANTY</h1>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Register Account
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Your data will be in INDIA data center.
                </p>

                {/* First Name Input */}
                <input
                  type="text"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`h-12 w-full px-4 border rounded-md focus:outline-none focus:ring-2 ${errors.firstName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                    }`}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName}</p>
                )}

                {/* Last Name Input */}
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`h-12 w-full px-4 border rounded-md focus:outline-none focus:ring-2 ${errors.lastName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                    }`}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName}</p>
                )}

                {/* Email Input */}
                <input
                  name="email"
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`h-12 w-full px-4 border rounded-md focus:outline-none focus:ring-2 ${errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                    }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}

                {/* Phone Input */}
                <input
                  name="phone"
                  type="number"
                  placeholder="Enter Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`h-12 w-full px-4 border rounded-md focus:outline-none focus:ring-2 ${errors.phone
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                    }`}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}

                {/* Password Input */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`h-12 w-full px-4 pr-10 border rounded-md focus:outline-none focus:ring-2 ${errors?.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                      }`}
                  />
                  {/* Eye Icon */}
                  <div
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaEye className="text-gray-500 hover:text-gray-700" />
                    ) : (
                      <FaEyeSlash className="text-gray-500 hover:text-gray-700" />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}

                {/* Terms and Conditions Checkbox */}
                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="terms" className="text-gray-600 text-sm">
                    I agree to the{" "}
                    <span className="text-blue-500">Terms of Service</span> and{" "}
                    <span className="text-blue-500">Privacy Policy</span>.
                  </label>
                </div>
                {errors.agreeTerms && (
                  <p className="text-sm text-red-500">{errors.agreeTerms}</p>
                )}

                {/* Register Button */}
                <button
                  onClick={handleRegister}
                  className="h-12 w-full bg-[#37B5FF] text-white rounded-md hover:bg-[#26b0ff] focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Register
                </button>
                {registrationError && (
                  <p className="text-sm text-red-500 mt-2">{registrationError}</p>
                )}

                {/* Login Link */}
                <div className="text-center text-sm sm:text-base">
                  {"Already have an account? "}
                  <Link to="/login" className="text-blue-500 hover:underline">
                    Login now
                  </Link>
                </div>

                {/* Google Sign Up Button */}
                <div className="flex justify-center">
                  <button
                    className="flex items-center gap-2 justify-center p-2 w-1/2 border border-black rounded-md"
                    onClick={handleGoogleLogin}>
                    <FcGoogle className="h-5 w-5" />
                    <span>Sign in with Google</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="md:block">
              <div className="relative">
                <img
                  src={RG}
                  alt="Right Side Image"
                  className="w-full"
                  style={{ marginTop: "90px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
