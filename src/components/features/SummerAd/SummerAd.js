import React from 'react';
import PropTypes from 'prop-types';
import styles from './SummerAd.module.scss';

class SummerAd extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    days: PropTypes.number,
  }
  getDaysToSummer = () => {
    const actualDate = new Date();
    const summerStart = new Date(Date.UTC(actualDate.getUTCFullYear(), 5, 21, 0, 0, 0));
    const daysToSummer = (summerStart.getTime() - actualDate.getTime()) / (1000*3600*24);

  
    return Math.floor(daysToSummer);
  }
  renderText = (days) => {
    if(days > 1){
      return days + ' days to summer!';
    } else if (days === 1){
      return 'one day to summer!';
    } else {
      return '';
    }
  }
  render(){
    const {title} = this.props;
    return(
      <div className={styles.component}>
        <h3 className={styles.title}>{this.renderText(this.getDaysToSummer(), title)}</h3>
      </div>
    )
  }
}

export default SummerAd