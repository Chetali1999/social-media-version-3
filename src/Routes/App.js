import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from 'react';
import SideBar from '../Components/Side-bar'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import PostListProvider from '../Store/Post-list-store';
import { Outlet } from 'react-router-dom';

function App() {

  const [selectedTab, setSelectedTab] = useState("Home");

  return (

    <PostListProvider>
      <div className='app-container'>
        <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className='content'>
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
