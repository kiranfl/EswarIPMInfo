import * as ACTION_TYPES from './types';

export const fetchingInProgress = () => {
  return {
    type: ACTION_TYPES.FETCHING_INPROGRESS,
  };
};

export const fetchingSuccess = json => {
  return {
    type: ACTION_TYPES.GET_CROP_DETAILS_SUCCESS,
    payload: json,
  };
};

export const fetchingFailure = error => {
  return {
    type: ACTION_TYPES.FETCHING_FAILURE,
    payload: error,
  };
};

export const fetchingDiseasePestsDetailsSuccess = json => {
  return {
    type: ACTION_TYPES.GET_DISEASE_AND_PESTS_DETAILS_SUCCESS,
    payload: json,
  }
}

export const fetchCropsData = () => {
  return async dispatch => {
    dispatch(fetchingInProgress());
    return fetch('http://23.20.169.44/api/en-us/crops', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        return dispatch(fetchingSuccess(responseJson));
      })
      .catch(function(error) {
        dispatch(fetchingFailure(error));
      });
  };
};

export const fetchDiseaseDetails = cropId => {
  return async dispatch => {
    dispatch(fetchingInProgress());
    return fetch(`http://23.20.169.44/api/en-us/crops/${cropId}/categories`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        return dispatch(fetchingDiseasePestsDetailsSuccess(responseJson));
      })
      .catch(function(error) {
        dispatch(fetchingFailure(error));
      });
  };
};
