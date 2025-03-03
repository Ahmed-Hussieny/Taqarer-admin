import { useState, useRef, useEffect } from "react";

interface DropdownItem {
    value: string;
    label: string;
}

const DropdownT = ({
  label,
  options,
  selectedValue,
  onChange,
}: {
  label?: string;
  options: DropdownItem[];
  selectedValue: string;
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="dropdown relative cursor-pointer" ref={dropdownRef}>
      {label && <label className="block text-gray-700 ">{label}</label>}
      <div className="dropdown-container relative text-main_color">
        <input type="hidden" value={selectedValue}  />
        <div
          className="dropdown-toggle cursor-pointer  bg-white border border-main_color p-2 rounded-md flex items-center justify-between"
          onClick={handleToggleDropdown}
        >
          <span>{selectedValue || 'الكل'}</span>
          <span className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`w-4 h-4 transform transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
        {isOpen && (
          <div className="dropdown-menu absolute z-10 bg-white border border-gray-300 max-h-64 overflow-auto rounded-md mt-1 w-full">
            <ul>
              {options?.map((option) => (
                <li
                  key={option.value}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectOption(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownT;