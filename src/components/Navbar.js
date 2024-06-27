import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #D3D3D3;
  padding: 10px;
  .nav-link {
    color: white;
    margin-right: 15px;
    &:hover {
      color: #ddd;
    }
  }
`;

const Navbar = () => {
  const { authToken, logout } = useContext(AuthContext);

  return (
    <>
      <NavbarContainer className="navbar navbar-expand-lg navbar-dark">
        <Link className="navbar-brand" to="/">Recette App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            {authToken ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/recipes">Recettes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-recipe">Ajouter recette</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={logout}>Se deconnecter</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Connexion</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Inscription</Link>
                </li>
              </>
            )}
          </ul>
        </div>
    </NavbarContainer>

        <div className='container-fluid w-75 mx-auto'>
            <Outlet />
        </div>
    </>
    
  );
};

export default Navbar;
