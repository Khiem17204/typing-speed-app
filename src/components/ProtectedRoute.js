import { Outlet, Navigate } from "react-router-dom";
import { auth } from "./services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [user, loading, error] = useAuthState(auth);
    return user ? <Outlet/> : <Navigate to='/login'/>
    
}

export default ProtectedRoute;