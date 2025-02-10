import React, {useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
function Protected({children,authentication = true}) {

    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector( state => state.status)

    useEffect(() => {
        // console.log('in authlayout:' ,authStatus)
        const user  = authService.getCurrentUser();
        // {console.log('in auth::::',user)}
        if(authentication && authStatus !== authentication)
        {
            navigate('/login')
        } else if(!authentication && authStatus !== authentication)
        {
            navigate('/')
        }
        setLoader(false)
    },[authStatus,navigate,authentication])
    return loader ? <h1>Loading ... </h1> : <>{children}</>
}

export default Protected
