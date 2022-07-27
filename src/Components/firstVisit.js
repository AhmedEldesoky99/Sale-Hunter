import React from 'react'
import img from '../Assets/Images/sign_in_pop_up.png'
import googleButton from '../Assets/Images/download-app.svg'
import "../styles/first-visit.css"

const ar= localStorage['ar']
const dark = localStorage['darkMode']
const FirstVisit = () => {
  const closeFirstVisit = () => {
    document.querySelector('.first-visit').classList.remove('active')
  }

  
  return (
    <div className={`first-visit ${dark? 'dark': ''}`}>
        <div className='first-visit-overlay'></div>

        <div className='first-visit-box'>

            <svg onClick={() => closeFirstVisit()} xmlns="http://www.w3.org/2000/svg" className="first-visit-close" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

            <h2 className={`first-visit-title t-center ${ar?'ar':''}`}>
              {ar? 'يمكنك تحميل تطبيقاتنا الآن' : 'You can download our app now!'}
            </h2>
            
            <img className='first-visit-main-img' src={img} alt ='download our app' title='download our app' />
            <img className='first-visit-store-img' src={googleButton} alt ='get on google play' title='get on google play' />
            <img className='first-visit-store-img' src={googleButton} alt ='get on app store' title='get on app store' />

        </div>
    </div>
  )
}

export default FirstVisit