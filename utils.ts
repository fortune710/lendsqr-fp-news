import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAuth from './hooks/useAuth';

function withAuthenticationCheck(Component: React.FC) {
  const AuthenticatedComponent: React.FC = (props) => {
    const navigation = useNavigation();
    const { auth } = useAuth();


    return (
        <Component {...props} />
    )
  };

  return AuthenticatedComponent;
}

export default withAuthenticationCheck;