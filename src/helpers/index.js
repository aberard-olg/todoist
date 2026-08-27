import { collatedTasks } from '../constants';

/**
 * Gets the title of a project by its ID
 * @param {Array} projects - Array of project objects
 * @param {string} projectId - The ID of the project to find
 * @returns {Object} The project object or undefined
 */
export const getTitle = (projects, projectId) =>
  projects.find(project => project.projectId === projectId);

/**
 * Gets the title of a collated task by its key
 * @param {Array} projects - Array of project objects
 * @param {string} key - The key of the collated task (TODAY, NEXT_7, INBOX)
 * @returns {Object} The collated task object or undefined
 */
export const getCollatedTitle = (projects, key) =>
  projects.find(project => project.key === key);

/**
 * Checks if a project is a collated task (TODAY, NEXT_7, INBOX)
 * @param {string} selectedProject - The project ID to check
 * @returns {Object} The collated task object if found, undefined otherwise
 */
export const collatedTasksExist = selectedProject =>
  collatedTasks.find(task => task.key === selectedProject);

/**
 * Generates a unique push ID similar to Firebase's push ID format
 * @returns {string} A unique ID string
 */
export const generatePushId = (() => {
  const PUSH_CHARS =
    '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

  const lastRandChars = [];

  return function() {
    let now = new Date().getTime();

    const timeStampChars = new Array(8);
    for (var i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      now = Math.floor(now / 64);
    }

    let id = timeStampChars.join('');

    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }

    return id;
  };
})();
