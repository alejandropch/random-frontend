import Button from '@/Components/ui/Button';
import Input from '@/Components/ui/Input';
import { RootState } from '@/store';
import { isAdmin } from '@/store/authSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const baseURL = "http://localhost:3000"
const Login = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate()
  const handleInputChange = (e: any) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent form from reloading the page
    try {
      const res = await axios.post(baseURL + "/api/auth/login", formData, { withCredentials: true });
      dispatch(isAdmin(res.data?.user_category === "admin"))
      navigate('/')
      setResponseMessage('Success');
    } catch (error: any) {
      setResponseMessage(`Error: ${error.response?.data?.message || "Something went wrong!"}`);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
     
    }
  }, [])

  return (
    <div className="flex flex-col justify-center items-center p-8 bg-white rounded-r-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign up</h1>
      <form className="w-72" onSubmit={handleSubmit}>
        <Input text={"Your Email"} type={"email"} id={"email"}
          value={formData.email} onChange={handleInputChange}
        />
        <Input text={"Password"} type={"password"} id={"password"}
          value={formData.password} onChange={handleInputChange} />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            checked={formData.remember}
            onChange={handleInputChange}
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>
        <Button text='Log in' type='submit' className='hover:bg-blue-600 bg-blue-500' />
      </form>
      <p className="mt-4 text-sm text-gray-500">Or login with</p>
      <div className="flex gap-4 mt-2">
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md">F</button>
        <button className="bg-blue-400 text-white py-2 px-4 rounded-md">T</button>
        <button className="bg-red-500 text-white py-2 px-4 rounded-md">G</button>
      </div>
      {<p className="mt-8 text-sm ">{responseMessage}</p>}
    </div>
  );
};

export default Login;
