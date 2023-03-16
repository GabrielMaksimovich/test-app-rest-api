import React, { memo } from 'react';

export const Banner = memo(() => {
  return (
    <div className="banner">
      <div className="banner__content">
        <h1 className="banner__title">Test assignment for front-end developer</h1>

        <p className="banner__subtitle">What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they will be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>

        <button type="button" className="banner__button">Sign up</button>
      </div>
    </div>
  );
});
