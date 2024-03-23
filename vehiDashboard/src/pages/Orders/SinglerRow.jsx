import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { PackageContext } from "../../context/packageContext";
import { CustomerContext } from "../../context/customrContext";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import axios from "axios";
const SingleRow = () => {
  const [uidInputVisible, setUidInputVisible] = useState(false);
  const [uid, setUid] = useState("");

  const { packageData, setPackageData } = useContext(PackageContext);
  const { customerData, setCustomerData } = useContext(CustomerContext);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const location = useLocation();
  const rowData = location.state.rowData;
  const order_id = rowData.orderId;

  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = process.env.REACT_APP_BACKEND_LOCALAPI;
  } else {
    baseUrl = process.env.REACT_APP_BACKEND_LIVEAPI;
  }

  const handleChangeDispatch = (e) => {
    const value = e.target.value;
    console.log(value);
    setUid(value);
  };

  // console.log(rowData.cartItems[0].uid)
  const handleStatusChange = async (e) => {
    const value = e.target.value;
    console.log(value);
    setSelectedStatus(value);
    if (value === "Order Dispatched") {
      setUidInputVisible(true);
    } else {
      setUidInputVisible(false);
    }

    try {
      const response = await axios.put(
        `${baseUrl}/orders/update-status/${order_id}`,
        {
          status: value,
        }
      );
      if (response.status === 200) {
        const updatedStatus = response.data.updatedOrder.status;
        setSelectedStatus(updatedStatus);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const subTotal = rowData.subTotal;
  const totalDiscount = rowData.cartItems[0].totalDiscount;
  const totalPrice = parseFloat(totalDiscount + subTotal / 1.18);

  const toalTax = ((totalPrice - totalDiscount) * 18) / 100;

  if (!customerData || customerData.length === 0) {
    return <p>Loading...</p>;
  }

  if (!packageData || packageData.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className=" rounded-lg p-4">
        <p className="font-semibold text-logoClr text-xl rounded-sm">
          Order ID: {rowData.orderId} &nbsp; productUid :
          {rowData.cartItems[0].uid}
        </p>
        <h2 className="text-2xl font-black  underline">Custoemr Details</h2>
        {customerData.map((customer) => {
          if (customer.userId === rowData.userId) {
            return (
              <div className="flex gap-3">
                <p>Name : {customer.customerName}</p>
                <p>Email : {customer.customerEmail}</p>
                <p>Phone : {customer.customerPhone}</p>
                <p>Address : {customer.customerAddress}</p>
              </div>
            );
          }
        })}
        <h4 className="text-2xl text-black  underline">Product Details</h4>
        <div className="ltr flex   mt-1">
          {rowData.cartItems.map((item, index) => (
            <div key={index} className="">
              {packageData.map((product) => {
                if (product._id === item.product_id) {
                  return (
                    <div className="flex  gap-6 justify-start items-center border-logoClr  border-s-4 p-3">
                      <div className="flex flex-col ">
                        <p className="font-semibold">
                          Product Price: {product.packagePrice}
                        </p>

                        <p className="font-semibold">
                          Product Name: {product.packageName}
                        </p>
                        <p className="font-semibold">
                          Product Title: {product.packageTitle}
                        </p>
                        <p className="font-semibold">
                          Product Description: {product.packageDescription}
                        </p>

                        <p className="font-bold text-pgcolor  ">
                          Qty.. : {item.quantity}
                        </p>
                      </div>
                      <div>
                        <img
                          className="w-12 h-12 rounded"
                          src={product.packageImg}
                          alt="product.packageName"
                        />
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          ))}
        </div>

        <div className="ltr flex gap-6 items-end justify-between my-2">
          <div className="flex flex-col border-logoClr  border-s-4 p-3">
            <p className="font-semibold ">
              Order Confirmed Date: {rowData.createdAt}
            </p>
            <p className="text-sm font-bold">
              Toatal Price : ₹ {totalPrice.toFixed(2)}
            </p>
            <p className="text-sm font-bold ">
              Total Discount: ₹ -{totalDiscount.toFixed(2)}
            </p>
            <p>Tax: ₹ + {toalTax.toFixed(2)}</p>
            <p className="text-xl  font-bold ">SubTotal: ₹ {subTotal}</p>
          </div>
          <div className="mx-2 absolute bottom-10 right-10 ">
            {uidInputVisible && (
              <div className="mb-4">
                <TextField
                  label="UID of QR Code"
                  value={uid}
                  onChange={(e) => handleChangeDispatch(e)}
                />

                <button>save</button>
              </div>
            )}
            <Box sx={{ minWidth: 250 }}>
              <FormControl fullWidth>
                <InputLabel id="status-select-label">status</InputLabel>
                <Select
                  labelId="status-select-label"
                  id="status-select"
                  value={selectedStatus || rowData.status}
                  onChange={handleStatusChange}
                  label="Status"
                >
                  <MenuItem value="Order Received">Order Received</MenuItem>
                  <MenuItem value="Order Dispatched">Order Dispatched</MenuItem>
                  <MenuItem value="Order Delivered">Order Delivered</MenuItem>
                  <MenuItem value="Activated">Activated</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRow;
