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