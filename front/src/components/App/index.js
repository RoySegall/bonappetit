import React, { PropTypes } from 'react';
import styles from './styles.scss';

function App({ children }) {
  return (
    <div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
