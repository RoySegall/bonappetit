import React, { PropTypes } from 'react';
import styles from './styles.scss';

function App({ children }) {
  return (
    <div>
      <div className={styles.root}>
        <div className={styles.inner}>
          sasad
        </div>
        {children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
