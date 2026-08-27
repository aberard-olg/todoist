import React from 'react';
import moment from 'moment';
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { DATE_FORMAT } from '../constants';

/**
 * Component for selecting task due dates with preset options
 * @param {Object} props - Component props
 * @param {Function} props.setTaskDate - Setter for the task date
 * @param {boolean} props.showTaskDate - Whether to show the date picker
 * @param {Function} props.setShowTaskDate - Setter for date picker visibility
 * @returns {JSX.Element|null} Task date picker component or null if hidden
 */
export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) =>
  showTaskDate && (
    <div className="task-date" data-testid="task-date-overlay">
      <ul className="task-date__list">
        <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().format(DATE_FORMAT));
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setShowTaskDate(false);
                setTaskDate(moment().format(DATE_FORMAT));
              }
            }}
            data-testid="task-date-today"
            tabIndex={0}
            aria-label="Select today as the task date"
            role="button"
          >
            <span>
              <FaSpaceShuttle />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(1, 'day').format(DATE_FORMAT));
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setShowTaskDate(false);
                setTaskDate(moment().add(1, 'day').format(DATE_FORMAT));
              }
            }}
            data-testid="task-date-tomorrow"
            role="button"
            tabIndex={0}
            aria-label="Select tomorrow as the task date"
          >
            <span>
              <FaSun />
            </span>
            <span>Tomorrow</span>
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(7, 'days').format(DATE_FORMAT));
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setShowTaskDate(false);
                setTaskDate(moment().add(7, 'days').format(DATE_FORMAT));
              }
            }}
            data-testid="task-date-next-week"
            aria-label="Select next week as the task date"
            tabIndex={0}
            role="button"
          >
            <span>
              <FaRegPaperPlane />
            </span>
            <span>Next week</span>
          </div>
        </li>
      </ul>
    </div>
  );

TaskDate.propTypes = {
  setTaskDate: PropTypes.func.isRequired,
  showTaskDate: PropTypes.bool.isRequired,
  setShowTaskDate: PropTypes.func.isRequired,
};
