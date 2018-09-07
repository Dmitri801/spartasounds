import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
const signupImg = require('../../../resources/Images/sparta_promo_img.jpeg')
const HomeSignup = (props) => {

    const signupPromo = {
        img: `${signupImg}`,
        lineOne: 'Receive updates and promotions',
        lineTwo: 'When you become a member',
        linkTitle: 'Register',
        linkTo: '/register'
    }

    const renderSignupPromo = () => {
        return (
            signupPromo ? (
                <div className="signupPromo_img"
                 style={{
                     background: `url(${signupPromo.img})`
                 }}
                >
                    <div className="signup_promo title">{signupPromo.lineOne}</div>
                    <div className="signup_promo low_title">{signupPromo.lineTwo}</div>
                    <div className="signup_promo_btn">
                        <Link to={signupPromo.linkTo}>
                        <Button disableFocusRipple>
                            {signupPromo.linkTitle}
                        </Button>
                        </Link>
                    </div>
                </div>
            )
            : null
        )
    }

  return (
    <div className="homeSignup">
      {renderSignupPromo()}
    </div>
  )
}

export default HomeSignup;
