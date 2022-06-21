import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { fetchAllMarketItems } from '../redux/actions/marketItemsAction';
import { Row, Col, Card, Button } from 'react-bootstrap'
const web3Service = require('../web3I/web3i');

const Practice = () => {

    const [count, setCount] = useState(0);

    return (
        <>
            <div className="text-center" >
                <h3 className="mt-3">{count}</h3>
                <Button onClick={()=>{setCount(count+1)}}>increment</Button>
            </div>
        </>
    )
}

export default Practice