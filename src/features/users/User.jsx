import React from 'react'
import { useSelector } from 'react-redux'


const User = (id) => {
    const users = useSelector(state => state.users)
    
    return (
        <div className='idCard'>
            {Object.values(users)[id].name}    
        </div>
    )
}

export default User