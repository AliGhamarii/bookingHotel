import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full h-[700px] flex justify-center items-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="flex flex-col max-w-md w-full bg-white p-10 rounded-3xl shadow-xl">
        <h2 className="text-center font-bold text-2xl mb-6 text-gray-800">
          Welcome back
        </h2>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col mb-5">
            <label
              htmlFor="email"
              className="text-gray-600 mb-2 cursor-pointer"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 py-2 px-4 rounded-lg cursor-pointer focus:ring-1 focus:ring-blue-500 outline-0 transition"
              placeholder="Enter your Email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-gray-600 mb-2 cursor-pointer"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 py-2 px-4 rounded-lg cursor-pointer focus:ring-1 focus:ring-blue-500 outline-0 transition"
              placeholder="Enter your password..."
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <p className="text-blue-500 cursor-pointer hover:underline text-sm">
                Forgot password?
              </p>
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white w-full max-w-md py-2 mt-4 cursor-pointer transition duration-300 rounded-lg shadow-2xl font-semibold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
