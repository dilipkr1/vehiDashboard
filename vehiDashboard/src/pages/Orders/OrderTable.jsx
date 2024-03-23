import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { PackageContext } from "../../context/packageContext";
import { CustomerContext } from "../../context/customrContext";
import TableCell from "@mui/material/TableCell";

const OrderTable = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { packageData, setPackageData } = useContext(PackageContext);
  const { orderData, setOrderData } = useContext(OrderContext);
  const { customerData, setCustomerData } = useContext(CustomerContext);
  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleRowClick = (params) => {
    const selectedId = params.row.id;
    setSelectedRowId(selectedId);
    navigate("/dashboard/single-row", { state: { rowData: params.row } });
  };

  useEffect(() => {
    setIsLoading(false);
  }, [orderData]);

  if (!orderData || orderData.length === 0 || !packageData) {
    return <p className="text-main">Loading...</p>;
  }

  if (!Array.isArray(orderData.cartItems)) {
    console.error("Order data is not in the expected format:", orderData);
    return <p>Error: Order data is not in the expected format.</p>;
  }

  const rows = orderData.cartItems.map((order, index) => ({
    id: order._id,
    ...order,
  }));

  const cartColumns = [
    {
      field: "orderId",
      headerName: "Order ID",
      width: 100,
      renderCell: (params) => (
        <div
          className="underline cursor-pointer font-normal
         text-bgnavclr hover:font-extrabold"
        >
          {params.value}
        </div>
      ),
    },
    { field: "createdAt", headerName: "Order Date", width: 150 },
    {
      field: "cartItems",
      headerName: "Product Details",
      width: 130,
      renderCell: (params) => {
        const order = params.value;
        if (!order || !Array.isArray(order)) {
          return "not an array";
        }
        return (
          <ul className="flex">
            {order.map((cartItem) => (
              <li key={params.row.cartItems._id}>
                {packageData.map((product) => {
                  if (product._id === cartItem.product_id) {
                    return (
                      <div className="flex ">
                        <p>{product.packageName}</p>
                      </div>
                    );
                  }
                })}
              </li>
            ))}
          </ul>
        );
      },
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 100,
      renderCell: (params) => {
        const { cartItems } = params.row;

        return (
          <ul className="flex">
            <li key={params.row.userId}>
              {customerData.map((customer) => {
                if (customer.userId === params.row.userId) {
                  return (
                    <div className="flex" key={customer.userId}>
                      <p>{customer.customerName}</p>
                    </div>
                  );
                }
                return null;
              })}
            </li>
          </ul>
        );
      },
    },
    {
      field: "orderData",
      headerName: "Mobile Number",
      width: 160,
      renderCell: (params) => {
        const { cartItems } = params.row;
        return (
          <ul className="flex">
            <li key={params.row.id}>
              {customerData.map((customer) => {
                if (customer.userId === params.row.userId) {
                  return (
                    <div className="flex" key={customer.userId}>
                      <p>{customer.customerPhone}</p>
                    </div>
                  );
                }
                return null;
              })}
            </li>
          </ul>
        );
      },
    },
    {
      field: "params",
      headerName: "UID",
      width: 130,
      renderCell: (params) => {
        const cartItems = params.row.cartItems;

        return (
          <>
            {cartItems.map((x) => (
              <div key={x.uid}>
                <p>{x.uid} &nbsp;&nbsp;</p>
              </div>
            ))}
          </>
        );
      },
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <TableCell>
          <div className="cellAction">
            {/* Buttons here */}
            <div
              className="deleteButton" /* onClick={() => deleteCartItem(params.row._id)} */
            >
              Delete
            </div>
          </div>
        </TableCell>
      ),
    },
  ];
  return (
    <div className="datatable font-serif text-sm">
      <div className="datatableTitle">
        <h2 className="text-2xl font-serif font-extraligh tracking-wider leading-10 text-main">
          Cart Items
        </h2>
        <Link to="/dashboard/customers/new" className="link"></Link>
      </div>

      {!customerData || customerData.length === 0 ? (
        <p>NO any Order till now</p>
      ) : (
        <DataGrid
          className="datagrid"
          rows={rows}
          columns={cartColumns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onRowClick={handleRowClick}
        />
      )}
    </div>
  );
};

export default OrderTable;
