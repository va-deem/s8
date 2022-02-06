import React, { MouseEventHandler } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { TagInterface } from '../types';
import classNames from 'classnames';

type TagProps = {
  tags: TagInterface[];
  deleteTag?: MouseEventHandler<SVGSVGElement>;
  selectTag?: MouseEventHandler;
  selectedTags?: string[];
};

const Tags = ({ tags, deleteTag, selectTag, selectedTags }: TagProps) => {
  const isSelected = (tagName) => {
    if (!selectedTags) return false;

    if (selectedTags.includes(tagName)) {
      return true;
    }
  };

  const renderTag = (tag) => (
    <span
      key={tag.name}
      className={classNames(
        'tag',
        { 'tag-selectable': !!selectTag },
        {
          'tag-selectable--active': isSelected(tag.name),
        }
      )}
      data-id={tag.id}
      onClick={selectTag}
    >
      {tag.name}
      {deleteTag ? <FontAwesomeIcon icon={faTimesCircle} onClick={deleteTag} /> : null}
    </span>
  );

  if (tags.length > 0) {
    return <>{tags.map((tag) => renderTag(tag))}</>;
  }
  return null;
};

export default Tags;
