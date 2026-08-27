import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useProjects } from '../hooks';

/**
 * Context for managing projects state across the application
 * @type {React.Context}
 */
export const ProjectsContext = createContext();

/**
 * Provider component that wraps the app and provides projects state
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider component with projects context
 */
export const ProjectsProvider = ({ children }) => {
  const { projects, setProjects } = useProjects();

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

/**
 * Custom hook to access projects context
 * @returns {{ projects: Array, setProjects: Function }} Projects state and setter
 */
export const useProjectsValue = () => useContext(ProjectsContext);

ProjectsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
