import { fetchFilterInvoice, fetchFilterInvoiceFailure, fetchFilterInvoiceSuccess, fetchFilterTransction, fetchFilterTransctionFailure, fetchFilterTransctionSuccess, fetchUsersFailure, fetchUsersInvoice, fetchUsersInvoiceFailure, fetchUsersInvoiceSuccess, fetchUsersRequest, fetchUsersSuccess, fetchUsersTransction, fetchUsersTransctionFailure, fetchUsersTransctionSuccess } from "../../../redux/actionCreator/actionCreator";
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

export const getSubscriptionsByRole = (role, forceRefresh, page = 1) => {
  return async (dispatch) => {
    dispatch(fetchUsersTransction());

    try {
      const res = await handleApiRequest("GET", `/subsciption-data/${role}?page=${page}&limit=10`);
      dispatch(fetchUsersTransctionSuccess({
        data: res.data || [],
        pagination: res.pagination
      }));
      return res;
    } catch (error) {
      dispatch(fetchUsersTransctionFailure(error.message));
      throw error;
    }
  };
};

export const getInvoiceList = (forceRefresh, page = 1) => {
  return async (dispatch) => {
    dispatch(fetchUsersInvoice());

    try {
      const res = await handleApiRequest("GET", `/get-invoice-data?page=${page}&limit=10`);
      dispatch(fetchUsersInvoiceSuccess({
        data: res.data.invoices
          || [],
        pagination: res.pagination
      }));
      return res;
    } catch (error) {
      dispatch(fetchUsersInvoiceFailure(error.message));
      throw error;
    }
  };
};

export const getFilteredTeacherInvoices = (filters = {}, page = 1) => {
  return async (dispatch) => {
    dispatch(fetchFilterInvoice());

    try {
      const params = {
        ...filters,
        page,
      };

      const response = await handleApiRequest("GET", `/invoice-filter`, params);

      dispatch(fetchFilterInvoiceSuccess({
        data: {
          invoices: response.data.invoices || [],
        },
        pagination: response.pagination || {},
      }));

      return response;

    } catch (error) {
      dispatch(fetchFilterInvoiceFailure(error.message));
      throw error;
    }
  };
};

export const getFilteredSubscriptions = (role, filters = {}, page = 1) => {
  return async (dispatch) => {
    dispatch(fetchFilterTransction());

    try {
      const params = {
        ...filters,
        page,
      };
      const response = await handleApiRequest(
        "GET",
        `/subscription-filter/${role}`, params
      );

      dispatch(fetchFilterTransctionSuccess({
        data: response.data,
        pagination: response.pagination
      }));

      return response;

    } catch (error) {
      dispatch(fetchFilterTransctionFailure(error.message));
      throw error;
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

// export const getUserProfile = async (id) => {
//   return await handleApiRequest("GET", "/get-profile/" + id, true);
// };

export const getUserProfile = async () => {
  return await handleApiRequest("GET", "/get-profile", true);
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

export const getCommissionList = async () => {
  return await handleApiRequest("GET", "/get-users-list")
}

export const updateAndRespondeCommission = async (formData) => {
  return await handleApiRequest("PUT", "/commission", formData)
}

export const updateAdrequset = async (formData) => {
  return await handleApiRequest("PUT", "/ad-respond", formData)
}

export const getAdRequsetUsers = async (page = 1, limit = 10) => {
  return await handleApiRequest("GET", `/get-adrequest-users?page=${page}&limit=${limit}`)
}

export const getUsersSubscriptionDetail = async () => {
  return await handleApiRequest("GET", "/status")
}

export const getCredibiltyTeachers = async (page = 1, limit = 20) => {
  return await handleApiRequest("GET", `/get-crediblity-teachers?page=${page}&limit=${limit}`)
}

export const respondCredibility = async (formData) => {
  return await handleApiRequest("POST", "/respond-credibility", formData)
}

export const handleCalculateCommission = async (formData) => {
  return await handleApiRequest("POST", "/calculateTeacherFee", formData)
}

export const getCommissionSummary = async (page = 1, limit = 20) => {
  return await handleApiRequest("GET", `/get-commission-list?page=${page}&limit=${limit}`)
}

export const getCountry = async () => {
  return await handleApiRequest("GET", "/get-country")
}


