// import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
    let location = useLocation()
    useEffect(() => {
        window.scroll(0, 0)
    }, [location.pathname])
    return (
        <></>
    )
}

export default ScrollToTop