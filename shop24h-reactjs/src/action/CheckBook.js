var data = JSON.parse(localStorage.getItem('CHECK'));
var initialState = data ? data : []
const CheckBook = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case "CHON_SAN_PHAM":
            var { product, quantity } = action.value
            state.push({
                product,
                quantity
            })

            localStorage.setItem('CHECK', JSON.stringify(state))
            return [...state];
        case "BO_SAN_PHAM":
            var product = action.value;
            index = findProductCard(state, product)
            if (index !== 1) {
                state.splice(index, 1);
            }
            localStorage.setItem('CHECK', JSON.stringify(state))

            return [...state];
        case "KHONG_CHON_CA":
            localStorage.removeItem('CHECK');
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

export default CheckBook