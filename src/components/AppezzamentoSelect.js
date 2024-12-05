
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import data from '../assets/data/simulation_data.json';

function AppezzamentoSelect({ onSelectChange }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const distinctNames = [...new Set(
      data
        .filter(item => item.appezzamento && item.appezzamento.nome)
        .map(item => item.appezzamento.nome)
    )].map(name => ({
      value: name,
      label: name,
    }));
    
    setOptions(distinctNames);
  }, []);

  return (
    <Select
      options={options}
      isSearchable
      isClearable 
      placeholder="Seleziona un appezzamento"
      onChange={(selectedOption) => onSelectChange(selectedOption ? selectedOption.value : null)}
    />
  );
}

export default AppezzamentoSelect;
