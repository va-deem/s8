import React, { useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { TagInterface } from '../../types';

type SelectProps = {
  initialValues: TagInterface[];
  handleSelect: (a) => void;
};

const Select = ({ initialValues, handleSelect }: SelectProps) => {
  const [inputValue, setValue] = useState('');
  // const [inputValues, setValues] = useState([]);
  console.log('INPUTVALUE', inputValue);
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

  // const createOption = (label: string) => ({
  //   label,
  //   value: label,
  // });
  //
  // const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
  //   if (!inputValue) return;
  //   switch (event.key) {
  //     case 'Enter':
  //     case 'Tab':
  //       console.group('Value Added');
  //       console.log(inputValues);
  //       console.groupEnd();
  //       setValue('');
  //       setValues([...inputValues, createOption(inputValue)]);
  //       event.preventDefault();
  //   }
  // };

  return (
    <div className="multiselect">
      <AsyncCreatableSelect
        isMulti
        cacheOptions
        defaultOptions={initialValues}
        defaultValue={initialValues}
        getOptionLabel={(e) => e.name}
        getOptionValue={(e) => e.id}
        getNewOptionData={(inputValue) => ({
          id: 100,
          name: inputValue,
          __isNew__: true,
        })}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
        instanceId={'react-select-9090'}
        // onKeyDown={handleKeyDown}
        isCreatable
      />
    </div>
  );
};

export default Select;
