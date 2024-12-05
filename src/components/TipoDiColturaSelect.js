
// src/components/TipoDiColturaSelect.js
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import data from '../assets/data/simulation_data.json';

function TipoDiColturaSelect({ onSelectChange }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const distinctTypes = [...new Set(
      data
        .map(item => item.tipo_di_coltura) 
        .filter(Boolean) 
    )].sort().map(type => ({
      value: type,
      label: type,
    }));
    setOptions(distinctTypes);
  }, []);

  return (
    <Select
      options={options}
      isSearchable
      isClearable 
      placeholder="Seleziona un tipo di coltura"
      onChange={(selectedOption) => onSelectChange(selectedOption ? selectedOption.value : null)}
    />
  );
}

export default TipoDiColturaSelect;
