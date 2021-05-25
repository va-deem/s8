import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { TagInterface } from '../types';

type TagProps = {
  tags: TagInterface[];
  deleteTag?: (event: any) => void;
};

const Tags = ({ tags, deleteTag }: TagProps) => {
  const renderTag = (tag) => (
    <span key={tag.id} className="tag" data-id={tag.id}>
      {tag.name}
      {deleteTag ? <FontAwesomeIcon icon={faTimesCircle} onClick={deleteTag} /> : null}
    </span>
  );

  if (tags.length > 0) {
    return <>{tags.map(({ tag }) => renderTag(tag))}</>;
  }
  return null;
};

export default Tags;
