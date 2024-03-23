import React, { useContext } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dashnavbar from "../DashNav/Dashnavbar";
import { DataGrid } from "@mui/x-data-grid";
import { subColumns } from "../../submailsTable";
import { CustomerContext } from "../../context/customrContext";
import Dashcopy from "../Dashcopy/Dashcopy";
import Switcher from "./switch";

export default function Submail() {
  const { customerData } = useContext(CustomerContext);

  // if (!customerData || customerData.length === 0) {
  //   return <div>Loading...</div>;
  // }

  const rows = customerData.map((customer, index) => ({
    id: index + 1,
    ...customer,
  }));

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Switcher />
          </div>
        );
      },
    },
  ];

  return (
    <div className="home text-main">
      <Sidebar />
      <div className="homeContainer">
        <Dashnavbar />
        <div className="mb-0 pt-5 px-5">
          <h2 className="text-2xl font-serif font-extraligh tracking-wider leading-10  text-main">
            Subscribed Mails
          </h2>
        </div>

        {!customerData || customerData.length === 0 ? (
          <p className="  p-4 text-black font-bold text-xs  tracking-wide">
            Don't Have Any Customer !!
          </p>
        ) : (
          <div className="p-5">
            <DataGrid
              rows={rows}
              className="datagrid"
              columns={subColumns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
            />
          </div>
        )}
        <div className="flex justify-center  pb-2 mr-10 absolute bottom-0 center ml-20 ">
          <Dashcopy />
        </div>
      </div>
    </div>
  );
}
