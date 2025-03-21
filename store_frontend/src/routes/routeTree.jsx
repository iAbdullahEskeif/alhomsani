import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import App from '../App';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import ClassicCars from '../pages/ClassicCars';
import LuxuryCars from '../pages/LuxuryCars';
import ElectricalCars from '../pages/ElectricalCars';
import SignUpModal from '../components/SignupModal';

const rootRoute = createRootRoute({
    component: App,
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
});

const signUpRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/signup',
    component: SignUpModal,
});

const classicCarsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/classiccars',
    component: ClassicCars,
});

const electricalCarsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/electricalcars',
    component: ElectricalCars,
});

const luxuryCarsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/luxurycars',
    component: LuxuryCars,
});

const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: About,
});

const contactRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/contact',
    component: Contact,
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    signUpRoute,
    classicCarsRoute,
    electricalCarsRoute,
    luxuryCarsRoute,
    aboutRoute,
    contactRoute,
]);

export const router = createRouter({ routeTree });
