import Errors from 'components/FormItems/error/errors'
import axios from 'axios'
import { API_URL } from '../../constants/path'

async function list(filter) {
  const params = {
    page: filter.page,
    limit: filter.limit,
    users: filter.users || '',
    ...filter.orderBy
  }

  const response = await axios.get(`${API_URL}/users`, { params })

  return {
    rows: response.data.rows.map((user) => ({
      ...user,
      id: user.userId // cần để MUI DataGrid không lỗi
    })),
    count: response.data.count
  }
}

async function filterUsers(request, filter) {
  const response = await axios.get(`${API_URL}/users`, {
    params: {
      page: filter.page,
      limit: filter.limit,
      ...request
    }
  })

  return {
    rows: response.data.rows.map((user) => ({
      ...user,
      id: user.userId
    })),
    count: response.data.count
  }
}

const actions = {
  doFilter: (request, filter) => async (dispatch) => {
    try {
      const response = await filterUsers(request, filter)

      dispatch({
        type: 'USERS_LIST_FILTERED',
        payload: {
          rows: response.rows,
          count: response.count
        }
      })
    } catch (error) {
      Errors.handle(error)
      dispatch({ type: 'USERS_LIST_FETCH_ERROR' })
    }
  },

  doFetch: (filter, keepPagination = false) => async (dispatch) => {
    try {
      dispatch({
        type: 'USERS_LIST_FETCH_STARTED',
        payload: { filter, keepPagination }
      })

      const response = await list(filter)

      dispatch({
        type: 'USERS_LIST_FETCH_SUCCESS',
        payload: {
          rows: response.rows,
          count: response.count
        }
      })
    } catch (error) {
      Errors.handle(error)
      dispatch({ type: 'USERS_LIST_FETCH_ERROR' })
    }
  },

  doDelete: (filter, id) => async (dispatch) => {
    try {
      dispatch({ type: 'USERS_LIST_DELETE_STARTED' })

      await axios.delete(`${API_URL}/users/${id}`)

      dispatch({ type: 'USERS_LIST_DELETE_SUCCESS' })

      const response = await list(filter)

      dispatch({
        type: 'USERS_LIST_FETCH_SUCCESS',
        payload: {
          rows: response.rows,
          count: response.count
        }
      })
    } catch (error) {
      Errors.handle(error)
      dispatch({ type: 'USERS_LIST_DELETE_ERROR' })
    }
  },

  doOpenConfirm: (id) => async (dispatch) => {
    dispatch({
      type: 'USERS_LIST_OPEN_CONFIRM',
      payload: { id }
    })
  },

  doCloseConfirm: () => async (dispatch) => {
    dispatch({ type: 'USERS_LIST_CLOSE_CONFIRM' })
  }
}

export default actions
