import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import background from '../assets/login page.jpg';
import axios from "axios";
const Auth = () => {
  const [Gmail, setGmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    console.log(Gmail);
    console.log(Password);
    if (!Gmail || !Password) {
          
           return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const {data}  = await axios.post(
        "http://localhost:5000/api/v1/Users/login",
        { Gmail:Gmail, Password:Password },
        config
      );
      console.log(data);
      console.log(JSON.stringify(data))
      let admin = Gmail.substring(0, 5);
      let student = Gmail.substring(0, 2);
      let rollno = Gmail.substring(0, 8);
      if (admin === "Admin") {
        navigate("/adminD");
      }
      else if (student == "21") {
        console.log(rollno);
        navigate(`/studentD?rollno=${rollno}`);
      }
      else {
        navigate("/facultyD");
      }
      
    }catch (error) {
      console.log(error);
    }

  }
  const SignUp = () => {
    navigate('/Signup');
  }
    return (

     <div>

      <div className="h-screen overflow-hidden"> 
        <img src={background} alt="Background" className="w-full h-full object-cover fixed top-0 left-0 z-0" />
        <div className="absolute top-0 left-0 flex flex-col justify-center ml-60 h-full z-10" > 
          <form onSubmit={handleSubmit}  className="flex flex-col pt-3 md:pt-8" >
                                <div className="flex flex-col pt-4">
                                    <label htmlFor="email" className="text-lg">Email</label>
                <input
                  onChange={(e)=>setGmail(e.target.value)}
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="your@email.com"
                                        
                                        
                                        className="shadow appearance-none border rounded w-full py-2 px-3
                                         text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>

                                <div className="flex flex-col pt-4">
                                    <label htmlFor="password" className="text-lg">Password</label>
                <input
                  onChange={(e)=>setPassword(e.target.value)}
                                        type="password"
                                        id="password"
                                        placeholder="Password"
                                        
                                       
                                        name="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                
                                <input

                                    type="submit"
                                    value="Log In"
                                    className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
                                />
            </form>
            <a className=" hover:underline cursor-pointer" onClick={SignUp}>New User ? Register</a>
          
        </div>
        
      </div>  
    
    </div>




        
        
    );
};

export default Auth;