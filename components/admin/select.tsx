import React, { useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { TagInterface } from '../../types';

type SelectProps = {
  initialValues: TagInterface[];
  handleSelect: (a) => void;
};

const Select = ({ initialValues, handleSelect }: SelectProps) => {
  const [inputValue, setValue] = useState('');

  const handleInputChange = (value) => setValue(value);

  // TODO set types
  const handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(newValue);
    handleSelect(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  const loadOptions = () => {
    return fetch(`/api/tags/${inputValue}`).then((res) => res.json());
  };

  return (
    <div className="multiselect">
      <AsyncCreatableSelect
        isMulti
        cacheOptions
        defaultOptions={initialValues}
        defaultValue={initialValues}
        getOptionLabel={(e) => e.name}
        getOptionValue={(e) => e.id}
        getNewOptionData={(inputValue, optionLabel) => ({
          label: optionLabel,
          name: inputValue,
          __isNew__: true,
        })}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
        instanceId={'react-select-9090'}
      />
    </div>
  );
};

export default Select;
