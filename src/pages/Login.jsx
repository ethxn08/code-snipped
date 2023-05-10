import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const Login = () => {
  const firestore = getFirestore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(firestore, "users", userCredential.user.uid), {
          email: userCredential.user.email,
          snippets: [],
        });
        navigate("/");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>{isRegister ? "Register" : "Login"}</h2>
        <div className="label-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="label-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
        <div>
          {isRegister ? (
            <p onClick={() => setIsRegister(false)}>
              Already have an account? Login
            </p>
          ) : (
            <p onClick={() => setIsRegister(true)}>
              Don't have an account? Register
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
