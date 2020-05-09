export const SIGN_IN = 'SIGN_IN';
export function SignIn(payload) {
    return {
        type: SIGN_IN,
        payload
    }
};

export const GET_UPCOMING = 'GET_UPCOMING';
export function GetUpcoming(payload) {
    return {
        type: GET_UPCOMING,
        payload
    }
}

export const GET_ONGOING = 'GET_ONGOING';
export function GetOngoing(payload) {
    return {
        type: GET_ONGOING,
        payload
    }
}

export const GET_WALLET = 'GET_WALLET';
export function GetWallet(payload) {
    return {
        type: GET_WALLET,
        payload
    }
}

export const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
export function GetTransactions(payload) {
    return {
        type: GET_TRANSACTIONS,
        payload
    }
}

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export function AddNotification(payload) {
    return {
        type: ADD_NOTIFICATION,
        payload
    }
}
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export function RemoveNotification(payload) {
    return {
        type: REMOVE_NOTIFICATION,
        payload
    }
}

export const GET_VERSION = 'GET_VERSION';
export function GetVersion(payload) {
    return {
        type: GET_VERSION,
        payload
    }
}