var data = JSON.parse(localStorage.getItem('CARD'));
var initialState = data ? data : []
const Card = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case "THEM_VAO_GIO_HANG":
            var { product, quantity } = action.value
            index = findProductCard(state, product);
            if (index !== -1) {
                state[index].quantity += quantity;
            } else {
                state.push({
                    product,
                    quantity
                })
            }
            localStorage.setItem('CARD', JSON.stringify(state))
            return [...state];
        case "DELETE_PRODUCT_IN_CARD":
            var product = action.value;
            index = findProductCard(state, product)
            if (index !== 1) {
                state.splice(index, 1);
            }
            localStorage.setItem('CARD', JSON.stringify(state))
            return [...state];
        case "THEM_SO_LUONG":
            var { product, quantity } = action.value
            index = findProductCard(state, product);
            if (index !== -1) {
                state[index].quantity = state[index].quantity + 1;
            }
            localStorage.setItem('CARD', JSON.stringify(state))
            return [...state];
        case "GIAM_SO_LUONG":
            var { product, quantity } = action.value
            index = findProductCard(state, product);
            if (index !== -1) {
                if (state[index].quantity > 1) {
                    state[index].quantity = state[index].quantity - 1;
                }
                else {
                    state[index].quantity = state[index].quantity
                }
            }
            localStorage.setItem('CARD', JSON.stringify(state))
            return [...state];
        default: return state;
    }

}
var findProductCard = (card, product) => {
    var index = -1;
    if (card.length > 0) {
        for (var i = 0; i < card.length; i++) {
            if (card[i].product._id == product._id) {
                index = i;
                break;

            }
        }
    }
    return index


}

export default Card