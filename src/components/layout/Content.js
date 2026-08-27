import React from 'react';
import { Sidebar } from './Sidebar';
import { Tasks } from '../Tasks';

/**
 * Main content area containing the sidebar and tasks list
 * @returns {JSX.Element} Content section component
 */
export const Content = () => (
  <section className="content">
    <Sidebar />
    <Tasks />
  </section>
);
