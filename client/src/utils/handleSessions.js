import Cookies from 'js-cookie';
import API from './API';

export const getCookie = () => {
  const cookie = Cookies.get('userId')
  console.log(cookie)}

export const authUser = () => {
    const cookie = Cookies.get('userId');
    console.log(cookie);
    return  API.authUser();
  }
  
export const logOut = () => {
  Cookies.remove()
}
