import React, { useEffect, useRef, useState } from 'react';
import { TagInterface } from '../../types';
import Tags from '../tags';
import cn from 'classnames';

type SelectProps = {
  tags: TagInterface[];
  setTags: (a) => void;
};

const Select = ({ tags, setTags }: SelectProps) => {
  const [inputValue, setValue] = useState('');
  const [tagItems, setTagItems] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setDropdown(false);
        setTagItems([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const onDropdownItemClick = (e) => {
    const tagId = Number(e.target.dataset.id);

    setTags((currentTags) => {
      // If tag has id and is not present in tags - add it
      if (tagId && !tags.some((t) => t.id === tagId)) {
        const tagToAdd = tagItems.find((t) => t.id === tagId);
        setDropdown(false);
        setValue('');
        return [...currentTags, tagToAdd];
      }

      // If tag is new and not present - add it
      if (!tags.some((t) => t.name === inputValue)) {
        setDropdown(false);
        setValue('');
        return [...currentTags, { name: inputValue, isNew: true }];
      }
      return currentTags;
    });
  };

  const deleteTag = (e: React.MouseEvent) => {
    const tag = e.target as HTMLElement;
    const tagName = tag.closest('span').textContent;
    setTags(tags.filter((t) => t.name !== tagName));
  };

  const dropdownTagItems = (tagItems) => {
    const addTag = { name: `Add new tag '${inputValue}'` };
    const mapped = tags.map((t) => t.name);
    return [addTag, ...tagItems.filter(({ name }) => !mapped.includes(name))];
  };

  const renderDropdown = (data) => {
    return (
      <div className="multiselect__dropdown">
        <ul className="multiselect__list">
          {data.map((item) => (
            <li
              className="multiselect__item"
              data-kind="item"
              data-id={item.id}
              key={item.name}
              onClick={onDropdownItemClick}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handleInputChange = async (e) => {
    setValue(e.target.value);

    const response = await fetch(`/api/tags/${inputValue}`);
    if (response.ok) {
      const data = await response.json();
      setTagItems(data);
    }

    if (!dropdown) {
      setDropdown(true);
    }
  };

  return (
    <>
      {tags ? <Tags tags={tags} deleteTag={deleteTag} /> : null}
      <div className={cn('multiselect', { open: dropdown })} ref={ref}>
        <input
          type="text"
          className="multiselect__input"
          value={inputValue}
          onChange={handleInputChange}
        />
        {tagItems && renderDropdown(dropdownTagItems(tagItems))}
      </div>
    </>
  );
};

export default Select;
