import React from 'react'
import img1kids from '../Images/img 1 kids.webp'
import img2kids from '../Images/img 2 kids.jpg'
import img3kids from '../Images/img 3 kids.jpg'
import img4kids from '../Images/img 4 kids.jpg'
import img5kids from '../Images/img 5 kids.jpg'
import img6kids from '../Images/img6 kids.webp'
import img7kids from '../Images/img 7 kids.jpg'
import img8kids from '../Images/img 8 kids.jpg'
import img9kids from '../Images/img 9 kids.jpeg'
import img10kids from '../Images/img 10 kids.jpeg'
import { useSelector,useDispatch } from 'react-redux';
import { addTocart,deleteFromCart } from '../Redux/Cartslice.js';

import './Kids.css'
const Kids = () => {
  const products = [
    {
      id:21,
      title: 'Cartoon Sandals',
      price: '₹440',
      img: img1kids,
      quantity:1,
    },
    {
      id:22,
      title: 'Light Up Slippers',
      price: '₹500',
      img: img2kids,
      quantity:1,
    },
    {
      id:23,
      title: 'Velcro Straps',
      price: '₹1000',
      img: img3kids,
      quantity:1,
    },
    {
      id:24,
      title: 'Water Sandals',
      price: '₹500',
      img: img4kids,
      quantity:1,
    },
     {
      id:25,
      title: 'Flip flop slipper',
      price: '₹200',
      img: img5kids,
      quantity:1,
    },
     {
      id:26,
      title: 'Slide slipper',
      price: '₹499',
      img: img6kids,
      quantity:1,
    },
     {
      id:27,
      title: 'Bootie slipper',
      price: '₹999',
      img: img7kids,
      quantity:1,
    },
    {
      id:28,
      title: 'Animal face slipper',
      price: '₹350',
      img: img8kids,
      quantity:1,
    },
    {
      id:29,
      title: 'Home Boot slipper',
      price: '₹450',
      img: img9kids,
      quantity:1,
    },
     {
      id:30,
      title: 'Seasonal slipper',
      price: '₹250',
      img: img10kids,
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
    <div className="container py-4">
      <h2 className="text-center mb-4">Kids Sandals</h2>
      <div className="row g-4">
        {products.map((item, index) => (
          <div className="col-md-6" key={index}>
            <div className="card h-100 text-center">
              <img src={item.img} alt={item.title} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.price}</p>
                {                   cartitems.find(reduxdata=>reduxdata.id===item.id)?
                              (
                                    <button class="btn btn-danger cartbutton" onClick={()=>deleteCart(item)} > Remove From Cart </button>
                                    )
                                    :
                                    (<button class="btn btn-danger cartbutton"  onClick={()=>addCart(item)} > Add To Cart </button>
                                  )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        {/* {<Link to="/" className="btn btn-secondary">⬅ Back to Home</Link> */}
      </div>
    </div>
  );
};

export default Kids;
