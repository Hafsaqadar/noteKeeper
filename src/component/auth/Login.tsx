import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/config";
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Welcome Back</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
          <button type="submit" className="w-full py-2 text-white bg-gray-900 hover:bg-gray-600 rounded">
            Login
          </button>
          <div className="flex flex-col items-center">
         <p className="center">  or login with</p> 
         <button className="flex items-center gap-2 border-2 border-gray-300 font-semibold py-1 px-6 rounded-lg mt-3"> <FcGoogle size={24} />Google</button>
         </div>
        </form>
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