import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dashnavbar from "../DashNav/Dashnavbar";

const Message = () => {
  return (
    <div className="list text-main">
      <Sidebar />
      <div className="listContainer">
        <Dashnavbar />
      </div>
    </div>
  );
};

export default Message;
