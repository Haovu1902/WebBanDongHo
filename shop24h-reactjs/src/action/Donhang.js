var data = JSON.parse(localStorage.getItem('LOGIN'));
var initialState = {
    fullName: data ? data.displayName : "",
    email: data ? data.email : "",
}


const Donhang = (state = initialState, action) => {
    switch (action.type) {
        case "FULL_NAME_ON_CHANGE": {
            return {
                ...state,
                fullName: action.payload.fullName
            };
        }
        case "EMAIL_ON_CHANGE": {
            return {
                ...state,
                email: action.payload.email
            };
        }

        default: {
            return state
        }

    }

}
export default Donhang