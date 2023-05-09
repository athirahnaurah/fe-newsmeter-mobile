const initGlobalState = {
    isError: false,
    message: 'Error',
    isLoading: false,
    isLoadingScreen: false,
    error: 'error',
    global: false,
    loadingValue : 0.1,
    searchData: [],
    registrationSuccess: false,
    authUser: {},
    authDetail: {},
    user: {},
    isLogin: false,
    searchValue: false,
  };
  
  export const globalReducer = (state = initGlobalState, action) => {
    if (action.type === 'SET_ERROR') {
      return {
        ...state,
        isError: action.value.isError,
        message: action.value.message,
        error: action.value.error,
      };
    }
    else if (action.type === 'SET_LOADING') {
      return {
        ...state,
        isLoading: action.value,
      };
    }
    else if (action.type === 'SET_LOADING_SCREEN') {
      return {
        ...state,
        isLoadingScreen: action.value,
      };
    }
    else if (action.type === 'SET_LOADING_SCREEN_BARNER') {
      return {
        ...state,
        isLoadingScreenBarner: action.value,
      };
    }
    
    else if (action.type === 'SET_GLOBAL') {
      return {
        ...state,
        global: action.value,
      };
    }
    else if (action.type === 'SET_LOADING_VALUE') {
      return {
        ...state,
        loadingValue: action.value,
      };
    }
    else if (action.type === 'SET_TOKEN_MESSAGE') {
      return {
        ...state,
        tokenMessage: action.value,
      };
    }
    else if (action.type === 'SET_SEARCH_DATA') {
      return {
        ...state,
        searchData: action.value,
      };
    }
    else if (action.type === 'SET_REGISTRATION_ON_SUCCESS') {
      return {
        ...state,
        registrationSuccess: action.value,
      };
    }
    else if (action.type === 'SET_AUTH_USER') {
      return {
        ...state,
        authUser: action.value,
      };
    }
    else if (action.type === 'SET_AUTH_DETAIL') {
      return {
        ...state,
        authDetail: action.value,
      };
    }
    else if (action.type === 'SET_TOKEN') {
      return {
        ...state,
        token: action.value,
      };
    }
    else if (action.type === 'SET_USER') {
      return {
        ...state,
        user: action.value,
      };
    }
    else if (action.type === 'SET_LOGIN') {
      return {
        ...state,
        isLogin: action.value,
      };
    }
    else if (action.type === 'SET_SEARCH_VALUE') {
      return {
        ...state,
        searchValue: action.value,
      };
    }
    return state;
  };
  
  