/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import {useDispatch, useSelector}from 'react-redux'
import {signInStart,signInSuccess,signInFailure} from '../redux/user/userSlice'
import axios from "axios";
import OAuth from "../components/OAuth";
function Signin() {
  const [formData, setFormData] = useState({});
  const {loading,error:errorMessage} = useSelector(state =>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle errors
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields'))
    }

    try {
    dispatch(signInStart())
      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.data;
      if (data.success === false) {
        dispatch(signInFailure(data.message))
      }
      
      if (res.data) {
        dispatch(signInSuccess(data))
        navigate("/");
      }
    } catch (error) {
     dispatch(signInFailure(error.message))
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* LeftSide */}
        <div className="flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Abdelrahman's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign in your account here.
          </p>
        </div>
        {/* RightSide */}
        <div className="flex-1 ml-14">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <>
              <Label value="your email"></Label>
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </>
            <>
              <Label value="your password"></Label>
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
            </>
            <Button
              gradientDuoTone={"purpleToPink"}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size={"sm"} />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't Have an account? </span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5 text-center" color={"failure"}>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signin;
