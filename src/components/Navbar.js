import {
    Link
} from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const web3Service = require('../web3I/web3i');


const Navigation = () => {
    const auth = useSelector((state) => state.userReducer);
    const subscribeToEvent = async () =>{
        console.log("function calledddddd");
        const accounts = await web3Service.web3.eth.getAccounts();
        if(accounts[0] === "0x30Aa2943D0A59AC256F5feAD0b1feae5c50C4605")
        {
            console.log("comming from inside if");
            let options = {
                filter: {
                    value: [],
                },
                fromBlock: 0,
            };
            const marketPlaceContract = new web3Service.web3.eth.Contract(JSON.parse(process.env.REACT_APP_MARKETPLACE_CONTRACT_ABI), process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS);
    
            marketPlaceContract.events.MarketItemCreated(options)
                .on('data', function(event){
                    console.log(event,"some data event called qqq"); // same results as the optional callback above
                    if(event.returnValues.itemId > 22)
                    {
                        toast.success("new Item has been Listed with Id = "+ event.returnValues.itemId, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
                    }
                    // event.returnValues.seller
                    // .price.
                    // tokenId
                    // item
                })
                .on('changed', function(event){
                    console.log(event, "changedddddddd"); // same results as the optional callback above
                })
                .on('error' , function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                    console.log(error,receipt, "errorrrrrrrrr")
                })
                .on('connected', function(subscriptionId){
                    console.log("chave subscribed to a specifc event with id = ",subscriptionId);
                })
        }
    }
       useEffect(() => {
        const func = async ()=>{
            await subscribeToEvent();
        }   
        func();
      }, []);
    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="http://www.dappuniversity.com/bootcamp">
                        &nbsp; Web3 Practice Dapp
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/create-fp">Create</Nav.Link>
                            <Nav.Link as={Link} to="/my-listed-items">My Listed NFTs</Nav.Link>
                            {/* <Nav.Link as={Link} to="/my-purchases">My Purchases</Nav.Link> */}
                        </Nav>
                        <Nav>
                            {auth.wallet ? (
                                <Nav.Link
                                    href={`https://etherscan.io/address/${auth.wallet}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button nav-button btn-sm mx-4">
                                    <Button variant="outline-light" >
                                        {auth.wallet.slice(0, 5) + '...' + auth.wallet.slice(38, 42)}
                                    </Button>
                                    
                                </Nav.Link>
                            ) : (
                                    <Navigate to="/connect-to-wallet" />
                                // <Button onClick={web3Handler} variant="outline-light">Connect Wallet</Button>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ToastContainer />
            <Outlet/>
        </>

    )

}

export default Navigation;