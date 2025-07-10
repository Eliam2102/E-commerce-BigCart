import React from 'react';
import "../assets/styles/Page404.css";
import imagePath from '../assets/img/page404-build.svg';

const Page404: React.FC = () => {
  return (
    <div className="page-404-container">
      <h1 className="page-404-title">404 - Page Not Found</h1>
      <img className="page-404-image" src={imagePath} alt="404 Not Found" />
      <p className="page-404-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus eros aliquet convallis ultricies.
      </p>
    </div>
  );
};

export default Page404;
