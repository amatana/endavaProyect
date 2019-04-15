/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const Home = (props) => {
  console.log('SOY LAS PROPS DEL HOME', props)
  return (
    !!props.user && !!props.user.isAdmin
      ? <div>
        <div className='logoAbajo'><img className='imgHome' src='./utils/logo.png' /></div>
        <div className='homeDisplay'>
          <Link to="/candidates/allCandidates"><div className='homeDIV'><button className="btn btn-lg botonHome">Candidates Managment</button></div></Link>
          <Link to="/questions"><div className='homeDIV'><button className="btn btn-lg botonHome">Questions Managment</button></div></Link>
          <Link to="/users/allUsers"><div className='homeDIV'><button className="btn btn-lg botonHome">Users Managment</button></div></Link>
          <Link to="/tags"><div className='homeDIV'><button className="btn btn-lg botonHome">Tag Management</button></div></Link>
        </div>
      </div>
      : !!props.user && !props.user.isAdmin && <Redirect to='./candidates/allCandidates'/>
  );
};

export default Home;
