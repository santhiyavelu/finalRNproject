import {useDispatch} from 'react-redux';
import {logOut} from '../feature/userSlice/UserSlice';

const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    console.log('Logged out'); // Optional: Add any additional logic you need here
  };

  return handleLogout;
};

export default useLogout;
