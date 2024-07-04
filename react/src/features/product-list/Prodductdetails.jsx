import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import {
  fetchProductAsync,
  fetchProductAsyncFilter,
  fetchProductAsyncSort,
  fetchProductPage,
  fetchProductId,
} from "../product-list/productSlice";
import { AddToCart } from "../cart/cartSlice";
import { CheckUser } from "../auth/authSlice";
import { useParams } from "react-router-dom";
import Review from "../review/Review";
import "./test.css";
function Prodductdetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedproduct, status } = useSelector((state) => state.product);
  const { users } = useSelector((state) => state.users);
  const { items } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(fetchProductId(id));
    dispatch(CheckUser());
  }, []);
  if (status === "loading") {
    return <>....loading</>;
  }
  const handleAddToCart = (product) => {
    const oldproductsid = items.map((item) => {
      return { product: item.product.id };
    });
    console.log("YAAA PADHHHH +++++++++++");
    console.log(oldproductsid);
    dispatch(AddToCart({products:[...oldproductsid,{product:product.id}],quantity:1,user:users.id}));
  };

  return (
    <div className=" py-6 sm:py-8 md:w-[80%] lg:py-12  bg-base-300  bg-opacity-50 lg:translate-x-[10%] sm:w-[90%] sm:translate-x-[5%]  backdrop-filter backdrop-blur-lg">
      <div className="mx-auto  px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-primary">
              {selectedproduct.images && selectedproduct.images.length > 0 && (
                <img
                  src={selectedproduct.images[0]}
                  loading="lazy"
                  alt="Photo by Himanshu Dewangan"
                  className="h-full w-full object-cover object-center"
                />
              )}

              <span className="absolute left-0 top-0 rounded-br-lg bg-primary px-3 py-1.5 text-lg  font-bold uppercase tracking-wider  text-accent   shadow-lg">
                sale
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg bg-primary">
                {selectedproduct.images &&
                  selectedproduct.images.length > 0 && (
                    <img
                      src={selectedproduct.images[1]}
                      loading="lazy"
                      alt="Photo by Himanshu Dewangan"
                      className="h-full w-full object-cover object-center"
                    />
                  )}
              </div>

              <div className="overflow-hidden rounded-lg bg-primary">
                {selectedproduct.images &&
                  selectedproduct.images.length > 0 && (
                    <img
                      src={selectedproduct.images[2]}
                      loading="lazy"
                      alt="Photo by Himanshu Dewangan"
                      className="h-full w-full object-cover object-center"
                    />
                  )}
              </div>
            </div>
          </div>

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block ">
                {selectedproduct.brand}
              </span>
              <br></br>
              <h2 className=" font-bold  bg-gradient-to-t  text-3xl from-primary  to-secondary inline-block text-transparent bg-clip-text transition-colors  delay-75">
                {selectedproduct.title}
              </h2>
            </div>
            <div className="rating gap-1 ">
              <input
                type="radio"
                name="rating-3"
                className="mask mask-heart bg-red-400 text-primary"
                onClick={(e) => {
                  console.log(e.target.value);
                }}
              />
              <input
                type="radio"
                name="rating-3"
                className="mask mask-heart bg-orange-400 text-primary"
                onClick={(e) => {
                  console.log(e.target.value);
                }}
              />
              <input
                type="radio"
                name="rating-3"
                className="mask mask-heart bg-yellow-400 text-primary"
                onClick={(e) => {
                  console.log(e.target.value);
                }}
              />
              <input
                type="radio"
                name="rating-3"
                className="mask mask-heart bg-lime-400 text-primary"
                onClick={(e) => {
                  console.log(e.target.value);
                }}
              />
              <input
                type="radio"
                name="rating-3"
                className="mask mask-heart bg-green-400 text-primary"
                onClick={(e) => {
                  console.log(e.target.value);
                }}
              />
            </div>

            <div className="mb-4 md:mb-6">
              <span className="mb-3 inline-block text-sm font-semibold  md:text-base">
                Color
              </span>

              <div className="flex flex-wrap gap-2">
                <span className="h-8 w-8 rounded-full border bg-gray-800 ring-2 ring-gray-800 ring-offset-1 transition duration-100"></span>
                <button
                  type="button"
                  className="h-8 w-8 rounded-full border bg-gray-500 ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200"
                ></button>
                <button
                  type="button"
                  className="h-8 w-8 rounded-full border bg-gray-200 ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200"
                ></button>
                <button
                  type="button"
                  className="h-8 w-8 rounded-full border bg-secondary ring-2 ring-transparent ring-offset-1 transition duration-100 hover:ring-gray-200"
                ></button>
              </div>
            </div>

            <div className="mb-8 md:mb-10">
              <div className="join">
                <input
                  className="join-item btn  hover:bg-primary bg-secondary"
                  type="radio"
                  name="options"
                  aria-label="S"
                />
                <input
                  className="join-item btn hover:bg-primary bg-secondary "
                  type="radio"
                  name="options"
                  aria-label="M"
                />
                <input
                  className="join-item btn  hover:bg-primary bg-secondary"
                  type="radio"
                  name="options"
                  aria-label="L"
                />
                <input
                  className="join-item btn  hover:bg-primary bg-secondary "
                  type="radio"
                  name="options"
                  aria-label="XL"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-primary md:text-2xl">
                  $15.00
                </span>
                <span className="mb-0.5 text-red-500 line-through">$30.00</span>
              </div>

              <span className="text-sm ">incl. VAT plus shipping</span>
            </div>

            <div className="mb-6 flex items-center gap-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                />
              </svg>

              <span className="text-sm">2-4 day shipping</span>
            </div>

            <div className="flex gap-2.5">
              <a
                href="#"
                onClick={() => handleAddToCart({...selectedproduct,quantity:1,})}
                className="inline-block flex-1 rounded-lg bg-primary px-8 py-3 text-center text-sm font-semibold  outline-none  transition duration-100 hover:bg-secondary focus-visible:ring active:bg-primary sm:flex-none md:text-base"
              >
                Add to cart
              </a>

              <button className="btn bg-secondary hover:bg-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-10 md:mt-16 lg:mt-20">
              <div className="mb-3 text-lg font-semibold text-accent">
                Description
              </div>

              <p className="">
             {selectedproduct.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Review></Review>
    </div>
  );
}

export default Prodductdetails;
