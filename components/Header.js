import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import {
  faBed,
  faBath
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useState } from "react";
import { useRouter } from "next/router";
import Logo from "../images/Logo.png";

import { Range, getTrackBackground, rtl} from 'react-range';

const Header = ({ placeholder }) => {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [minNumOfBeds, setMinNumOfBeds] = useState(1);
  const [maxNumOfBeds, setMaxNumOfBeds] = useState(1);
  const [minNumOfBaths, setMinNumOfBaths] = useState(1);
  const [maxNumOfBaths, setMaxNumOfBaths] = useState(1);
  const [sqft, setSquareFootage] = useState([1400, 2400]);
  const STEP = 10;
  const MIN = 300;
  const MAX = 4000;

  const Submit = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        minNumOfBeds,
        maxNumOfBeds,
        minNumOfBaths,
        maxNumOfBaths
      },
    });
  };
  const Cancel = () => {
    setSearchInput("");
  };

  const Button = ({ text, color, submit }) => (
    <button
      className={`text-md font-semibold flex-grow font-mono border-2 rounded-lg py-2 hover:shadow-md shadow-sm ${
        color && "text-blue-400"
      }`}
      onClick={submit ? Submit : Cancel}
    >
      {text}
    </button>
  );

  const selectionRange = {
    startDate,
    endDate,
    key: "Selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.Selection.startDate);
    setEndDate(ranges.Selection.endDate);
  };

  return (
    <header className="sticky top-0 x-50 items-center md:grid md:grid-cols-3 flex bg-white shadow-md p-3 md:px-10 z-50">
      <div
        className="relative flex items-center h-10 cursor-pointer my-auto"
        onClick={() => {
          router.push("/");
        }}
      >
        <Image
          src={Logo}
          objectFit="contain"
          objectPosition="left"
          width={100}
          height={80}
        />
      </div>
      <div className="flex flex-grow ml-4 items-center border-2 rounded-full py-2 md:shadow-sm focus-within:shadow-md">
        <input
          value={searchInput}
          type="text"
          placeholder={placeholder || "Look for a homes by region"}
          className="pl-5 bg-transparent outline-none flex-grow text-md text-gray-600 placeholder-gray-400 text-xs sm:text-sm lg:text-md xl:text-lg"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <SearchIcon className="h-8  bg-blue-400 text-white rounded-full p-2 cursor-pointer hidden lg:inline-flex md:mx-2" />
      </div>
      <div className="space-x-4 items-center justify-end text-gray-500 hidden md:flex">
        <p className="cursor-pointer hover:bg-gray-100 py-2 px-3 rounded-full hidden lg:inline">
          Become a Seller
        </p>
        <GlobeAltIcon className="h-10 cursor-pointer hover:bg-gray-100 p-2 rounded-full hidden md:inline" />
        <div className="items-center border-2 space-x-2 rounded-full p-2 cursor-pointer hover:shadow-md hidden md:flex">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>
      {searchInput && (
      
        <div className="md:flex flex-col col-span-3 mx-auto mt-3 hidden ">
        <div className="flex items-center mb-4 ml-5">
            <h2 className="text-xl font-mono font-semibold text-gray-600 flex-grow mr-6">
              Bedrooms
            </h2>
            <FontAwesomeIcon className="h-5 mr-4 text-gray-600" icon={faBed}/>
            {/* <UserGroupIcon className="h-5 mr-4 text-gray-600" /> */}
            <input
              type="number"
              className="w-20 pl-2 text-lg outline-none border-2 text-blue-400 px-2 rounded-md"
              min={1}
              value={minNumOfBeds}
              onChange={(e) => {
                if (e.target.value > maxNumOfBeds){
                  setMaxNumOfBeds(e.target.value)
                }
                setMinNumOfBeds(e.target.value);
              }}
            />
            <input
              type="number"
              className="w-20 pl-2 text-lg outline-none border-2 text-blue-400 px-2 ml-5 rounded-md"
              min={1}
              value={maxNumOfBeds}
              onChange={(e) => {
                if (e.target.value < minNumOfBeds) [
                  setMinNumOfBeds(e.target.value)
                ]
                setMaxNumOfBeds(e.target.value);
              }}
            />
          </div>
        <div className="flex items-center mb-4 ml-5">
            <h2 className="text-xl font-mono font-semibold text-gray-600 flex-grow mr-6">
              Bathrooms
            </h2>
            <FontAwesomeIcon className="h-5 mr-4 text-gray-600" icon={faBath}/>
            {/* <UserGroupIcon className="h-5 mr-4 text-gray-600" /> */}
            <input
              type="number"
              className="w-20 pl-2 text-lg outline-none border-2 text-blue-400 px-2 rounded-md"
              min={1}
              value={minNumOfBaths}
              onChange={(e) => {
                if (e.target.value > maxNumOfBeds){
                  setMaxNumOfBaths(e.target.value)
                }
                setMinNumOfBaths(e.target.value);
              }}
            />
            <input
              type="number"
              className="w-20 pl-2 text-lg outline-none border-2 text-blue-400 px-2 ml-5 rounded-md"
              min={1}
              value={maxNumOfBaths}
              onChange={(e) => {
                if (e.target.value < minNumOfBaths) [
                  setMinNumOfBaths(e.target.value)
                ]
                setMaxNumOfBaths(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center mb-4 ml-5 my-10">
            <h2 className="text-xl font-mono font-semibold text-gray-600 flex-grow mr-6">
              Square Footage
            </h2>
            <FontAwesomeIcon className="h-5 mr-4 text-gray-600" icon={faBed}/>
            <div className="w-44 h-16">
            <Range
              values={sqft}
              step={STEP}
              min={MIN}
              max={MAX}
              rtl={rtl}
              onChange={(values) => setSquareFootage(values)}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: '36px',
                    display: 'flex',
                    width: '100%'
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: '5px',
                      width: '100%',
                      borderRadius: '4px',
                      background: getTrackBackground({
                        values: sqft,
                        colors: ['#ccc', '#548BF4', '#ccc'],
                        min: MIN,
                        max: MAX,
                        rtl
                      }),
                      alignSelf: 'center'
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ index, props, isDragged }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: '20px',
                    width: '20px',
                    borderRadius: '30px',
                    backgroundColor: '#FFF',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0px 2px 6px #AAA'
                  }}
                >
                  { index > 0 ?
                  <div
                    style={{
                      position: 'absolute',
                      top: '-35px',
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                      padding: '4px',
                      borderRadius: '4px',
                      backgroundColor: '#548BF4'
                    }}
                  >
                    {sqft[index].toFixed(1)}
                  </div>
                  :
                  <div
                  style={{
                    position: 'absolute',
                    top: '35px',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                    padding: '4px',
                    borderRadius: '4px',
                    backgroundColor: '#548BF4'
                  }}
                >
                  {sqft[index].toFixed(1)}
                </div>
                  }
                  <div
                    style={{
                      height: '16px',
                      width: '5px',
                      backgroundColor: isDragged ? '#548BF4' : '#CCC'
                    }}
                  />
                </div>
              )}
            />
          </div>
          </div>
          <div className="flex space-x-1 ml-5">
            <Button text="Cancel" />
            <Button text="Submit" color submit />
          </div>
        </div>        
      )}
    </header>
  );
};

export default Header;
