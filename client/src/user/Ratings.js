import React, { useState } from 'react';
import { MDBRating } from 'mdbreact';

const RatingPage = () => {
  const [basic] = useState([
    {
      tooltip: 'Very Bad'
    },
    {
      tooltip: 'Poor'
    },
    {
      tooltip: 'Ok'
    },
    {
      tooltip: 'Good',
      choosed: true
    },
    {
      tooltip: 'Excellent'
    }
  ]);

  return (
      <>
        <MDBRating data={basic} />
      </>
  );
};

export default RatingPage;
