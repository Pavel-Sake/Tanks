import React from 'react';
import cn from 'classnames';

import styles from './item.pcss';

const Item = (props) => {

  console.log('props', props)

  return (
    <div className={cn(styles.item)}>
      tank: {props.match.params.id}
    </div>
  )
}

export default Item;