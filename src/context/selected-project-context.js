import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { PROJECT_KEYS } from '../constants';

/**
 * Context for managing the currently selected project
 * @type {React.Context}
 */
export const SelectedProjectContext = createContext();

/**
 * Provider component that manages selected project state
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider component with selected project context
 */
export const SelectedProjectProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState(PROJECT_KEYS.INBOX);

  return (
    <SelectedProjectContext.Provider
      value={{ selectedProject, setSelectedProject }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
};

/**
 * Custom hook to access selected project context
 * @returns {{ selectedProject: string, setSelectedProject: Function }} Selected project state and setter
 */
export const useSelectedProjectValue = () => useContext(SelectedProjectContext);

SelectedProjectProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
