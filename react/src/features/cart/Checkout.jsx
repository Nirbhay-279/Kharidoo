import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import { UpdateUser, CheckUser } from "../auth/authSlice";
import { GetOrders, CreateOrders } from "../orders/ordersSlice";
import { ClearCart, GetCart } from "./cartSlice";

function Checkout() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.users) || { addresses: [] };
  const items = useSelector((state) => state.cart.items);
  const status = useSelector((state) => state.cart.status);

  const totalAmount = items.reduce(
    (amount, item) => item.product.price + amount,
    0
  );
  const totalItems = items.reduce((total, item) =>  total +1, 0);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleQuantity = (e, item) => {};

  const handleRemove = (e, id) => {};

  const handleAddress = (e) => {
    console.log(e.target.value);
    setSelectedAddress(user.users.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  const handleOrder = async (e) => {
    const order = {
      items,
      totalAmount,
      totalItems,
      user: user.users.id,
      paymentMethod,
      selectedAddress,
      status: "pending", // other status can be delivered, received.
    };
    await dispatch(CreateOrders(order));
    console.log(order);
    await dispatch(GetOrders(user.users.id));
    await dispatch(GetOrders(user.users.id));
    await dispatch(ClearCart(user.users.id));
    
  };

  return (
    <>
      {status === "loading" ? (
        <h1>lodaing</h1>
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              {/* This form is for address */}
              <form
                className="   px-5 py-12 mt-12"
                noValidate
                onSubmit={handleSubmit((data) => {
                  console.log({
                    ...user,
                    addresses: user.users.addresses
                      ? [...user.users.addresses, data]
                      : [data],
                  });
                  dispatch(
                    UpdateUser({
                      ...user,
                      addresses: user.users.addresses
                        ? [...user.users.addresses, data]
                        : [data],
                    })
                  );
                  dispatch(CheckUser());
                  reset();
                  dispatch(CheckUser());
                })}
              >
                <div className="space-y-12">
                  <div className="border-b border-gray   /10 pb-12">
                    <h2 className="text-2xl font-semibold leading-7 ">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 ">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6     "
                        >
                          Full name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("name", {
                              required: "name is required",
                            })}
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5      shadow-sm ring-1 ring-inset ring-gray-300 placeholder: -400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.name && (
                            <p className="text-red   ">{errors.name.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6     "
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "email is required",
                            })}
                            type="email"
                            className="block w-full rounded-md border-0 py-1.5      shadow-sm ring-1 ring-inset ring-gray-300 placeholder: -400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.email && (
                            <p className="text-red   ">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium leading-6     "
                        >
                          Phone
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            {...register("phone", {
                              required: "phone is required",
                            })}
                            type="tel"
                            className="block w-full rounded-md border-0 py-1.5      shadow-sm ring-1 ring-inset ring-gray-300 placeholder: -400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.phone && (
                            <p className="text-red   ">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium leading-6     "
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street", {
                              required: "street is required",
                            })}
                            id="street"
                            className="block w-full rounded-md border-0 py-1.5      shadow-sm ring-1 ring-inset ring-gray-300 placeholder: -400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.street && (
                            <p className="text-red   ">
                              {errors.street.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6     "
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              required: "city is required",
                            })}
                            id="city"
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5      shadow-sm ring-1 ring-inset ring-gray-300 placeholder: -400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.city && (
                            <p className="text-red   ">{errors.city.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium leading-6     "
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", {
                              required: "state is required",
                            })}
                            id="state"
                            autoComplete="address-level1"
                            className="block w-full rounded-md border-0 py-1.5      shadow-sm ring-1 ring-inset ring-gray-300 placeholder: -400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.state && (
                            <p className="text-red   ">
                              {errors.state.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="pinCode"
                          className="block text-sm font-medium leading-6     "
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("pinCode", {
                              required: "pinCode is required",
                            })}
                            id="pinCode"
                            className="block w-full rounded-md border-0 py-1.5      shadow-sm ring-1 ring-inset ring-gray-300 placeholder: -400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.pinCode && (
                            <p className="text-red   ">
                              {errors.pinCode.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      onClick={(e) => reset()}
                      type="button"
                      className="text-sm font-semibold leading-6     "
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </form>
              <div className="border-b border-gray   /10 pb-12">
                <h2 className="text-base font-semibold leading-7     ">
                  Addresses
                </h2>
                <p className="mt-1 text-sm leading-6  -600">
                  Choose from Existing addresses
                </p>
                <ul>
                  {user.users.addresses &&
                    user.users.addresses.map((address, index) => (
                      <li
                        key={index}
                        className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                      >
                        <div className="flex gap-x-4">
                          <input
                            onChange={handleAddress}
                            name="address"
                            type="radio"
                            value={index}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6     ">
                              {address.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5     ">
                              {address.street}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5     ">
                              {address.pinCode}
                            </p>
                          </div>
                        </div>
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6     ">
                            Phone: {address.phone}
                          </p>
                          <p className="text-sm leading-6     ">
                            {address.city}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>

                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6     ">
                      Payment Methods
                    </legend>
                    <p className="mt-1 text-sm leading-6  -600">Choose One</p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="cash"
                          name="payments"
                          onChange={handlePayment}
                          value="cash"
                          type="radio"
                          checked={paymentMethod === "cash"}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="cash"
                          className="block text-sm font-medium leading-6     "
                        >
                          Cash
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="card"
                          onChange={handlePayment}
                          name="payments"
                          checked={paymentMethod === "card"}
                          value="card"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="card"
                          className="block text-sm font-medium leading-6     "
                        >
                          Card Payment
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="mx-auto mt-12    max-w-7xl px-2 sm:px-2 lg:px-4">
                <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
                  <h1 className="text-4xl my-5 font-bold tracking-tight     ">
                    Cart
                  </h1>
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium     ">
                                <h3>
                                  <a href={item.product.id}>
                                    {item.product.title}
                                  </a>
                                </h3>
                                <p className="ml-4">${item.product.price}</p>
                              </div>
                              <p className="mt-1 text-sm     ">
                                {item.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="    ">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-5 text-sm font-medium leading-6     "
                                >
                                  Qty
                                </label>
                                <select
                                  onChange={(e) => handleQuantity(e, item)}
                                  value={item.quantity}
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                              </div>

                              <div className="flex">
                                <button
                                  onClick={(e) => handleRemove(e, item.id)}
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo   "
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

                <div className="border-t border-gray-200 px-2 py-6 sm:px-2">
                  <div className="flex justify-between my-2 text-base font-medium     ">
                    <p>Subtotal</p>
                    <p>$ {totalAmount}</p>
                  </div>
                  <div className="flex justify-between my-2 text-base font-medium     ">
                    <p>Total Items in Cart</p>
                    <p>{totalItems} items</p>
                  </div>
                  <p className="mt-0.5 text-sm     ">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <button
                      className="btn bg-primary"
                      onClick={async () => {
                        if (selectedAddress && paymentMethod&&totalItems!==0) {
                          await handleOrder();
                          document.getElementById("my_modal").showModal();
                        } else {
                          document.getElementById("error_modal").showModal();
                        }
                      }}
                    >
                      Order NOW
                    </button>

                    <dialog id="my_modal" className="modal">
                      <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg">Order Placed</h3>
                        <p className="py-4">Your Order is Place :)</p>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn bg-primary">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>

                    <dialog id="error_modal" className="modal">
                      <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg">
                          Please Enter Address and Payment method and add some items to cart
                        </h3>
                        <p className="py-4"></p>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn bg-primary">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm     ">
                    <p>
                      or
                      <Link to="/">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo   "
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
