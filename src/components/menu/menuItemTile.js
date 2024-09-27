export default function MenuItemTile({onAddToCart, ...item}) {
    const {image, description, itemName, price, sizes, ingridients} = item;
  
    const hasSizesOrExtras = sizes?.length > 0 || ingridients?.length > 0;
  
    return (
      <div className='bg-gray-200 p-4 rounded-lg text-center 
        group hover:bg-white hover:shadow-md hover:shadow-black/25
        transition-all mt-10'>
        
        <div className='text-center'>
          <img src={image} className='max-h-auto max-h-48 block mx-auto' alt='item' />
        </div>
        
        <h4 className='font-semibold text-xl my-3'>{itemName}</h4>
        
        <p className='text-gray-500 text-sm line-clamp-3 '>{description}</p>
        
        <button 
          type="button"
          onClick={onAddToCart}
          className='mt-4 bg-primary text-white rounded-full px-8 py-2'>
          {hasSizesOrExtras ? (
            <span>Add to cart (from Br.{price})</span>
          ) : (
            <span>Add to cart Br.{price}</span>
          )}
        </button>
        
      </div>
    );
  }
  