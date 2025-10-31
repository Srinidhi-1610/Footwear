import React from 'react';
import indeximg from '../Images/index img.jpg';
import './Index.css'; // Make sure the path is correct

const Index = () => {
  return (
    <div>
      <header className="header">
        <div className="container">
          <h1>Welcome to Footwear Store</h1>
          <p className="lead">Explore footwear for everyone</p>
          <img src={indeximg} alt="Footwear promotional" />
        </div>
      </header>
    </div>
  );
};

export default Index;
