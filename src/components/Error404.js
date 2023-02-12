import { Button } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
      <div>
        <h1 className="text-3xl font-bold">Oh!!! You have lost.</h1>
        <div>
          <Link to="/">
            <Button color="light" className="mx-auto my-5">
              Go back
            </Button>
          </Link>
        </div>
      </div>
    );
};

export default Error404;