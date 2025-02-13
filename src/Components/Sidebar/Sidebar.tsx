import React from "react";
import SidebarMenuItem from "./SidebarMenuItem";

const Sidebar: React.FC = () => {
  return (
    <aside
      id="separator-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="flex items-center text-2xl justify-center p-5 py-3 pb-0 text-white font-bold">
        <h2>Check Up</h2>
      </div>
      <div className="h-full px-3 py-4 overflow-y-auto bg-zinc-950">
        <ul className="space-y-2 font-medium">
          <SidebarMenuItem
            to="/admin"
            icon="material-symbols-light:dashboard-rounded"
            iconColor="#383738FF"
            label="Dashboard"
            end
          />
          <SidebarMenuItem
            to="/admin/patients"
            icon="mdi:account-group-outline"
            iconColor="#383738FF"
            label="Patients"
          />
          <SidebarMenuItem
            to="/admin/clinics"
            icon="material-symbols:help-clinic-rounded"
            iconColor="#383738FF"
            label="Clinics"
          />
          <SidebarMenuItem
            to="/admin/doctors"
            icon="healthicons:doctor"
            iconColor="#383738FF"
            label="Doctors"
          />
          <SidebarMenuItem
          to="/admin/prescriptions"
          icon="mdi:file-document-outline"
          iconColor="#383738FF"
          label="Prescriptions"
          />
          {/* Specialties */}
          <SidebarMenuItem
            to="/admin/Specialties"
            icon="material-symbols:folder-special-outline"
            iconColor="#383738FF"
            label="Specialties"
          />
          {/* MedicalAnalysis */}
          <SidebarMenuItem
            to="/admin/MedicalAnalysis"
            icon="icomoon-free:lab"
            iconColor="#383738FF"
            label="Medical Analysis"
          />
          <SidebarMenuItem
            to="/admin/scans"
            icon="icon-park-outline:scan-code"
            iconColor="#383738FF"
            label="Scans"
          />
          
          {/* <SidebarMenuItem
          to="/admin/settings"
          icon="mdi:cog-outline"
          iconColor="#383738FF"
          label="Settings"
          />
          <SidebarMenuItem
          to="/admin/requests"
          icon="fluent:branch-request-16-regular"
          iconColor="#383738FF"
          label="Requests"
          /> */}
          

        </ul>
        <div className="absolute bottom-3 start-2 w-52">
        <SidebarMenuItem
          to="/admin/signout"
          icon="mdi:logout"
          iconColor="#383738FF"
          label="Sign Out"
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
