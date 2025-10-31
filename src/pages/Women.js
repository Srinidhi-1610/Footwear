import React from 'react'
import womenimg1 from '../Images/img 1 women.webp'
import womenimg2 from '../Images/img 2 women.jpg'
import womenimg3 from '../Images/img 3 women.avif'
import womenimg4 from '../Images/img 4 women.webp'
import womenimg5 from '../Images/img5 women.jpg'
import womenimg6 from '../Images/img6 women.webp'
import womenimg7 from '../Images/img7 women.jpg'
import womenimg8 from '../Images/img8 women.webp'
import womenimg9 from '../Images/img9 women.jpg'
import womenimg10 from '../Images/img10 women.avif'
import './Women.css'
import { useSelector,useDispatch } from 'react-redux';
import { addTocart,deleteFromCart } from '../Redux/Cartslice.js';
const Women = () => {
  const products = [
    {
      id:11,
      title: 'Elegant Heels',
      price: '₹765',
      img: womenimg1,
      quantity:1,
    },
    {
      id:12,
      title: 'Floral Flip Flops',
      price: '₹987',
      img: womenimg2,
      quantity:1,
    },
    {
      id:13,
      title: 'Beaded Sandals',
      price: '₹1200',
      img: womenimg3,
      quantity:1,
    },
    {
      id:14,
      title: 'Leather Slides',
      price: '₹1384',
      img: womenimg4,
      quantity:1,
    },
    {
      id:15,
      title: 'ballet slipers',
      price: '₹856',
      img: womenimg5,
      quantity:1,
    },
    {
      id:16,
      title: 'mule slippers',
      price: '₹990',
      img: womenimg6, 
      quantity:1,
    },
    {
      id:17,
     title: 'Bootie slippers',
      price: '₹877',
      img: womenimg7, 
      quantity:1,
    },
    {
      id:18,
     title: 'memory foam slipper',
      price: '₹876',
      img: womenimg8, 
      quantity:1,
    },
    {
      id:19,
     title: 'home use slipper',
      price: '₹200',
      img: womenimg9, 
      quantity:1,
    },
    {
      id:20,
     title: 'orthopedic slipper',
      price: '₹1808',
      img: womenimg10,
      quantity:1, 
    }
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
      <h2>Women Sandals</h2>
      <div className="products-wrapper">
        {products.map((item, index) => (
          <div className="product-card" key={index}>
            <div className="product-image-wrapper">
              <img src={item.img} alt={item.title} />
            </div>
            <h5 className="product-title">{item.title}</h5>
            <p className="product-price">{item.price}</p>
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

export default Women;
