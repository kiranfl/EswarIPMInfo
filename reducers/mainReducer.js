import * as ACTION_TYPES from '../redux/actions/types';
// import {initialState} from './initialState';

const initialState = {
  cropsList: [],
  isLoading: false,
  errorMessage: '',
  diseasesListAndPestsList: [],
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCHING_INPROGRESS:
      return {
        ...state,
        isLoading: true,
      };
    case ACTION_TYPES.FETCHING_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload,
      };
    case ACTION_TYPES.GET_CROP_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cropsList: action.payload,
      };
    case ACTION_TYPES.GET_DISEASE_AND_PESTS_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        diseasesListAndPestsList: action.payload,
      };
    default:
      return state;
  }
};

export default mainReducer;
