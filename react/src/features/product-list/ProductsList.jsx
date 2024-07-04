import React from "react";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductAsync,
  fetchProductAsyncFilter,
  fetchProductAsyncSort,
  fetchProductPage,
} from "../product-list/productSlice";
// import ProductsList from "./ProductsList";
import { AnimatePresence, motion } from "framer-motion";
function ProductsList() {
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold tracking-tight text-white item -translate-x-[80%] mb-16">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <AnimatePresence>
            {newproducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                className=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80"> */}
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
                {/* </div> */}
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm  text-white">
                      <a href={product.thumbnail}>
                        <span aria-hidden="true" className=" " />
                        {product.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-white">
                      {product.discountPercentage}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-white">
                    {product.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="join mt-24">
          <button
            className="join-item btn"
            onClick={() => {
              if (page > 1) {
                dispatch(fetchProductPage(page - 1));
                setPage(page - 1);
              }
            }}
          >
            «
          </button>
          <button className="join-item btn">Page {page}</button>
          <button
            className="join-item btn"
            onClick={() => {
              if (page < 5) {
                dispatch(fetchProductPage(page + 1));
                setPage(page + 1);
              }
            }}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
