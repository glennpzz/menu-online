import React, { useEffect } from "react";
import BottomNavigation from '../components/BottomNavigation';

interface Props {
    component : React.ElementType
}
const Main = ({component} : Props) => {
    const Component = component;
    return (
        <>
        <Component/>
        </>
    )
}

export default Main;
