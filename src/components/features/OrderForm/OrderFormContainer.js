import { connect } from 'react-redux';
import OrderForm from './OrderForm';
import { getOrderOptions, setOrderOption } from '../../../redux/orderRedux';

const mapStateToProps = (state) => ({
  options: getOrderOptions(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  setOrderOption: options => dispatch(setOrderOption(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);