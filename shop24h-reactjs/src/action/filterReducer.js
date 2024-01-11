const initialState = {
    nameInput: "",
    minInput: "",
    maxInput: "",
    type: ""
}
const taskEven = ( state = initialState, action) => {
    switch (action.type) {
        case "VALUE_NAME": {
            return {
              ...state,
              nameInput: action.payload.nameInput
            };
          }
          case "VALUE_MIN": {
            return {
              ...state,
              minInput: action.payload.minInput
            };
          }
          case "VALUE_MAX": {
            return {
              ...state,
              maxInput: action.payload.maxInput
            };
          }
          case "VALUE_RADIO": {
            return {
              ...state,
              type: action.payload.type
            };
          }

        default:{ 
            return state;
        }     
    }
}
export default taskEven