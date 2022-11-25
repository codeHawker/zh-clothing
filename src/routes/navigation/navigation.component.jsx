import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { ReactComponent as ZHLogo } from '../../assets/zh-clothing.svg';

import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../store/user/user.selector';
import { signOutStart } from '../../store/user/user.action';

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';
import { selectIsCartOpen } from '../../store/cart/cart.selector';


const Navigation = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)

  const signOutHandler = async () => {
    dispatch(signOutStart())
  }

  return(
    <Fragment>
        <NavigationContainer>

            <LogoContainer to='/' >
                <ZHLogo className= 'logo' ></ZHLogo>
                {/* <CrwnLogo className= 'logo' ></CrwnLogo> */}
            </LogoContainer>

            <NavLinks >
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                {
                  currentUser? (
                    <NavLink as='span' onClick={signOutHandler}>
                      SIGN OUT
                    </NavLink>
                  ) : (
                    <NavLink to='/auth'>
                      SIGN IN
                    </NavLink>
                  )
                }
                <CartIcon/>
            </NavLinks>
            
            {isCartOpen && <CartDropdown />}

        </NavigationContainer>
      <Outlet />
    </Fragment>
  )
};

export default Navigation