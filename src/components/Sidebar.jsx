import React, { useState } from 'react'
import { HiOutlineHashtag, HiOutlineHome,HiOutlineMenu,  HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const links = [
    { name: 'Discover', to: '/', icon: HiOutlineHome },
    { name: 'Albums', to: '/albums', icon: HiOutlinePhotograph },
    { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup },
    { name: 'Top Charts', to: '/top-charts', icon: HiOutlineHashtag },
  ];
  
//div mapped with above data
const NavLinks = ({ handleClick }) => (
    <div className="mt-10">
      {links.map((item) => (
        <Link
          key={item.name}
          to={item.to}
          className="flex flex-row items-center justify-start my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
          onClick={() => handleClick && handleClick()}
        >
          <item.icon className="w-6 h-6 mr-2" />
          {item.name}
        </Link>
      ))}
    </div>
  );
//sidebar with mapped links
const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#301008] opacity-100">
        <img src='https://icons8.com/icon/rI-3G2uuvZkr/music-heart' alt="logo" className="object-contain w-full h-14" />
        <NavLinks />
      </div>

      {/* Mobile sidebar */}
      <div className="absolute block md:hidden top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(true)} />
        ) : (
          <RiCloseLine className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(false)} />
        )}
      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#301008] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <img src={"http://itunes.apple.com/favicon.ico"} alt="logo" className="object-contain w-full h-14" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  )
}

export default Sidebar