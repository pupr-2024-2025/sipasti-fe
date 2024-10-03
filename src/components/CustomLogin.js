import React from 'react';
import Button from './button'; // Adjust the path if necessary

const CustomLogin = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <Button type="submit">Login</Button> {/* Use your custom Button component */}
      </form>
    </div>
  );
};

export default CustomLogin;
