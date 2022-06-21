import { Routes, Route } from 'react-router-dom';
import ProctedComponent from './components/ProctedComponent';
import ConnectWallet from './components/ConnectWallet';
import  Home from './components/Home';
import  Missing from './components/Missing';
import Navigation from './components/Navbar';
import CreateFP from './components/CreateFP';
import MyListedNFTs from './components/MyListedNFTs';
import PracticeHome from './components/PracticeHome';
import Practice from './components/Practice';
function App() {
  return (
    <Routes >
      {/* <Route path="/" element={<Layout />}> */}
        <Route index path="connect-to-wallet" element={<ConnectWallet />}/>
        <Route index path="practice" element={<Practice />}/>
          <Route element={<ProctedComponent/>}>
                <Route element={<Navigation/>}>
                    <Route  path="/" element={<Home />} />
                    <Route  path="/create-fp" element={<CreateFP />} />
                    <Route  path="/my-listed-items" element={<MyListedNFTs />} />
                    <Route index path="/practice-to-home" element={<PracticeHome />}/>

                </Route>
          </Route>
        <Route path="*" element={<Missing />} />
        
      {/* </Route> */}
  </Routes>
  );
}

export default App;