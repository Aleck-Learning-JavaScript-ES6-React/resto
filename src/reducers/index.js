const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    total: 0
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED': 
            return {
                ...state,
                menu: action.payload, 
                loading: false,
                error: false
            };
        case 'MENU_REQUESTED': 
            return {
                ...state,
                menu: state.menu, 
                loading: true,
                error: false
            }; 
        case 'MENU_ERROR': 
            return {
                ...state,
                menu: state.menu, 
                loading: false,
                error: true
            };    
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;
            const item = state.menu.find(item => item.id === id);
            const itemInCart = state.items.find(item => item.id === id);            
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                qty: (itemInCart===undefined) ? 1 : itemInCart.qty + 1
            };
            if (itemInCart !== undefined){
                const itemIndex = state.items.findIndex(item => item.id === id);
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0,itemIndex),
                        newItem,
                        ...state.items.slice(itemIndex+1)
                    ],
                    total: state.total + newItem.price
                }
            }
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ],
                total: state.total + newItem.price
            };
        case 'ITEM_REMOVE_FROM_CART':
            const ind = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === ind);
            const deletingItem = state.items.find(item => item.id === ind);
            if (deletingItem.qty > 1) {
                const newItem = {
                    title: deletingItem.title,
                    price: deletingItem.price,
                    url: deletingItem.url,
                    id: deletingItem.id,
                    qty: deletingItem.qty - 1
                }; 
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0,itemIndex),
                        newItem,
                        ...state.items.slice(itemIndex+1)
                    ],
                    total: state.total - newItem.price
                }   
            }
            return {
                ...state,
                total: state.total - deletingItem.price,
                items: [
                    ...state.items.slice(0,itemIndex),
                    ...state.items.slice(itemIndex+1)
                ] 
            }
        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
                total: 0
            };
        default: 
            return state; 
    }
}

export default reducer;