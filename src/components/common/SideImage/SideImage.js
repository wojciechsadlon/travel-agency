import React from 'react';
import PropTypes from 'prop-types';
import styles from './SideImage.module.scss';

const SideImage = props => (<img  className={styles.component} alt={props.alt} src={`${props.source}`} />);

SideImage.propTypes = {
  source: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
SideImage.defaultProps = {
  alt: '',
};


export default SideImage;
