import React from 'react';
import AuthPage from '../components/AuthPage';
import HomepageHeader from '../components/HomepageHeader';

const AuthRoute: React.FC = () => {
  return (
    <>
      <HomepageHeader />
      <AuthPage />
    </>
  );
};

export default AuthRoute; 