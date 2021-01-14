import React from "react";
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './about.pcss';

const About = () => {

  return (
    <div className={cn(styles.about)}>
        <p>
            fgdfghdfhdfghfi
            yyyyyyyyyyyyy yyyyyyyyy yyyyyy yyolololo lolololol ololololo lololol ololololol
            yyyyyyyyyyyyy yyyyyyyyyyyyy;ppppppppp pppppppppppppppppp
            juuuuu uuuuuuuu uuuuuuuu uuuuuuuuu uuuuu ulooooooo oooooooo ooooooooooooooo
            looooooooooo ooooooooooooooooo ooooooooo okuiuiuiuiuiu iuiuiu iuiuiuiuiuiuiui uiuiuiuiui uiuiuiuiui
            frrrrrrrr rrrrrrrrr rrrrrrrrrrrr rrrrrrrrjujuju jujuju ujujuju jujujujujujujujuju jujujuju jujujujujujuju
            ferfff fffffff fffffff eeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeee eeeeeeeeee eeeeeeeeeeeeee eeeeeeeeeeee

        </p>
      <div>
        <div className={cn(styles.about__item)}>
          <Link to={"/about/1"}>1</Link>
        </div>
        <div className={cn(styles.about__item)}>
          <Link to={"/about/2"}>2</Link>
        </div>
        <div className={cn(styles.about__item)}>
          <Link to={"/about/3"}>3</Link>
        </div>
      </div>

    </div>
  )
}

export default About;