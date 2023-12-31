const SIGNUP_SUCCESS = "auth/SIGNUP_SUCCESS";
const SIGNUP_FAILURE = "auth/SIGNUP_FAILURE";
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGIN_FAILURE = "auth/LOGIN_FAILURE";
const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";
const UPDATE_DISPLAYNAME = "auth/UPDATE_DISPLAYNAME";
const UPDATE_PROFILEPIC = "auth/UPDATE_PROFILEPIC";
const UPDATE_PROFILECOMMENT = "auth/UPDATE_PROFILECOMMENT";

export const signUpSuccess = (user) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: user,
  };
};

export const signUpFailure = (error) => {
  return {
    type: SIGNUP_FAILURE,
    payload: error,
  };
};

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

export const logOutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const updateDisplayName = (payload) => {
  return {
    type: UPDATE_DISPLAYNAME,
    payload,
  };
};

export const updateProfilePic = (payload) => {
  return {
    type: UPDATE_PROFILEPIC,
    payload,
  };
};

export const updateProfileComment = (payload) => {
  return {
    type: UPDATE_PROFILECOMMENT,
    payload,
  };
};

const initialState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return state;
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return { state };
    case UPDATE_DISPLAYNAME:
      return {
        ...state,
        user: {
          ...state.user,
          displayName: action.payload,
        },
      };
    case UPDATE_PROFILEPIC:
      return {
        ...state,
        user: {
          ...state.user,
          photoURL: action.payload,
        },
      };
    case UPDATE_PROFILECOMMENT:
      return {
        user: {
          ...state.user,
          comment: action.payload,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
