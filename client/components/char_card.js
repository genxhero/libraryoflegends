/**
 * Expected Props
 * 
 */

 import React from 'react';

 const CharCard = (props) => {
     const {char, cool} = props;

      return (
        <div
          className={`char-snippet ${cool}`}
          key={`${char.firstName}${timestamp}${char.lastName}${char.id}`}
          value={`${char.id}`}
        >
          <div className={`char-snippet-name ${cool}`}>
            {char.firstName} {char.lastName}
          </div>
          <div className={`char-snippet-class ${cool}`}>
            {char.level}
            {numberSuffix(char.level)} level {capitalize(char.class)}
          </div>

          <div className={`char-thumb-container ${cool}`}>
            <img
              className={`char-thumb ${cool}`}
              src={
                char.image
                  ? `${char.image}`
                  : "http://www.clarkegroup.co.uk/wp-content/uploads/2014/10/placeholder-employee.jpg"
              }
            />
          </div>
          <Link to={`/characters/${char.id}`} className={`link-button ${cool}`}>
            VIEW PROFILE
          </Link>
        </div>
      );
 }