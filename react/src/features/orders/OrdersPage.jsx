import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetOrders } from "./ordersSlice";

function OrderPage() {
  const user = useSelector((state) => state.users);
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetOrders(user.users.id));
    console.log(orders);
  }, []);
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        {orders.map((order) => {
          return (
            <div className="text-center">
              <p className="text-base font-semibold text-indigo-600">
                Order Successfully Placed
              </p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Order Number #{order.id}
              </h1>
              <div className="flex flex-col">
                    {order.items.map((item) => {
                      return (
                        <div class="mb-6 flex flex-col gap-4 sm:mb-8 md:gap-6">
                          <div class="flex flex-wrap gap-x-4 overflow-hidden rounded-lg border sm:gap-y-4 lg:gap-6 p-10">
                            <a
                              href="#"
                              class="group relative block h-48 w-32 overflow-hidden bg-gray-100 sm:h-56 sm:w-40"
                            >
                              <img
                                src={item.product.images[0]}
                                loading="lazy"
                                alt="Photo by Thái An"
                                class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110 "
                              />
                            </a>

                            <div class="flex flex-1 flex-col justify-between py-4 ">
                              <div className="flex flex-col">
                                <a class="mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">
                                  {item.product.title}
                                </a>
                                <a class="mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">
                                  Quantity: {item.product.quantity}
                                </a>
                              </div>

                              <div>
                                <span class="mb-1 block font-bold text-gray-800 md:text-lg">
                                  ${item.product.price}
                                </span>

                                <span class="flex items-center gap-1 text-sm text-gray-500">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5 text-green-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  Placed Sucessfully
                                </span>
                              </div>
                            </div>

                            <div class="flex w-full justify-between border-t p-4 sm:w-auto sm:border-none sm:pl-0 lg:p-6 lg:pl-0">
                              <div class="ml-4 pt-3 md:ml-8 md:pt-2 lg:ml-16"></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div class=" w-full rounded-lg bg-gray-100 p-4 ">
                      <div class="flex items-start justify-between gap-4 text-gray-800">
                        <span class="text-lg font-bold">Total</span>
                        <span class="flex flex-col items-end">
                          <span class="text-lg font-bold">
                            ${order.totalAmount}
                          </span>
                          <span class="text-sm text-gray-500">
                            including VAT
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
              <div class="bg-white py-6 sm:py-8 lg:py-12">
                <div class="mx-auto max-w-screen-lg px-4 md:px-8">
                  <div class="mb-6 sm:mb-10 lg:mb-16">
                    <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
                      Your Cart
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
        </div>
      </main>
    </>
  );
}

export default OrderPage;
