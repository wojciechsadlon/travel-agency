/* eslint-disable no-useless-constructor */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './HappyHourAd.scss';

class HappyHourAd extends React.Component {
  constructor(){
    super();
  
    setInterval(() => this.forceUpdate(), 1000)
  }
  static propTypes = {
    title: PropTypes.string,
    promoDescription: PropTypes.string,
  }
  static defaultProps = {
    title: 'Happy Hours!',
    promoDescription: 'now active from 12 to 13 pm',
  }
  countdown = () => {
    const actualTime = new Date();
    const nextNoon = new Date(Date.UTC(actualTime.getUTCFullYear(), actualTime.getUTCMonth(), actualTime.getUTCDate(), 12, 0, 0, 0));

    if(actualTime.getUTCHours() >= 12){
      nextNoon.setUTCDate(actualTime.getUTCDate()+1);
    }
  
    return Math.round((nextNoon.getTime() - actualTime.getTime())/1000);
  }
  render(){
    const {title, promoDescription} = this.props;
    const promoTime = this.countdown();
    return(
      <div className={styles.component}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.promoDescription}>{promoTime > 23*60*60 ? promoDescription : this.countdown()}</p>
      </div>
    )
  }
}

export default HappyHourAd 