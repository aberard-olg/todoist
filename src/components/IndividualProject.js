import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { firebase } from '../firebase';
import { PROJECT_KEYS } from '../constants';

/**
 * Component for displaying and managing an individual project in the sidebar
 * @param {Object} props - Component props
 * @param {Object} props.project - The project object
 * @param {string} props.project.docId - Firebase document ID
 * @param {string} props.project.name - Project name
 * @param {string} [props.project.projectId] - Project ID
 * @param {string} [props.project.userId] - User ID who owns the project
 * @returns {JSX.Element} Individual project component with delete functionality
 */
export const IndividualProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = (docId) => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setSelectedProject(PROJECT_KEYS.INBOX);
      })
      .catch((error) => {
        console.error('Error deleting project:', error);
      });
  };

  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setShowConfirm(!showConfirm);
        }}
        tabIndex={0}
        role="button"
        aria-label="Confirm deletion of project"
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure you want to delete this project?</p>
              <button
                type="button"
                onClick={() => deleteProject(project.docId)}
              >
                Delete
              </button>
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setShowConfirm(!showConfirm);
                }}
                tabIndex={0}
                role="button"
                aria-label="Cancel adding project, do not delete"
              >
                Cancel
              </span>
            </div>
          </div>
        )}
      </span>
    </>
  );
};

IndividualProject.propTypes = {
  project: PropTypes.shape({
    docId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    projectId: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
};
