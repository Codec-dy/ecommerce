import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Filters from '../components/Filters';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import Productitem from '../components/Productitem';


const Collection = () => {
  const {products, search, showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [categories,setCategories] = useState([]);
  const [subCategories,setSubCategories] = useState([]);
  const [sortType,setSortType] = useState();
  useEffect(()=>{
    setFilterProducts(products)
  },[]);
  useEffect(()=>{
    applyFilter();
  },[subCategories,categories,search, showSearch]);

  useEffect(()=>{
    sortProduct();
  },[sortType])
  // FUnctions
  const toggleCategory = (e) =>{
    if(categories.includes(e.target.value)){
      setCategories(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setCategories([...categories,e.target.value])
    }
  }

  const toggleSubCategory = (e) =>{
    if(subCategories.includes(e.target.value)){
      setSubCategories(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setSubCategories([...subCategories,e.target.value])
    }
  }

  const applyFilter = () =>{
    let productCopy = products.slice();

    if(showSearch && search){
      productCopy = productCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(categories.length>0){
      productCopy = productCopy.filter(item=>categories.includes(item.category))
    }
    if(subCategories.length>0){
      productCopy = productCopy.filter(item=>subCategories.includes(item.subCategory))
    }
    setFilterProducts(productCopy)
  }

  const sortProduct = ()=>{
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        fpCopy.sort((item1,item2)=>item1.price-item2.price)
          setFilterProducts(fpCopy)
        break;
      case 'high-low':
        fpCopy.sort((item1,item2)=>item2.price-item1.price)
        setFilterProducts(fpCopy)       
        break;

      default:
        applyFilter();
        break;
    }
  }
  

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter Options */}
      <div className='min-w-60'>
        <p onClick={()=>{showFilter?setShowFilter(false):setShowFilter(true)}} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden rotate-90 ${showFilter?'-rotate-90':''}`} alt=''/>
        </p>
        {/* Categories Filter*/}
       <Filters heading="Categories" f1="Men" f2="Women" f3="Kids" showFilter={showFilter} toggleCategory={toggleCategory}/>
        {/* SubCategory filter */}
        <Filters heading="Type" f1="Topwear" f2="Bottomwear" f3="Winterwear" showFilter={showFilter} toggleCategory={toggleSubCategory}/>
      </div>
      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
              filterProducts.map((item,index)=><Productitem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>)
          }

        </div>
      </div>

    </div>
  )
}

export default Collection