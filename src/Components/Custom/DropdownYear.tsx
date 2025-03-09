import { useState } from "react";
import DropdownT from "./DropdownT";


const YearRangeSelector = ({ onYearChange }: { onYearChange: (startYear: string, endYear: string) => void }) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => ({
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
      <div className="grid grid-cols-2 ms-2 gap-4">
        <DropdownT
          // label="Start Year"
          options={years}
          selectedValue={startYear}
          onChange={handleStartYearChange}
        />
        <DropdownT
          // label="End Year"
          options={years}
          selectedValue={endYear}
          onChange={handleEndYearChange}
        />
      </div>
    );
  };
  

export default YearRangeSelector;
