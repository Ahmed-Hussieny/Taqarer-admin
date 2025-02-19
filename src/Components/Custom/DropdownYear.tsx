import { useState } from "react";

interface DropdownItem {
  value: string;
  label: string;
}

const Dropdown = ({
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

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="dropdown relative cursor-pointer mx-1">
      <div className="dropdown-container relative text-black">
        <input type="hidden" value={selectedValue} />
        <div
          className="dropdown-toggle cursor-pointer px-3 bg-white border border-[#D5DAE1] p-2 rounded-md flex items-center justify-between"
          onClick={handleToggleDropdown}
        >
          <span>{selectedValue || label}</span>
          <span className="ml-2">
            {/* Arrow Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`w-4 h-4 transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
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
              {options.map((option) => (
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

const YearRangeSelector = ({ onYearChange }: { onYearChange: (startYear: string, endYear: string) => void }) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 20 }, (_, i) => ({
      value: (currentYear - i).toString(),
      label: (currentYear - i).toString(),
    }));
  
    const [startYear, setStartYear] = useState(years[years.length - 1].value);
    const [endYear, setEndYear] = useState(years[0].value);
  
    const handleStartYearChange = (value: string) => {
      setStartYear(value);
      if (parseInt(value) > parseInt(endYear)) {
        setEndYear(value);
      }
      onYearChange(value, endYear);
    };
  
    const handleEndYearChange = (value: string) => {
      if (parseInt(value) >= parseInt(startYear)) {
        setEndYear(value);
        onYearChange(startYear, value);
      }
    };
  
    return (
      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          label="Start Year"
          options={years}
          selectedValue={startYear}
          onChange={handleStartYearChange}
        />
        <Dropdown
          label="End Year"
          options={years}
          selectedValue={endYear}
          onChange={handleEndYearChange}
        />
      </div>
    );
  };
  

export default YearRangeSelector;
