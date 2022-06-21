// Action Creators
import axios from "axios";
const LOGIN_URL = '/auth/login';

export const setWalletAccount = (payload) => ({ type: "CONNECT_WALLET", payload})

export const removeWalletAccount = () => ({type: "DISCONNECT_WALLET"})

export const connectWallet = (account) => async (dispatch) => {
    // localStorage.setItem("wallet_account",account)
    await dispatch(setWalletAccount(account))
}
export const disconnectWallet = () =>  async dispatch => {
    // localStorage.removeItem("wallet_account")
    await dispatch(removeWalletAccount())
}
