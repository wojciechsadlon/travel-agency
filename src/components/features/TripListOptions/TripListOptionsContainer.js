import {connect} from 'react-redux';
import TripListOptions from './TripListOptions';
import {getAllTags} from '../../../redux/tagsRedux';
import {getAllFilters, changeSearchPhrase, changeDuration, chooseTag, removeTag} from '../../../redux/filtersRedux';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  changeDuration: duration => dispatch(changeDuration(duration)),
  chooseTag: tags => dispatch(chooseTag(tags)),
  removeTag: tags => dispatch(removeTag(tags)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
