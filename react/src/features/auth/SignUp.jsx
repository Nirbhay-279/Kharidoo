import React, { useEffect } from "react";
import Lottie from "lottie-react";
import loginanimation from "../../assests/login.json";
import Logo from "../../Component/Logofullsize";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CreateUser } from "./authSlice";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(CreateUser(data));
    navigate("/products");
  };
  return (
    <div className=" h-[1200px] bg-neutral">
      <div className="flex flex-row items-center justify-center">
        <Lottie
          className="w-[40%] ml-[10%] hidden md:block "
          animationData={loginanimation}
          loop={true}
        />
        <div className="flex min-h-full flex-col justify-center px-6 py-12  flex-grow">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center items-center">
            <Logo className=""></Logo>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight  text-white">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm font-medium leading-6 text-white">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                        message: "Entered value does not match email format",
                      },
                    })}
                    className="text-black block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset :text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && (
                    <div className="alert alert-error mt-3">
                      <span>{errors.email.message}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-white">
                    Password
                  </label>
                </div>

                <div className="mt-2">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                        message:
                          "The password must be at least 8 characters long at least one digit at least one lowercase letter at least one uppercase letter at least one special character",
                      },
                    })}
                    className="text-black block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="password"
                  />
                  {errors.password && (
                    <div className="alert alert-error mt-3">
                      <span>{errors.password.message}</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-white">
                    Confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    {...register("confirmpassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    type="password"
                    className="text-black block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.confirmpassword && (
                    <div className="alert alert-error mt-3">
                      <span>{errors.confirmpassword.message}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log In
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-white">
              Already a member?
              <a
                href="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login in now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
