import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Tags = ({ tags, deleteTag }) => {
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
