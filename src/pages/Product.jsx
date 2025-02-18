import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const {productId} = useParams();
  const {products,currency,cartItems,addToCart} = useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const [image,setImage] = useState('')
  const [size, setSize] = useState('')
  const fetchProductData = async() =>{
   
    products.map((item)=>{
      if(item._id==productId){
        setProductData(item)
        setImage(item.image[0])
        return null  
      }
      
    })
  
  }

  useEffect(()=>{
    fetchProductData()
    console.log(productData)
  },[productId])
  return productData? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
              {
                productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />))
              }
          </div>
          <div className='w-full sm:w-[80%]'>
              <img className='w-full h-auto' src={image} alt="" />
          </div>

        </div>
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
          </div>
          <p className='mt-5 text-3xl font-medium'> {currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item,index)=>{
                return <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-200 ${size===item?'border-orange-500':''}`} key={index}>{item}</button>
              })}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className='mt-7 bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD to CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* Description & Review Section  */}
        <div className='mt-20'>
              <div className='flex'>
                <b className='border px-5 py-3 text-sm'>Description</b>
                <p className='border px-5 py-3 text-sm'>Reviews</p>
              </div>
              <div className='flex flex-col gap-4 border p-6 text-sm text-gray-500'>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque temporibus dolore soluta maiores molestias doloremque nulla necessitatibus quaerat excepturi illum.</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat accusantium nostrum consequuntur quod provident delectus?</p>
              </div>
        </div>
      {/* Display Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-100'></div>
}

export default Product

