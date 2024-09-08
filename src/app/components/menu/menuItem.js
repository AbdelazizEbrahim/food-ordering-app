export default function MenuItem(){
    return (
        <div className='bg-gray-200 p-4 rounded-lg text-center 
        group hover:bg-white hover:shadow-md hover:shadow-black/25
        transition-all mt-10'>
            <div className='text-center'>
                <img src='/chicken.png' className='max-h-auto max-h-48
                block mx-auto' alt='pizza' />
            </div>
            <h4 className='font-semibold text-xl my-3'>
                Shaworma Chicken
            </h4>
            <p className='text-gray-500 text-sm'>
                Sint veniam dolore consequat labore enim ea eu. Cillum deserunt 
                velit culpa fugiat Lorem dolore pariatur quis.
            </p>
            <button className='mt-4 bg-primary text-white rounded-full px-8 py-2'>
                Add to cart $12
            </button>
        </div>
    )
}