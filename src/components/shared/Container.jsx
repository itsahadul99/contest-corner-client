/* eslint-disable react/prop-types */
const Container = ({ children }) => {
  return (
    <div className='max-w-7xl mx-auto px-4 xl:py-10 lg:py-8 sm:py-2 py-4 '>
      {children}
    </div>
  )
}

export default Container