import React from 'react';
import { BsCarFront, BsGrid1X2Fill, BsFillCarFrontFill, BsPeopleFill, BsFillGearFill } from 'react-icons/bs';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

function AdminSideBar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={`bg-gray-900 text-white h-screen transition-all duration-300 flex flex-col ${
        openSidebarToggle ? 'w-64' : 'w-20'
      }`}
    >
      {/* Sidebar Header with Logo */}
      <div className="flex items-center p-4 border-b border-gray-700">
        {openSidebarToggle && <span className="ml-3 font-bold text-xl">CARRIAGE ADMIN</span>}
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          <SidebarItem to="/admin" icon={<BsGrid1X2Fill />} text="Dashboard" open={openSidebarToggle} />
          <SidebarItem to="/upload-car" icon={<IoCloudUploadOutline />} text="Upload Car" open={openSidebarToggle} />
          <SidebarItem to="/carlisting" icon={<BsFillCarFrontFill />} text="Car Listings" open={openSidebarToggle} />
          <SidebarItem to="/customers" icon={<BsPeopleFill />} text="Customers" open={openSidebarToggle} />
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="border-t border-gray-700 mt-auto">
        <SidebarItem to="/" icon={<BsFillGearFill />} text="Logout" open={openSidebarToggle} customClass="text-red-500" />
      </div>
    </aside>
  );
}

const SidebarItem = ({ to, icon, text, open, customClass = "" }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center px-5 py-3 rounded-lg transition ${
            isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
          } ${customClass}`
        }
      >
        <span className="text-2xl">{icon}</span>
        {open && <span className="ml-4 text-lg">{text}</span>}
      </NavLink>
    </li>
  );
};

export default AdminSideBar;
