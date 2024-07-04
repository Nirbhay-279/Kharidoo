import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { GetCart } from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Example() {
  const newproducts = useSelector((state) => state.cart.items);
  const [open, setOpen] = useState(true);
  const [total, settotal] = useState();
  useEffect(() => {
    console.log(newproducts);
    var sum = newproducts.reduce((acc, item) => {
      return acc + item.product.price;
    }, 0);
    console.log(sum);
    settotal(sum);
  }, [newproducts]);

  return (
    <div className="">
      <div className="flex flex-col h-full  bg-neutral shadow-xl text-white">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <h1 className="text-lg font-medium ">Shopping cart</h1>
            <div className="ml-3 flex h-7 items-center"></div>
          </div>

          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {newproducts.map((product,index) => (
                  <li key={index} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      {product.product.images ? (
                        <img
                          src={product.product.images[0]}
                          alt={product.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium ">
                          <h3>
                            <a href={product.product.thumbnail}>
                              {product.product.title}
                            </a>
                          </h3>
                          <p className="ml-4">${product.product.price}</p>
                        </div>
                        <p className="mt-1 text-sm  ">
                          {product.product.description}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="">Qty {product.quantity}</p>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium ">
            <p>Subtotal</p>
            <p>${total}</p>
          </div>
          <p className="mt-0.5 text-sm  ">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link to="/checkout">
              <a className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                Checkout
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
