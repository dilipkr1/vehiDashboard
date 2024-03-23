
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nopage from "./pages/Nopage/Nopage";
import New from "./pages/New/New";
import Customers from "./pages/Customers/Customers";
import Single from "./pages/Single/Single";
import DbHome from "./pages/Dashboard/DbHome";
import Edit from "./pages/Edit/Edit";
import Packages from "./pages/Pakages/Packages";
import Global from "./pages/Global/Global"
import Wallet from "./pages/Wallet/Wallet";
import Message from "./pages/Message/Message";
import Submail from "./pages/Submail/Submail";
import Walletmanagement from "./pages/Walletmanagement/Walletmanagement";
import CreatePackgage from "./pages/Createpackages/CreatePackage";
import Packageupdate from "./pages/Packageupdate/Packageupdate";
import Order from "./pages/Orders/Order";
import SinglerRow from "./pages/Orders/SinglerRow";
// import Signup from "./components/Signup/Signup";
// import Login from "./components/Login/Login";
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";


function App() {
  return (

    <div className="App" >
      <BrowserRouter>
        <Routes  >
          <Route path="/dashboard"  >
            <Route index element={<DbHome />} />
            <Route path="/dashboard/orders" element={< Order />} />
            <Route path="/dashboard/single-row" element={< SinglerRow />} />
            <Route path="/dashboard/packages">
              <Route index element={<Packages />} />
              <Route path=":packageId">
                <Route index element={<CreatePackgage />} />
                <Route path="update-package" element={<Packageupdate />} />
              </Route>
            </Route>
            <Route path="/dashboard/customers">
              <Route index element={<Customers />} />
              <Route path=":customerid">
                <Route index element={<Single />} />
                <Route path="edit" element={<Edit />} />
              </Route>
              <Route
                path="/dashboard/customers/new"
                element={<New />}
              />
              <Route path="/dashboard/customers/messages" element={<Message />} />
              <Route path="/dashboard/customers/wallet" >
                <Route index element={<Wallet />} />
                <Route path="/dashboard/customers/wallet/add-wallet" element={<Walletmanagement />} />
              </Route>
               <Route path="/dashboard/customers/sub-mails" element={<Submail />} />
            </Route>
          </Route>
          <Route path="/dashboard/settings" element={<Global />} /> 
          <Route path="*" element={<Nopage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

