import React from 'react';
import img1men from '../Images/img 1 men.jpg';
import img2men from '../Images/img 2 men.webp';
import img3men from '../Images/img 3 men.webp';
import img4men from '../Images/img 4 men.webp';
import img5men from '../Images/img5 men.jpeg';
import img6men from '../Images/img6 men.jpeg';
import img7men from '../Images/img7 men.jpeg';
import img8men from '../Images/img 8 men.jpeg';
import img9men from '../Images/img 9 men.jpg';
import img10men from '../Images/img 10 men.jpg';
import { useSelector,useDispatch } from 'react-redux';
import { addTocart,deleteFromCart } from '../Redux/Cartslice.js';

import './Men.css';

const Men = () => {
  const products = [
    {
      id:1,
      title: 'Leather Sandals',
      price: '₹200',
      img: img1men,
      quantity:1,
    },
    {
      id:2,
      title: 'Casual Slippers',
      price: '₹599',
      img: img2men,
      quantity:1,
    },
    {
      id:3,
      title: 'Sports Chappal',
      price: '₹467',
      img: img3men,
      quantity:1,
      
    },
    {
      id:4,
      title: 'Outdoor Sandals',
      price: '₹786',
      img: img4men,
      quantity:1,
    },
    {
      id:5,
      title: 'clog slipper',
      price: '₹655',
      img: img5men,
      quantity:1,
    },
    {
      id:6,
      title: 'Bootie slipper',
      price: '₹987',
      img: img6men,
      quantity:1,
    },
    {
      id:7,
      title: 'Moccasins',
      price: '₹533',
      img: img7men,
      quantity:1,
    },
    {
      id:8,
      title: 'Rubber slippers',
      price: '₹300',
      img: img8men,
      quantity:1,
    },
    {
      id:9,
      title: 'Indoor Foam',
      price: '₹853',
      img: img9men,
      quantity:1,
    },
    {
      id:10,
      title: 'Character slipper',
      price: '₹452',
      img: img10men,
      quantity:1,
    },
  ];
const cartitems=useSelector((state)=>state.cart.cartitems);
const dispatch=useDispatch();
const addCart=(item)=>{
    dispatch(addTocart(item))
  }
const deleteCart=(item)=>{
    dispatch(deleteFromCart(item))
}
  return (
    <div className="container">
      <h2>Men Sandals</h2>
      <div className="products-wrapper">
        {products.map((item, index) => (
          <div className="product-card" key={index}>
            <div className="product-image-wrapper">
              <img src={item.img} alt={item.title} />
            </div>
            <div className="product-title">{item.title}</div>
            <div className="product-price">{item.price}</div>
            {                   cartitems.find(reduxdata=>reduxdata.id===item.id)?
                              (
                                    <button class="btn btn-danger cartbutton" onClick={()=>deleteCart(item)} > Remove From Cart </button>
                                    )
                                    :
                                    (<button class="btn btn-danger cartbutton"  onClick={()=>addCart(item)} > Add To Cart </button>
                                  )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Men;
