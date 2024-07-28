import Home from "./pages/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import NotFound from "./pages/NotFound/NotFound";
import Payment from "./pages/Payment/Payment";
import Notification from "./components/Notification/Notification";
import { useContext } from "react";
import { AppContext } from "./appContext";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Addresses from "./pages/Addresses/Addresses";
import ManageAddress from "./pages/ManageAddress/ManageAddress";
import Restaurant from "./pages/Restaurant/Restaurant";
import EditRestaurant from "./pages/Restaurant/EditRestaurant/EditRestaurant";

function App() {
    const { notification, isSingedIn } = useContext(AppContext);

    return (
        <>
            <Routes>
                {isSingedIn && (
                    <>
                        <Route path='/' element={<Home />} />
                        <Route path='home' element={<Home />} />
                        <Route path='shopping-cart' element={<ShoppingCart />} />
                        <Route path='payment' element={<Payment />} />
                        <Route path='addresses' element={<Addresses />} />
                        <Route path='manage-address' element={<ManageAddress />} />
                        <Route path='manage-address/:addressId' element={<ManageAddress />} />
                        <Route path='restaurant' element={<Restaurant />} />
                        <Route path='restaurant/edit-restaurant' element={<EditRestaurant />} />
                        <Route path='*' element={<NotFound />} />
                    </>
                )}

                {!isSingedIn && (
                    <>
                        <Route path='sign-up' element={<SignUp />} />
                        <Route path='sign-in' element={<SignIn />} />
                        <Route path='*' element={<Navigate to={"/sign-in"} />} />
                    </>
                )}
            </Routes>
            {notification && (
                <Notification message={notification.message} type={notification.type} />
            )}
        </>
    );
}

export default App;
