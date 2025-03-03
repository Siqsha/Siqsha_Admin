import { fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess } from "../../../redux/actionCreator/actionCreator";
import { handleApiRequest } from "../../../utils/handleApiRequest";

export const getAllUsers = (role, forceRefresh, page) => {
  return async (dispatch, getState) => {
    const { users } = getState().users;
    if (users.length > 0 && !forceRefresh) {
      return;
    }
    dispatch(fetchUsersRequest());
    try {
      const data = await handleApiRequest("GET", `/user-data/${role}?page=${page}&limit=${10}`);
      dispatch(fetchUsersSuccess({ user: data.data, pagination: data.pagination }));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
};
// export const getAllUsers = (role, forceRefresh, page) => {
//     return async (dispatch, getState) => {
//       const { users } = getState().users;
//       if (users.length > 0 && !forceRefresh) {
//         return;
//       }
//       dispatch(fetchUsersRequest());
//       try {
//         const data = await handleApiRequest(
//           "GET",
//           `/user-data/${role}?page=${page}&limit=${10}`
//         );
//         dispatch(fetchUsersSuccess({ user: data.data, pagination: data.pagination }));

//         return data;
//       } catch (error) {
//         dispatch(fetchUsersFailure(error.message));
//         throw error; 
//       }
//     };
//   };

export const getUserProfile = async (id) => {
  return await handleApiRequest("GET", "/get-profile/" + id, true);
};


export const changeStatus = async (userId, data) => {
  return await handleApiRequest("PUT", `/change-status/${userId}`, data, true);
};

export const pendingTrialRequest = async () => {
  return await handleApiRequest("GET", "/pending-trialrequest");
}

export const updateTrial = async (formData) => {
  return await handleApiRequest("POST", "/update-action", formData);
}