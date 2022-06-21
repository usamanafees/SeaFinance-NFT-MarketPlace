import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProctedComponent = () => {
   const auth = useSelector((state) => state.userReducer);
   const wallet_Data =  auth.wallet;  

    return (
        <>            
            {
                wallet_Data
                    ? <Outlet />
                    : <Navigate to="/connect-to-wallet" />
            }
        </>
    )
}

export default ProctedComponent