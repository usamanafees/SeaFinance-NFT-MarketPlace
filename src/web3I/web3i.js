
require('dotenv').config()
const Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const web3 = new Web3(window.ethereum);
const axios =  require('axios');
// const contractNFT =[{"inputs":[{"internalType":"address","name":"marketplaceAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"tokenURI","type":"string"}],"name":"createToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]
// console.log("abiiiiiiiiiiiiiiiiiii",process.env.REACT_APP_NFT_CONTRACT_ABI,process.env.REACT_APP_NFT_CONTRACT_ADDRESS);


const createNftItem = async (data_)=> { 

    let tokenId = null;
    const accounts = await web3.eth.getAccounts();
    console.log("accounts from web", accounts,"this is path", `https://ipfs.infura.io/ipfs/${data_.path}`);
    // const contract = web3.eth.Contract(ABI, address);
    const nftContract = new web3.eth.Contract(JSON.parse(process.env.REACT_APP_NFT_CONTRACT_ABI), process.env.REACT_APP_NFT_CONTRACT_ADDRESS);
    const calculateEstimateGas = await nftContract.methods.createToken(`https://ipfs.infura.io/ipfs/${data_.path}`).estimateGas({from: accounts[0]});
    console.log("estimatedGasFees",calculateEstimateGas);
    // const estimatedGasInWei = web3.utils.toWei( calculateEstimateGas.toString());

    async function waitForReceipt(hash, cb) {
        web3.eth.getTransactionReceipt(hash, function (err, receipt) {
          if (err) {
            throw err
          }
          console.log("receipt",receipt);
          if (receipt !== null) {
            // Transaction went through
            if (cb) {
              cb(receipt);
            }
          } else {
            // Try again in 1 second
            window.setTimeout(function () {
              waitForReceipt(hash, cb);
            }, 3000);
          }
        });
      }
        const transaction = await nftContract.methods.createToken(`https://ipfs.infura.io/ipfs/${data_.path}`).send({
            from: accounts[0],
            gas: calculateEstimateGas
        }).on('transactionHash', async function(hash){
            await waitForReceipt(hash, function (receipt) {
            let logs = receipt.logs;
            console.log("this is token idd",web3.utils.hexToNumber(logs[0].topics[3]));
            tokenId = web3.utils.hexToNumber(logs[0].topics[3]);
                
            });
        });
       
        // .on('receipt', function(receipt){
        //     let logs = receipt.logs;
        //     console.log("this is token id",web3.utils.hexToNumber(logs[0].topics[3]));
        //     tokenId = web3.utils.hexToNumber(logs[0].topics[3]);
        // })



    // .on('receipt', function(receipt){
    //     console.log(web3.utils.hexToNumber(receipt?.logs[0].topics[3])); // this prints the hex value of the tokenId
    //     tokenId = web3.utils.hexToNumber(receipt?.logs[0].topics[3]);
    // });
    return tokenId;
    // const data =  nftContract.methods.createToken(data_?.path).encodeABI()
    // const userAccount  = await web3.eth.getAccounts();
    // const account = userAccount[0];
    // web3.eth.sendTransaction({
    //     // nonce:web3.utils.toHex(txCount),
    //     // gasLimit: web3.utils.toHex(210000), 
    //     // gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
    //     from: account,
    //     to: process.env.REACT_APP_NFT_CONTRACT_ADDRESS,
    //     data:data
    // })
    // .then(function(receipt){
    //     console.log("this is receipt", receipt)
    // });
    // web3.eth.sendTransaction({from: account1, to: account2, value: web3.utils.toWei('1','ether')})
}

const createMarketItem =  async (data) =>{
    console.log("came into market itemmmmmmm",data);
    const marketPlaceContract = new web3.eth.Contract(JSON.parse(process.env.REACT_APP_MARKETPLACE_CONTRACT_ABI), process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS);
    const listingFee = web3.utils.toHex(web3.utils.toWei('0.01','ether'));
    const calculateEstimateGas = await marketPlaceContract.methods.createMarketItem(process.env.REACT_APP_NFT_CONTRACT_ADDRESS,data.tokenId,data.price).estimateGas({from: data.account,value:listingFee});
    console.log("estimatedGasFees",calculateEstimateGas);
    // const estimatedGasInWei = web3.utils.toWei( calculateEstimateGas.toString());
    const transaction = await marketPlaceContract.methods.createMarketItem(process.env.REACT_APP_NFT_CONTRACT_ADDRESS,data.tokenId,data.price).send({
        value: web3.utils.toHex(web3.utils.toWei('0.01','ether')),
        from: data.account,
        gas: calculateEstimateGas
        
    })
    
    console.log("new market Item have been created with this list",transaction)

}

const fetchMarketItems =  async (data) => {
    const marketPlaceContract = new web3.eth.Contract(JSON.parse(process.env.REACT_APP_MARKETPLACE_CONTRACT_ABI), process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS);
    const marketItems =  await marketPlaceContract.methods.fetchMyNFTs().call()
    const nftContract = new web3.eth.Contract(JSON.parse(process.env.REACT_APP_NFT_CONTRACT_ABI), process.env.REACT_APP_NFT_CONTRACT_ADDRESS);
    let marketItemList = [];
    for(let i=0; i<marketItems.length;i++){
        const uri = await nftContract.methods.tokenURI(marketItems[i].tokenId).call();
        try {
            const response = await axios.get(uri.toString());
            if(response.status == 200 ){
                if(data.type =="home")
                {
                    if(marketItems[i].seller !== data.account){
                        console.log("seller home",marketItems[i].seller)
                        marketItemList.push({item:marketItems[i],metadata:response.data})
                    }
                }else{
                    if(marketItems[i].seller === data.account){
                        console.log("seller",marketItems[i].seller)
                        marketItemList.push({item:marketItems[i],metadata:response.data})
                    }
                }
                
            }
        } catch (error) {

        }
    }
    console.log("items list",marketItemList)
    return marketItemList;
}

const buyMarketItem = async (data,account) => {
    console.log("this is data",data.item.price,account,process.env.REACT_APP_NFT_CONTRACT_ADDRESS);
    const marketPlaceContract = new web3.eth.Contract(JSON.parse(process.env.REACT_APP_MARKETPLACE_CONTRACT_ABI), process.env.REACT_APP_MARKETPLACE_CONTRACT_ADDRESS);
    // const price = web3.utils.toHex(web3.utils.toWei('0.01','ether'));
    const calculateEstimateGas = await marketPlaceContract.methods.createMarketSale(process.env.REACT_APP_NFT_CONTRACT_ADDRESS,data.item.itemId).estimateGas({from:account,value:data.item.price});
    console.log("estimatedGasFees",calculateEstimateGas);
    // const estimatedGasInWei = web3.utils.toWei( calculateEstimateGas.toString());
    const transaction = await marketPlaceContract.methods.createMarketSale(process.env.REACT_APP_NFT_CONTRACT_ADDRESS,data.item.itemId).send({
        value: web3.utils.toHex(data.item.price),
        from: account,
        gas: calculateEstimateGas
        
    })
    console.log("buy nft result",calculateEstimateGas)
    return calculateEstimateGas;
}
module.exports = {
    // marketPlaceContract,
    buyMarketItem,
    fetchMarketItems,
    createMarketItem,
    createNftItem,
    web3
}