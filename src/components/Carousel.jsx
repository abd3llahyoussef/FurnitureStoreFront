import React from "react";
import f1 from "../assets/1.jpg";
import f2 from "../assets/2.jpg";
import f3 from "../assets/3.jpg";
import f4 from "../assets/4.jpg";
import f5 from "../assets/5.jpg";
import f6 from "../assets/6.jpg";
import f7 from "../assets/7.jpg";
import f8 from "../assets/8.jpg";

export default function Carousel() {
  return (
    <div className="my-2">
      <div className="carousel carousel-center bg-[#f5be91] rounded-box max-w-md space-x-4 p-4">
        <div className="carousel-item">
          <img src={f1} className="rounded-box" width={400} height={100}/>
        </div>
        <div className="carousel-item">
          <img src={f2} className="rounded-box" width={350} height={100}/>
        </div>
        <div className="carousel-item">
          <img src={f3} className="rounded-box" width={350} height={100}/>
        </div>
        <div className="carousel-item">
          <img src={f4} className="rounded-box" width={350} height={100}/>
        </div>
        <div className="carousel-item">
          <img src={f5} className="rounded-box" width={350} height={100} />
        </div>
        <div className="carousel-item">
          <img src={f6} className="rounded-box" width={350} height={100} />
        </div>
        <div className="carousel-item">
          <img src={f7} className="rounded-box" width={350} height={100} />
        </div>
        <div className="carousel-item">
          <img src={f8} className="rounded-box" width={350} height={100} />
        </div>
      </div>
    </div>
  );
}
