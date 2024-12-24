import  { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Guest from './Components/Layouts/Guest';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Home from './Pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from './utils/getCookie';
import { finishLoading, login } from './store/authSlice';
import ProtectedRoute from './Components/Layouts/ProtectedRoute';
import GlobalLayout from './Components/Layouts/GlobalLayout';
import { RootState } from './store';
import { Spin } from 'antd';


function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);


  useEffect(() => {
    const userId = getCookie('user_id');
    if (userId) {
      dispatch(login(userId));
    } else {
      dispatch(finishLoading())
    }
  }, [dispatch]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <Spin size="large" tip="Loading..." />
    </div>
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GlobalLayout />}>
          <Route index element={<ProtectedRoute children={<Home />} />} />
          <Route path="auth/" element={<Guest />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>

  );
}

export default App;