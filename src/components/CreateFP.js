import { useState } from 'react'
import { Row, Form, Button } from 'react-bootstrap'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useSelector } from 'react-redux';
import "../spinner.css";
import { useNavigate } from 'react-router';
const web3Service = require('../web3I/web3i');
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const CreateFP = () => {
  const auth = useSelector((state) => state.userReducer);
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate();
  const [description, setDescription] = useState('')
  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file)
        console.log("abcdefg",result)
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
      } catch (error){
        console.log("ipfs image upload error: ", error)
      }
    }
  }
  const createNFTandItem = async () => {
    document.getElementById("loading").innerHTML = "<h3> Please be Patient It may take 3 to 5 mins .....<h3>";

    if (!image || !price || !name || !description) return
    try{
      const result = await client.add(JSON.stringify({image, name, description}))
      console.log("this is create nft",result);
      const tokenId = await web3Service.createNftItem(result);
      console.log("this is the token Id outside",tokenId);
      if(tokenId !== null){
        console.log("this is the token Id inside",tokenId);
        const account = auth.wallet;
        const priceinwei = await web3Service.web3.utils.toWei(price.toString(),'ether');
        await web3Service.createMarketItem({tokenId,price:priceinwei,account});
        document.getElementById("loading").innerHTML = "";
        navigate("/");
      }

    } catch(error) {
    document.getElementById("loading").innerHTML = "<h3 class='text-danger' Something went wrong Please try Again </h3>";
      console.log("ipfs uri upload error: ", error)
    }
  }
  return (
    <div className="container-fluid mt-5" >
        <div className="text-center" >
            <h3 >Crete Market Place Item</h3>
            <div id="loading">
                
            </div>
        </div>

      <div className="row">
          
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '800px' }}>
          <div className="content mx-auto mt-5">
            <Row className="g-4">
              <Form.Control
                type="file"
                required
                name="file"
                onChange={uploadToIPFS}
              />
              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
              <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
              <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
                <div className="d-grid px-0">
                    <Button onClick={createNFTandItem} variant="primary" size="lg">
                    Create & List NFT!
                    </Button>
                </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CreateFP