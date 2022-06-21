import { create as ipfsHttpClient } from 'ipfs-http-client'
const web3Service = require('../../web3I/web3i');
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

export const setAllMarketItems = (payload) => ({ type: "FETCHALL_MARKET_ITEMS", payload})
export const setMyMarketItems = (payload) => ({ type: "FETCHMY_MARKET_ITEMS", payload})


export const fetchAllMarketItems = (account) => async (dispatch) => {
    const marketItems =  await web3Service.fetchMarketItems(account);
    await dispatch(setAllMarketItems(marketItems))
}
export const fetchMyMarketItems = (account) => async (dispatch) => {
    const mymarketItems =  await web3Service.fetchMarketItems(account);
    await dispatch(setMyMarketItems(mymarketItems))
}
