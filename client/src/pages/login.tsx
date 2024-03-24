import React, { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make API call to login endpoint using Axios
      const response = await axios.post('http://localhost:3333/auth/login', {
        email: email,
        password: password,
      });

      // Check if the API call was successful
      if (response.status === 201) {
        // Redirect user to the dashboard page
        router.push("/dashboard");
      } else {
        // Handle error response from the API
        console.error('Login failed:', response.data);
        // You can display an error message to the user or perform other actions
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error occurred while logging in:', error);
      // You can display an error message to the user or perform other actions
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
