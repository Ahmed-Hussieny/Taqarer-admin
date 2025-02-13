import React from "react";
import { NavLink } from "react-router-dom";
// import IconifyIcon from "../base/IconifyIcon";

interface SidebarMenuItemProps {
  to: string;
  icon: string;
  label: string;
  badge?: string;
  iconColor?: string;
  end?: boolean;
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ to, icon, iconColor, label, badge , end }) => {
  return (
    <li>
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          `flex items-center p-2 rounded-lg group ${
            isActive
              ? "text-black bg-gray-100 dark:text-black dark:bg-gray-700"
              : "text-white hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 hover:text-black"
          }`
        }
      >
        {/* <IconifyIcon icon={icon} fontSize="h5.fontSize" color={iconColor} /> */}

        <span className="ms-3">{label}</span>
        {badge && (
          <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
            {badge}
          </span>
        )}
      </NavLink>
    </li>
  );
};

export default SidebarMenuItem;
