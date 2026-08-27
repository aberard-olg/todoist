/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';
import { DEFAULT_USER_ID, PROJECT_KEYS, DATE_FORMAT } from '../constants';

export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
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

    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        selectedProject === PROJECT_KEYS.NEXT_7
          ? newTasks.filter(
              task =>
                moment(task.date, DATE_FORMAT).diff(moment(), 'days') <= 7 &&
                task.archived !== true
            )
          : newTasks.filter(task => task.archived !== true)
      );
      setArchivedTasks(newTasks.filter(task => task.archived !== false));
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', DEFAULT_USER_ID)
      .orderBy('projectId')
      .get()
      .then(snapshot => {
        const allProjects = snapshot.docs.map(project => ({
          ...project.data(),
          docId: project.id,
        }));

        setProjects(allProjects);
      });
    // Empty dependency array - fetch projects only once on mount
  }, []);

  return { projects, setProjects };
};
