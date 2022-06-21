// import {useEffect} from "react";
import { Button } from 'react-bootstrap';
import Web3 from "web3";
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { connectWallet } from '../redux/actions/userAction';
import { useDispatch } from "react-redux";

const ConnectWallet = () => {
  const auth = useSelector((state) => state.userReducer);
  // const wallet = auth.wallet;
  console.log("this is auth",auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  };
  const onConnect = async() => {
    try {
      const currentProvider = detectCurrentProvider();
      if(currentProvider) {
        await currentProvider.request({method: 'eth_requestAccounts'});
        const web3 = new Web3(currentProvider);
        const userAccount  =await web3.eth.getAccounts();
        const account = userAccount[0];
            // const accounts = await window.ethereum.request({
            // method: "wallet_requestPermissions",
            // params: [{
            //     eth_accounts: {}
            // }]
            // }).then(() => window.ethereum.request({
            //     method: 'eth_requestAccounts'
            // }))
            // const account = accounts[0]
            // console.log("this is eath balance",account)
        if(account){
          dispatch(connectWallet(account))
          navigate('/')
        }
      }
    } catch(err) {
      console.log(err);
    }
  }
        return (
            <div className="text-center" >
              <h1 style={{marginTop:"5%"}}>Welcome to web3 Practice Dapp {auth.wallet}</h1>
                    <Button variant="warning" style={{marginTop:"15%"}} onClick={onConnect}>Connect with Wallet</Button>{' '}
            </div>
          
        );
    
}
export default ConnectWallet