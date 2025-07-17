import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-2 text-center">Hey there Welcome Back</h2>
        <p className="text-gray-600 text-center text-sm">Enter your Email and password to login or login with Google </p>
        <form onSubmit={handleLogin} className="space-y-4 mt-5">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full py-2 text-white bg-gray-900 hover:bg-gray-600 rounded-md">
            Login
          </button>

        </form>
         <div className="flex flex-col items-center mt-6">
         <p className="center">  or login with</p> 
         <button   onClick={handleGoogleLogin}
         className="flex items-center gap-2 border-2 border-gray-300 font-semibold py-1 px-6 rounded-lg mt-3"> <FcGoogle size={24} />Google</button>
         </div>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        <p className="text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;