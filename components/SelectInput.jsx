"use client"

import React from 'react';
import Select from 'react-select';

const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: '#1A1D21',
      borderColor: '#678397',
      color: 'white',
      paddingTop: '0.3rem',
      paddingBottom: '0.3rem',
      paddingLeft: '0.3rem',
      paddingRight: '0.3rem',
      borderRadius: '0.75rem',
      fontSize: '0.875rem',
      outline: 'none',
      boxShadow: 'none',
      width: '100%',
      display: 'flex',
      gap: '0.5rem',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#1A1D21',
      borderRadius: '0.75rem',
      overflow: 'hidden',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#678397'
        : state.isFocused
        ? '#2A2E33'
        : 'transparent',
      color: 'white',
      cursor: 'pointer',
      fontSize: '0.875rem',
      padding: '10px',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#678397',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    // ✅ Add this to make selected value text white
    singleValue: (base) => ({
      ...base,
      color: 'white',
    }),
  };
  
const SingleCustomStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: '#1A1D21',
      borderColor: '#678397',
      color: 'white',
      paddingTop: '0.3rem',
      paddingBottom: '0.3rem',
      paddingLeft: '0.3rem',
      paddingRight: '0.3rem',
      borderRadius: '0.75rem',
      fontSize: '0.875rem',
      outline: 'none',
      boxShadow: 'none',
      width: '100%',
      display: 'flex',
      gap: '0.5rem',
    }),
    singleValue: (base) => ({
      ...base,
      color: 'white',  
      fontSize: "16px",
      backgroundColor: "#3e3e3e",
      paddingTop: '0.3rem',
      paddingBottom: '0.3rem',
      paddingLeft: '0.6rem',
      paddingRight: '0.6rem',
      minWidth: "120px",
      width: "100%",
      borderRadius: '0.45rem',
      fontWeight: 500,
      fontSize: '0.875rem',
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#678397',
      borderRadius: '0.5rem',
      padding: '2px 6px',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: 'white',
      fontSize: '0.75rem',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: 'white',
      ':hover': {
        backgroundColor: '#4b5c6b',
        color: 'white',
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#1A1D21',
      borderRadius: '0.75rem',
      overflow: 'hidden',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#678397'
        : state.isFocused
        ? '#2A2E33'
        : 'transparent',
      color: 'white',
      cursor: 'pointer',
      fontSize: '0.875rem',
      padding: '10px',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#678397',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };
  
export default function SelectInput({ selectedOption, setSelectedOption, doctors, options, instanceId }) {
  return (
    <div className="w-full">
      <Select
        instanceId={instanceId}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        styles={!doctors ? customStyles : SingleCustomStyles}
        placeholder="Select an option"
        required
      />
    </div>
  );
}
