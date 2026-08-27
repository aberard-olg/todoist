/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';
import { DEFAULT_USER_ID, PROJECT_KEYS, DATE_FORMAT } from '../constants';

/**
 * Custom hook to fetch and manage tasks from Firebase
 * @param {string} selectedProject - The currently selected project ID or collated task key
 * @returns {{ tasks: Array, archivedTasks: Array, loading: boolean, error: Error|null }} Tasks state
 */
export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    let unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', DEFAULT_USER_ID);

    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
        : selectedProject === PROJECT_KEYS.TODAY
        ? (unsubscribe = unsubscribe.where(
            'date',
            '==',
            moment().format(DATE_FORMAT)
          ))
        : selectedProject === PROJECT_KEYS.INBOX || selectedProject === 0
        ? (unsubscribe = unsubscribe.where('date', '==', ''))
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot(
      (snapshot) => {
        const newTasks = snapshot.docs.map((task) => ({
          id: task.id,
          ...task.data(),
        }));

        setTasks(
          selectedProject === PROJECT_KEYS.NEXT_7
            ? newTasks.filter(
                (task) =>
                  moment(task.date, DATE_FORMAT).diff(moment(), 'days') <= 7 &&
                  task.archived !== true
              )
            : newTasks.filter((task) => task.archived !== true)
        );
        setArchivedTasks(newTasks.filter((task) => task.archived !== false));
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching tasks:', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks, loading, error };
};

/**
 * Custom hook to fetch and manage projects from Firebase
 * @returns {{ projects: Array, setProjects: Function, loading: boolean, error: Error|null }} Projects state
 */
export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', DEFAULT_USER_ID)
      .orderBy('projectId')
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));

        setProjects(allProjects);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
        setError(err);
        setLoading(false);
      });
    // Empty dependency array - fetch projects only once on mount
  }, []);

  return { projects, setProjects, loading, error };
};
