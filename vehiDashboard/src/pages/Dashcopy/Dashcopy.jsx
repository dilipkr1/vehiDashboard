import React from "react";
import vehicleanImage from "../../images/vlogo.png";
export default function Dashcopy() {
  return (
    <div className="h-30 w-full text-pgcolor text-xs b  flex justify-around">
      <img className="h-6 w-auto" src={vehicleanImage} alt="" />
      <span className="w-auto px-5"> © 2024 VehiConnect Pvt Limited.</span>
    </div>
  );
}
