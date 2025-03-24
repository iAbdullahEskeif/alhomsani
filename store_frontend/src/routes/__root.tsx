import { createRootRoute,Link} from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import Navbar from '../components/Navbar';

export const Route = createRootRoute({
    component: () => 
   { 
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
   }
})
