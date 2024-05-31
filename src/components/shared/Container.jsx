/* eslint-disable react/prop-types */
const Container = ({ children }) => {
    return (
      <div className='max-w-7xl mx-auto xl:px-10 lg:px-8 sm:px-2 px-4'>
        {children}
      </div>
    )
  }
  
  export default Container