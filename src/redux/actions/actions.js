import * as ACTION_TYPES from './types';
import reactotron from 'reactotron-react-native';

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
  };
};

export const fetchStrawberryAndVegieDetailsSuccess = json => {
  return {
    type: ACTION_TYPES.GET_STRAWBERRIESANDVEGIES,
    payload: json,
  };
};

export const fetchPestsNewsSuccess = json => {
  return {
    type: ACTION_TYPES.GET_PESTS_NEWS,
    payload: json,
  };
};

export const fetchVideosSuccess = json => {
  return {
    type: ACTION_TYPES.GET_VIDEOS,
    payload: json,
  };
};

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
        let formatdata = [];
        for (let i = 0; i < responseJson.length; i++) {
          let obj = responseJson[i];
          obj.selected = false;
          formatdata.push(obj);
        }
        dispatch(fetchingSuccess(formatdata));
      })
      .catch(function(error) {
        dispatch(fetchingFailure(error));
      });
  };
};

export const fetchStrawberryAndVegieDetails = () => {
  return async dispatch => {
    dispatch(fetchingInProgress());
    return fetch('http://23.20.169.44/api/menu/starwberry-veg-news', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch(fetchStrawberryAndVegieDetailsSuccess(responseJson));
      })
      .catch(function(error) {
        dispatch(fetchingFailure(error));
      });
  };
};

export const fetchPestsNews = () => {
  return async dispatch => {
    dispatch(fetchingInProgress());
    return fetch('http://23.20.169.44/api/menu/pest-news', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch(fetchPestsNewsSuccess(responseJson));
      })
      .catch(function(error) {
        dispatch(fetchingFailure(error));
      });
  };
};

export const fetchVideos = () => {
  return async dispatch => {
    dispatch(fetchingInProgress());
    return fetch('http://23.20.169.44/api/menu/videos', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        dispatch(fetchVideosSuccess(responseJson));
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

export const postComments = commetsObj => {
  const url = 'http://23.20.169.44/api/feedbacks';
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commetsObj),
  })
    .then(response => response.json())
    .then(responsejson => {
      // eslint-disable-next-line no-alert
      alert('Feed back submitted successfully');
    })
    .catch(error => {});
};

export function getPreviewDetails(id) {
  return fetch(`http://23.20.169.44/api/en-us/posts/${id}?type=plain`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    })
    .catch(function(error) {
      console.log(error);
    });
}
