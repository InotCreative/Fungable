import { HiMenuAlt1, HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../images/logo.png";
import React from "react";

const NavBarItem = ({title, classProps}) => {
    return (
        <li className={`mx-4 cursor-pointer ${classProps}`}>
            {title}
        </li>
    )
}

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = React.useState(false);

    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <img src={logo} alt="logo" className="w-40 cursor-pointer"/>
            </div>

            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                    <NavBarItem key={item + index} title={item}/>
                ))}
                <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">Login</li>
            </ul>

            <div className="text-white md:hidden cursor-pointer z-50">
                {
                    toggleMenu ? (
                        <AiOutlineClose
                            fontSize={28}
                            className="text-white md:hidden cursor-pointer"
                            onClick={() => setToggleMenu(false)}
                        />
                    ) : (
                        <HiMenuAlt1
                            fontSize={28}
                            className="text-white md:hidden cursor-pointer"
                            onClick={() => setToggleMenu(true)}
                        />
                    )
                }
            </div>
        </nav>
    );
};

export default Navbar;