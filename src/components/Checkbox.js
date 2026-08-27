import React from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../firebase';

/**
 * Checkbox component for marking tasks as complete/archived
 * @param {Object} props - Component props
 * @param {string} props.id - The task document ID in Firebase
 * @param {string} props.taskDesc - The task description for accessibility
 * @returns {JSX.Element} Checkbox component
 */
export const Checkbox = ({ id, taskDesc }) => {
  const archiveTask = () => {
    firebase
      .firestore()
      .collection('tasks')
      .doc(id)
      .update({
        archived: true,
      })
      .catch((error) => {
        console.error('Error archiving task:', error);
      });
  };

  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
      onKeyDown={(e) => {
        if (e.key === 'Enter') archiveTask();
      }}
      aria-label={`Mark ${taskDesc} as done?`}
      role="button"
      tabIndex={0}
    >
      <span className="checkbox" />
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  taskDesc: PropTypes.string.isRequired,
};
