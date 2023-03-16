import React, { memo, useEffect, useState } from 'react';
import { getCards } from '../api/user';
import '../styles/main.scss';
import { User } from '../types/user';

export const Cards = memo(
  () => {
    const [cards, setCards] = useState< User[] | null >(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getCards();

          setCards(response.users);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      };

      fetchData();
    }, []);

    return (
      <div className="card-profile">
        <h1 className="card-profile__title">
          Working with GET request
        </h1>

        <div className="card-profile__container">
          {cards && (
            <>
              {cards.map(card => (
                <div key={card.id} className="card-box">
                  <img className="card-box__image" src={card.photo} alt="" />

                  <div className="card-box__description description">
                    <p
                      className="description__name"
                    >
                      {card.name}
                    </p>

                    <p>{card.position}</p>

                    <p>{card.email}</p>

                    <p>{card.phone}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <button type="button" className="btn">
          Show more
        </button>
      </div>
    );
  },
);
