import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { TagInterface } from '../../types';
import cx from 'clsx';
import styles from './Tags.module.scss';

type TagProps = {
  tags: TagInterface[];
  deleteTag?: (e: React.MouseEvent) => void;
  selectTag?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  selectedTags?: string[];
};

const Tags = ({ tags, deleteTag, selectTag, selectedTags }: TagProps) => {
  const isSelected = (tagName) => selectedTags?.includes(tagName);
  const renderTag = (tag) => (
    <span
      key={tag.name}
      className={cx(
        styles.tag,
        { [styles.tagSelectable]: !!selectTag },
        { [styles.tagSelectableActive]: isSelected(tag.name) },
        { [styles.tagInline]: !selectTag }
      )}
      data-id={tag.id}
      onClick={selectTag}
      onKeyPress={selectTag}
      role="button"
      tabIndex={0}
    >
      {tag.name}
      {deleteTag ? (
        <FontAwesomeIcon icon={faTimesCircle} onClick={deleteTag} />
      ) : null}
    </span>
  );

  if (tags.length > 0) {
    return <>{tags.map((tag) => renderTag(tag))}</>;
  }
  return null;
};

export default Tags;
