import React, { useEffect } from "react";
import BottomNavigation from '../components/BottomNavigation';
import Footer from "../components/Footer";

interface Props {
    component : React.ElementType
}
const Main = ({component} : Props) => {
    const Component = component;
    return (
        <>
        <Component/>
        <Footer/>
        </>
    )
}

export default Main;
