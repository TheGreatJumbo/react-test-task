import React from 'react'

const Loader = () => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='lds-ring'><div/><div/><div/></div>
        </div>
    )
}
export default Loader