/* SELECTORS */

export const getAllFilters = ({filters}) => filters;

/* ACTIONS */

// action name creator
const reducerName = 'filters';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const CHANGE_PHRASE = createActionName('CHANGE_PHRASE');
export const CHANGE_DURATION = createActionName('CHANGE_DURATION');
export const CHOOSE_TAG = createActionName('CHOOSE_TAG');
export const REMOVE_TAG = createActionName('REMOVE_TAG');

// action creators
export const changeSearchPhrase = payload => ({ payload, type: CHANGE_PHRASE });
export const changeDuration = payload => ({ payload: {...payload}, type: CHANGE_DURATION });
export const chooseTag = payload => ({ payload, type: CHOOSE_TAG });
export const removeTag = payload => ({ payload, type: REMOVE_TAG });

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case CHANGE_PHRASE: 
      return {
        ...statePart,
        searchPhrase: action.payload,
      };
    case CHANGE_DURATION: 
      return {
        ...statePart,
        duration: action.payload,
      };
    case CHOOSE_TAG: 
      return {
        ...statePart,
        tags: [...statePart.tags, action.payload],
      };
    case REMOVE_TAG: 
      return {
        ...statePart,
        tags: [...statePart.tags].slice([action.payload].length, 1),
      };
    default:
      return statePart;
  }
}
