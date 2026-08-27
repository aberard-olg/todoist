import React from 'react';
import PropTypes from 'prop-types';
import { useProjectsValue } from '../context';

/**
 * Overlay component for selecting a project when adding a task
 * @param {Object} props - Component props
 * @param {Function} props.setProject - Setter for the selected project
 * @param {boolean} props.showProjectOverlay - Whether to show the overlay
 * @param {Function} props.setShowProjectOverlay - Setter for overlay visibility
 * @returns {JSX.Element|null} Project overlay component or null if hidden
 */
export const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
}) => {
  const { projects } = useProjectsValue();

  return (
    projects &&
    showProjectOverlay && (
      <div className="project-overlay" data-testid="project-overlay">
        <ul className="project-overlay__list">
          {projects.map((project) => (
            <li key={project.projectId}>
              <div
                data-testid="project-overlay-action"
                onClick={() => {
                  setProject(project.projectId);
                  setShowProjectOverlay(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setProject(project.projectId);
                    setShowProjectOverlay(false);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Select the task project"
              >
                {project.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

ProjectOverlay.propTypes = {
  setProject: PropTypes.func.isRequired,
  showProjectOverlay: PropTypes.bool.isRequired,
  setShowProjectOverlay: PropTypes.func.isRequired,
};
