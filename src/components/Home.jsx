import React from 'react';
import { useNavigate } from 'react-router';

function Home() {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login');
    }
    const handleSignUpClick = () => {
        navigate('/signup');
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <div className="col-2">
                        <button className='btn m-3' style={{backgroundColor : '#d3bf9a'}} onClick={handleLoginClick}>Login</button>
                        <button className='btn' style={{backgroundColor : '#d3bf9a'}} onClick={handleSignUpClick}>Sign-up</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;