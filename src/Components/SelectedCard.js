"use client"

import { useEffect, useRef, useState } from "react";
import { selectedData } from "./SelectedData";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const SelectedCard = () => {

    const [open, setOpen] = useState(false)
    const [select, setSelect] = useState("")
    const [openTow, setOpenTow] = useState(false)
    const [selectTow, setSelectTow] = useState("")
    const [openThree, setOpenThree] = useState(false)
    const [selectThree, setSelectThree] = useState("")
    const [openFour, setOpenFour] = useState(false)
    const [selectFour, setSelectFour] = useState("")

    const [activeButton, setActiveButton] = useState(null);
    const handleClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const dropdownRef = useRef();
    const dropdownTowRef = useRef();
    const dropdownThreeRef = useRef();
    const dropdownFourRef = useRef();

    const getButtonClass = (buttonName) => {
        return buttonName === activeButton ? "px-[40px] py-[6px] font-medium text-base text-white  bg-blue-500 rounded-md border-none" : "border border-[#98A2B3] px-[40px] py-[6px] rounded-md text-base font-medium";
    };

    const handleItemSet = (i) => {
        setSelect(i.name)
        setOpen(false)
    };

    const propertyItemSet = (item) => {
        setSelectTow(item.name)
        setOpenTow(false)
    }

    const budget = (item) => {
        setSelectThree(item.name)
        setOpenThree(false)
    }

    const budgetTow = (item) => {
        setSelectFour(item.name)
        setOpenFour(false)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
            if (dropdownTowRef.current && !dropdownTowRef.current.contains(event.target)) {
                setOpenTow(false);
            }
            if (dropdownThreeRef.current && !dropdownThreeRef.current.contains(event.target)) {
                setOpenThree(false);
            }
            if (dropdownFourRef.current && !dropdownFourRef.current.contains(event.target)) {
                setOpenFour(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="w-[1056px] h-[202px] cardShadow rounded-[20px] mx-auto mt-10">
            <div className="px-[44px] py-[38px]">
                <div className="flex gap-[10px]">
                    <button onClick={() => handleClick("buy")} className={getButtonClass("buy")}>Buy</button>
                    <button onClick={() => handleClick("sell")} className={getButtonClass("sell")}>Sell</button>
                    <button onClick={() => handleClick("rent")} className={getButtonClass("rent")}>Rent</button>
                </div>
                <div>
                    <div className="flex mt-6 gap-6">
                        <div ref={dropdownRef}>
                            <p className="text-base font-medium mb-1">Location</p>
                            <div onClick={() => setOpen(!open)} className="border px-5 py-2 rounded w-[245px] h-[40px] flex items-center justify-between">
                                <p className="text-xs text-[#98A2B3]">{select ? select : "Select your city"}</p>
                                <IoLocationOutline className={"w-4 h-4 text-[#667085]"} />
                            </div>
                            <div className={` bg-white rounded-md overflow-y-scroll mt-2 ${open ? "max-h-[250px] duration-200" : "max-h-0 duration-200"}`}>
                                {selectedData.map((item, idx) => (
                                    <p onClick={() => handleItemSet(item)} className="px-2.5  py-2 hover:bg-slate-100" key={idx}>{item.name}</p>
                                ))}
                            </div>
                        </div>
                        <div ref={dropdownTowRef}>
                            <p className="text-base font-medium mb-1">Property type</p>
                            <div onClick={() => setOpenTow(!openTow)} className="border px-5 py-2 rounded w-[245px] h-[40px] flex items-center justify-between">
                                <p className="text-xs text-[#98A2B3]">{selectTow || "Choses property type"}</p>
                                <IoIosArrowDown className={`w-4 h-4 text-[#667085] ${openTow ? "rotate-180 duration-300" : "rotate-0  duration-300"}`} />
                            </div>
                            <div className={`mt-2 overflow-y-auto bg-white rounded-md ${openTow ? "max-h-[200px] duration-200" : "max-h-0 duration-200"}`}>
                                {selectedData.map((item, idx) => (
                                    <p onClick={() => propertyItemSet(item)} className="px-2.5  py-2 hover:bg-slate-100" key={idx}>{item.name}</p>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-base font-medium mb-1">Budget</p>
                            <div className="flex">
                                <div className="w-[271px] flex">
                                    <div ref={dropdownThreeRef}>
                                        <div onClick={() => setOpenThree(!openThree)} className="px-5 py-2 border rounded-l-md h-[40px] flex items-center justify-between">
                                            <p className="text-xs text-[#98A2B3]">{selectThree || "Min budget"}</p>
                                            <IoIosArrowDown className={`w-4 h-4 text-[#667085] ${openThree ? "rotate-180 duration-300" : "rotate-0  duration-300"}`} />
                                        </div>
                                        <div className={`mt-2 overflow-y-auto bg-white ${openThree ? "max-h-[250px] duration-200" : "max-h-0 duration-200"}`}>
                                            {
                                                selectedData.map((item, idx) => (
                                                    <p onClick={() => budget(item)} className="px-2.5  py-2 hover:bg-slate-100" key={idx}>{item.name}</p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div ref={dropdownFourRef}>
                                        <div onClick={() => setOpenFour(!openFour)} className="border-l-0 px-5 py-2 border rounded-r-md h-[40px] flex items-center justify-between">
                                            <p className="text-xs text-[#98A2B3]">{selectFour || "Max budget"}</p>
                                            <IoIosArrowDown className={`w-4 h-4 text-[#667085] ${openFour ? "rotate-180 duration-300" : "rotate-0  duration-300"}`} />
                                        </div>
                                        <div className={`mt-2 overflow-y-auto bg-white ${openFour ? "max-h-[250px] duration-200" : "max-h-0 duration-200"}`}>
                                            {
                                                selectedData.map((item, idx) => (
                                                    <p onClick={() => budgetTow(item)} className="px-2.5  py-2 hover:bg-slate-100" key={idx}>{item.name}</p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className="bg-[#0057FF] py-2 px-10 text-white ml-6 text-base font-medium rounded-md">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedCard;