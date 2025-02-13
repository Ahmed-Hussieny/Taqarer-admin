import { useState } from "react";
import eyeIcon from "../../assets/Icons/Eye_fill.svg";
import bgCircle from "../../assets/Icons/Ellipse 58.png";
import arrowDown from "../../assets/Icons/Group.png";
import linkIcon from '../../assets/Icons/link-2.png';
import { Button, Modal } from "flowbite-react";
import PdfViewer from "./PDFViewer";

export default function TaqrerItem({
  name,
  source,
  year,
  viewLink,
  details,
  pdfName
}: {
  name: string;
  source: string;
  year: string;
  viewLink?: string;
  details: string;
  pdfName: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="bg-white shadow-lg my-3 border text-black rounded-lg transition-all duration-300">
      {/* Main Content */}
      <div className="grid grid-cols-12  gap-3 py-5 px-3 ">
        {/* Name Column */}
        <div className="sm:col-span-4 col-span-5 flex  justify-center items-center font-medium">
          <span>{name}</span>
        </div>

        {/* Source Column */}
        <div className="col-span-4 sm:col-span-3 flex justify-center items-center sm:border-s border-[#E0E0E0] ps-3 font-medium ">
          <span>{source}</span>
        </div>

        {/* Year Column */}
        <div className="col-span-2 sm:col-span-2  flex justify-center items-center sm:border-s border-[#E0E0E0] ps-3 font-medium">
          <span>{year}</span>
        </div>

        {/* Action Buttons */}
        <div className="col-span-3  justify-center items-center border-s border-[#E0E0E0] ps-2 gap-3 relative hidden sm:flex">
          {/* View Button */}
          <div className="flex items-center text-main_color bg-[#EAF7E8] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#d4f2d0] transition" onClick={() => setOpenModal(true)}>
            <span className=" font-medium">إطلاع</span>
            <img src={eyeIcon} className="w-4 h-4 ms-2" alt="eyeIcon" />
          </div>

          {/* Dropdown Button */}
          <div
            className="flex justify-center relative items-center text-white px-4  rounded-lg cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <img src={bgCircle} className="w-10" alt="bgCircle" />
            <img
              src={arrowDown}
              className={`absolute transform transition-transform ${isExpanded ? "rotate-180" : "rotate-0"
                }`}
              alt="arrowDown"
            />
          </div>
        </div>
      </div>

      {/* Expanded Read More Section */}
      {isExpanded && (
        <>
          <div className="border-t border-gray-300 p-4 bg-gray-50 text-gray-700 transition-all duration-300">
            <p className="font-medium text-gray-400">نبذه مختصرة</p>
            <p className="font-normal">{details}</p>
          </div>

          <div className="border-t border-gray-300 p-4 bg-gray-50 text-gray-700 transition-all duration-300 cursor-pointer" onClick={() => window.open(viewLink, "_blank")}>
            <p className="text-main_color flex items-center">
              <img src={linkIcon} alt="linkIcon" className="me-1" />
              رابط التقرير الاساسي

            </p>
          </div>
        </>
      )}

      <div className="col-span-3 items-center ps-2 gap-3 relative pb-3 flex justify-between sm:hidden">
        {/* View Button */}
        <div className="flex items-center text-main_color bg-[#EAF7E8] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#d4f2d0] transition" onClick={() => setOpenModal(true)}>
          <span className="font-medium" >إطلاع</span>
          <img src={eyeIcon} className="w-4 h-4 ms-2" alt="eyeIcon" />
        </div>

        {/* Dropdown Button */}
        <div
          className="flex justify-center relative items-center text-white px-4  rounded-lg cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <img src={bgCircle} className="w-10" alt="bgCircle" />
          <img
            src={arrowDown}
            className={`absolute transform transition-transform ${isExpanded ? "rotate-180" : "rotate-0"
              }`}
            alt="arrowDown"
          />
        </div>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <div className="space-y-6 w-full">
            <PdfViewer
              pdfName={pdfName} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-main_color hover:bg-secondary_color" onClick={() => setOpenModal(false)}>اغلاق</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
