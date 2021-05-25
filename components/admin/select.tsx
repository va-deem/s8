import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { TagInterface } from '../../types';

const Select = ({ initialValues }: { initialValues: TagInterface[] }) => {
  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(initialValues);

  const handleInputChange = (value) => {
    setValue(value);
  };

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const loadOptions = () => {
    return fetch(`/api/tags/${inputValue}`).then((res) => res.json());
  };

  return (
    <div className="multiselect">
      <AsyncSelect
        isMulti
        cacheOptions
        defaultOptions={initialValues}
        defaultValue={initialValues}
        value={selectedValue}
        getOptionLabel={(e) => e.name}
        getOptionValue={(e) => e.id}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
    </div>
  );
};

export default Select;
