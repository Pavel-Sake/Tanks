import React from 'react';
import cn from 'classnames';

import styles from './tank.pcss';

const Tank = (props) => {
  return (
    <div className={cn(styles.tank)}>
      tank: {props.match.params.id}
    </div>
  );
};

export default Tank;