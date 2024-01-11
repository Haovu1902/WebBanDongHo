const initialState = {
  openModal: false,
  order: {},
  isReload: false,
}

function OrderEvents(state = initialState, action) {
  const fetchAPI = async (url, body) => {
    const response = await fetch(url, body)
    const data = await response.json()
    return data
  }
  switch (action.type) {
    case 'CLOSE_DELETE_ORDER_MODAL':
      return {
        ...state,
        openModal: false,
      }
    case 'OPEN_MODAL_DELETE_ORDER':
      return {
        ...state,
        openModal: true,
        order: action.value,
      }
    case 'CONFIRM_DELETE_ORDER':
      let body = {
        method: 'DELETE',
      }
      let orderId = state.order._id
      let customerId = state.order.customerInfo._id
      fetchAPI(`http://localhost:8000/customers/${customerId}/orders/${orderId}`, body).then(() => {
        console.log('delete success')
      })
      return {
        ...state,
        openModal: false,
        order: {},
        isReload: !state.isReload,
      }
    default:
      return state
  }
}
export default OrderEvents
