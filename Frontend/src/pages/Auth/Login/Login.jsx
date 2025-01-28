import { useState, useEffect } from "react";
import "./login.css";
import { FcGoogle } from "react-icons/fc";
import sliderImg1 from "../../../assets/images/cover/Sign up-bro.png";
import sliderImg2 from "../../../assets/images/cover/Mobile login-bro.png";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../../Service/Api/api";
import { auth, googleAuthProvider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";
import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = import.meta.env.VITE_BASE_URL;


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [inputErrors, setInputErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const slides = [
    {
      title: "MFA for all accounts",
      description:
        "Secure online accounts with OneAuth 2FA. Back up OTP secrets and never lose access to your accounts.",
      image: sliderImg1,
    },
    {
      title: "Passwordless sign-in",
      description:
        "Move away from risky passwords and experience one-tap access to Zoho. Download and install OneAuth.",
      image: sliderImg2,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please fill in all required fields.")
      return;
    }

    const loginData = {
      Email: email,
      Password: password,
    };

    userLogin(loginData, setError, navigate);
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
            {/* Left Side - Sign In Form */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-2">
                <div className="flex h-[40px] w-full items-center">
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#37B5FF]">VORANTY</h1>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Login</h2>
                <p className="text-sm sm:text-base text-gray-600">
                  to access Voranty
                </p>
                <input
                  type="text"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`h-12 w-full px-4 border rounded-md focus:outline-none ${inputErrors.email ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {inputErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {inputErrors.email}
                  </p>
                )}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`h-12 w-full px-4 pr-10 border rounded-md focus:outline-none ${inputErrors.password
                      ? "border-red-500"
                      : "border-gray-300"
                      }`}
                  />

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
                {inputErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {inputErrors.password}
                  </p>
                )}
                <Link
                  to="/forgotPassword"
                  className="text-blue-500 text-sm sm:text-base flex justify-end hover:underline mt-2"
                >
                  Forgot Password?
                </Link>
                {error && <p className="text-red-500">{error}</p>}
                <button
                  onClick={handleLogin}
                  className="h-12 w-full bg-[#37B5FF] text-white rounded-md hover:bg-[#26b0ff] focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Log In
                </button>
                {/* <DarkGradientButton label="Log In" onClick={handleLogin} icon={<FaSignInAlt className="h-5 w-5 mr-2" />} /> */}
              </div>

              <div className="text-center text-sm sm:text-base">
                {"Don't have an account? "}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Sign up now
                </Link>
              </div>
              <div className="flex justify-center">
                <button
                className="flex items-center gap-2 justify-center p-2 w-1/2 border border-black rounded-md"
                  onClick={handleGoogleLogin}>
                    <FcGoogle className="h-5 w-5" />
                    <span>Sign in with Google</span>
                </button>
              </div>

            </div>

            {/* Right Side - Carousel */}
            <div className="hidden md:block">
              <div className="overflow-hidden relative w-full">
                <div className="relative h-70 sm:h-80 md:h-[500px] overflow-hidden rounded-lg">
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className={`duration-3000 ease-in-out ${index === currentSlide ? "block" : "hidden"
                        }`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="block w-[350px] mx-auto"
                      />
                      <h1 className="mt-5 text-center font-bold text-md sm:text-lg">
                        {slide.title}
                      </h1>
                      <p className="text-sm text-center mx-12 sm:text-base">
                        {slide.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Slider indicators */}
                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-[#37B5FF]" : "bg-gray-300"
                        }`}
                      aria-label={`Slide ${index + 1}`}
                    ></button>
                  ))}
                </div>
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

export default Login;
