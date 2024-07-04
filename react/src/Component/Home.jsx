import React from "react";
import "./../Style/Homes.css";
import home from "./../Images/animedoodle2.gif";
import Product from "./Product";
import shirt1 from "./../Images/animeshirt1.webp";
import shirt3 from "./../Images/animeshirt2.webp";

import shirt2 from "./../Images/animeshirt3.webp";
import shirt4 from "./../Images/animeshirt4.webp";
import shirt5 from "./../Images/animeshirt5.webp";
import shirt6 from "./../Images/animeshirt6.webp";
import useMediaQuery from "../hooks/useMediaQuery";
function Home() {
  const isDesktop = useMediaQuery("(min-width: 900px)");
  const products = [
    {
      title: "Game Of Deaths Hoodie (Oversize Drop-Shoulder)",
      image: shirt1,
      price: 29.9,
      rating: 5,
    },
    {
      title: "One Piece Lamp Skull",
      image: shirt2,
      price: 29.9,
      rating: 4,
    },
    {
      title: "Ultimate Susanoo: Kamui Shuriken Hoodie (Oversize Drop-Shoulder)",
      image: shirt3,
      price: 29.9,
      rating: 3,
    },
    {
      title: "Yuta Cosplay Bomber Jacket",
      image: shirt4,
      price: 29.9,
      rating: 5,
    },
    {
      title: "7th Hokage Hoodie (Orange)",
      image: shirt5,
      price: 29.9,
      rating: 4,
    },
    {
      title: "Itadori Jujutsu Uniform",
      image: shirt6,
      price: 12.9,
      rating: 5,
    },
  ];

  return (
    <div className="flex bg-gradient-to-tr  from-accent  via-primary to-secondary ">
      <div className=" w-[100%]">
        <img className=" home_image w-[100%] lg:h-[15%] " src={home} alt="banner"></img>

        <div className=" flex lg:flex-row md:flex-col sm:flex-col  ">
          <Product
            title="Game Of Deaths Hoodie (Oversize Drop-Shoulder)"
            image={shirt1}
            price={29.9}
            rating={5}
          ></Product>
          <Product
            title="One Piece Lamp Skull"
            image={shirt2}
            price={29.9}
            rating={4}
          ></Product>
        </div>

          <div className="flex  lg:flex-row md:flex-col sm:flex-col ">
            <Product
              title="
Ultimate Susanoo: Kamui Shuriken Hoodie (Oversize Drop-Shoulder)"
              image={shirt3}
              price={29.9}
              rating={3}
            ></Product>
            <Product
              title="Yuta Cosplay Bomber Jacket"
              image={shirt4}
              price={29.9}
              rating={5}
            ></Product>
            <Product
              title="7th Hokage Hoodie (Orange)"
              image={shirt5}
              price={29.9}
              rating={4}
            ></Product>
          </div>
        
        <div className="flex">
          <Product
            title="Itadori Jujutsu Uniform"
            price={12.9}
            image={shirt6}
            rating={5}
          ></Product>
        </div>
      </div>   
    </div>
  );
}

export default Home;
