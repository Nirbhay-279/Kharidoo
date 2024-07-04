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
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const sortOptions = [
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "smartphones", label: "Smartphones", checked: false },
      { value: "laptops", label: "Laptops", checked: false },
      { value: "fragrances", label: "Fragrances", checked: false },
      { value: "skincare", label: "Skincare", checked: false },
      { value: "groceries", label: "Groceries", checked: false },
      { value: "home-decoration", label: "Home Decoration", checked: false },
      { value: "furniture", label: "Furniture", checked: false },
      { value: "tops", label: "Tops", checked: false },
      { value: "womens-dresses", label: "Women's Dresses", checked: false },
      { value: "womens-shoes", label: "Women's Shoes", checked: false },
      { value: "mens-shirts", label: "Men's Shirts", checked: false },
      { value: "mens-shoes", label: "Men's Shoes", checked: false },
      { value: "mens-watches", label: "Men's Watches", checked: false },
      { value: "womens-watches", label: "Women's Watches", checked: false },
      { value: "womens-bags", label: "Women's Bags", checked: false },
      { value: "womens-jewellery", label: "Women's Jewellery", checked: false },
      { value: "sunglasses", label: "Sunglasses", checked: false },
      { value: "automotive", label: "Automotive", checked: false },
      { value: "motorcycle", label: "Motorcycle", checked: false },
      { value: "lighting", label: "Lighting", checked: false },
    ],
  },
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "apple", label: "Apple", checked: false },
      { value: "samsung", label: "Samsung", checked: false },
      { value: "oppo", label: "OPPO", checked: false },
      { value: "huawei", label: "Huawei", checked: false },
      {
        value: "microsoft_surface",
        label: "Microsoft Surface",
        checked: false,
      },
      { value: "infinix", label: "Infinix", checked: false },
      { value: "hp_pavilion", label: "HP Pavilion", checked: false },
      {
        value: "impression_of_acqua_di_gio",
        label: "Impression of Acqua Di Gio",
        checked: false,
      },
      { value: "royal_mirage", label: "Royal_Mirage", checked: false },
      {
        value: "fog_scent_xpressio",
        label: "Fog Scent Xpressio",
        checked: false,
      },
      { value: "al_munakh", label: "Al Munakh", checked: false },
      { value: "lord_-_al-rehab", label: "Lord - Al-Rehab", checked: false },
      { value: "l'oreal_paris", label: "L'Oreal Paris", checked: false },
      { value: "hemani_tea", label: "Hemani Tea", checked: false },
      { value: "dermive", label: "Dermive", checked: false },
      { value: "rorec_white_rice", label: "ROREC White Rice", checked: false },
      { value: "fair_&_clear", label: "Fair & Clear", checked: false },
      { value: "saaf_&_khaas", label: "Saaf & Khaas", checked: false },
      { value: "bake_parlor_big", label: "Bake Parlor Big", checked: false },
      {
        value: "baking_food_items",
        label: "Baking Food Items",
        checked: false,
      },
      { value: "fauji", label: "fauji", checked: false },
      { value: "dry_rose", label: "Dry Rose", checked: false },
      { value: "boho_decor", label: "Boho Decor", checked: false },
      { value: "flying_wooden", label: "Flying Wooden", checked: false },
      { value: "led_lights", label: "LED Lights", checked: false },
      { value: "luxury_palace", label: "luxury palace", checked: false },
      { value: "golden", label: "Golden", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductFilter({ children }) {
  const handleFilter = (e, section, option) => {
    const x = {
      ...filterdata,
      [section.id]: section.id === "brand" ? option.label : option.value,
    };
    console.log("x");
    console.log(x);
    setfilterdata(x);
  };
  const productState = useSelector((state) => state.product);
  const newproducts = productState.products;
  const status = useSelector((state) => state.product.status);
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(fetchProductAsync(page));
  }, [page]);
  useEffect(() => {
    console.log(newproducts);
  }, [newproducts]);
  const dispatch = useDispatch();
  const [filterdata, setfilterdata] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const ProductPage = useSelector((state) => state.product.page);
  useEffect(() => {
    console.log("filterdata");
    console.log(filterdata);
    if (filterdata.category || filterdata.brand) {
      dispatch(
        fetchProductAsyncFilter({ filter: filterdata, page: ProductPage })
      );
    }
  }, [filterdata]);
  const ProductList = (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold tracking-tight  item -translate-x-[80%] mb-16">
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
                    <h3 className="text-sm  ">
                      <Link to={`/products/${product.id}`}>
                        <a onClick={() => {}}>
                          <span aria-hidden="true" className=" " />
                          {product.title}
                        </a>
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm ">
                      {product.discountPercentage}
                    </p>
                  </div>
                  <p className="text-sm font-medium ">
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
  return (
    <div className="">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto  py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium ">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md  p-2  "
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t  bg-base-100 border-gray-200">
                    <h3 className="sr-only">Categories</h3>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between  px-2 py-3  hover:text-primary">
                                <span className="font-medium  ">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300  text-primary focus:text-primary"
                                      onChange={(e) => {
                                        handleFilter(e, section, option);
                                      }}
                                      value={section.checked}
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1  "
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight ">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium  hover:text-primary">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0   group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md  bg-base-100 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium  "
                                  : "text-secondary",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                              onClick={() => {
                                const x = {
                                  sort: option.sort,
                                  order: option.order,
                                };
                                console.log(x);
                                console.log(ProductPage);
                                dispatch(
                                  fetchProductAsyncSort({
                                    filter: x,
                                    page: ProductPage,
                                  })
                                );
                              }}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 View grid hover:text-primary sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2  hover:text-primary sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between  py-3 text-sm   hover:text-primary">
                            <span className="font-medium ">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300  text-primary focus:text-primary"
                                  onChange={(e) => {
                                    handleFilter(e, section, option);
                                  }}
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm "
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">{ProductList}</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
