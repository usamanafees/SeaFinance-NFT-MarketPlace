import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { fetchMyMarketItems } from '../redux/actions/marketItemsAction';
import { Row, Col, Card, Button } from 'react-bootstrap'
const web3Service = require('../web3I/web3i');

const MyListedNFTs = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const auth = useSelector((state) => state.userReducer);
    const marketItems = useSelector((state) => state.marketItems);
    useEffect(() => {
        dispatch(fetchMyMarketItems({account:auth.wallet,type:"mynfts"}))
      },[]);
    const items = marketItems.myMarketItems;
    return (
        <>
            <div className="text-center" >
                <h3 className="mt-3">My Listed NFTs (not been sold yet)</h3>
                <div id="loading">
                    
                </div>
            </div>
            <div className="flex justify-center">
            {items.length > 0 ?
                <div className="px-5 container">
                <Row xs={1} md={2} lg={4} className="g-4 py-5">
                    {items.map((item, idx) => (
                    <Col key={idx} className="overflow-hidden">
                        <Card>
                        <Card.Img height={'270px'} variant="top" src={item.metadata.image} />
                        <Card.Body color="secondary">
                            <Card.Title>{item.metadata.name}</Card.Title>
                            <Card.Text>
                            {item.metadata.description}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <div className='d-grid'>
                            {/* <Button  variant="primary" size="lg" id={`itm${item.item.itemId}`}> */}
                                Will be sold for {web3Service.web3.utils.fromWei(item.item.price.toString(),'ether')} ETH
                            {/* </Button> */}
                            </div>
                        </Card.Footer>
                        </Card>
                    </Col>
                    ))}
                </Row>
                </div>
                : (
                <main style={{ padding: "1rem 0" }}>
                    <div className="text-center" >
                        <h3 >Loading ...</h3>
                    </div>
                </main>
                )}
            </div>
        </>
    )
}

export default MyListedNFTs