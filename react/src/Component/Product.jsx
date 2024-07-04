import React from "react";

function Product({ title, image, price, rating }) {
  return (
    <div className="  md:right-0  max-h-[800px]  w-full m-6 flex justify-center items-center">
      <div className="  relative min-h-[700px] min-w-[100px]    bg-base-100  rounded-3xl w-full  md:bg-opacity-20  sm:bg-opacity-0  md:backdrop-filter md:ackdrop-blur-3xl "></div>
      <div className="   sm:-translate-x-[6.5%]  md:translate-x-0 absolute  bg-base-100 md:bg-opacity-40 sm:bg-opacity-20 backdrop-filter backdrop-blur-sm card w-96 rounded-3xl h-[500px] shadow-2xl shadow-primary hover:shadow-secondary   hover:image-full focus:image-full   group hover:text-inherit   ">
        <figure className=" ">
          <img className="  " src={image} alt={title} />
        </figure>
        <div className="card-body">
          <h2
            className="card-title font-bold text-inherit 
          group-hover:bg-gradient-to-r  group-hover:from-primary  group-hover:to-secondary group-hover:inline-block group-hover:text-transparent group-hover:bg-clip-text transition-colors  delay-75"
          >
            {title}
          </h2>
          <p className="">
            <small className="group-hover:bg-gradient-to-r  group-hover:from-primary  group-hover:to-secondary group-hover:inline-block group-hover:text-transparent group-hover:bg-clip-text transition-colors  delay-75">
              $
            </small>
            <strong className="group-hover:bg-gradient-to-b  group-hover:from-primary  group-hover:to-secondary group-hover:inline-block group-hover:text-transparent group-hover:bg-clip-text transition-colors  delay-75">
              {price}
            </strong>
          </p>
          <div className="rating gap-1">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <input
                  key={i}
                  type="radio"
                  name="rating-3"
                  className="mask mask-heart bg-secondary cursor-default"
                  disabled
                />
              ))}
          </div>
          <div className="card-actions justify-end">
            <button className="btn  btn-primary  hover:btn-secondary hover:text-black">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
