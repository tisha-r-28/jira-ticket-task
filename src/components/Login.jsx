import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function Login() {
    const navigate = useNavigate();
    const [ loginForm, setLoginForm ] = useState({
        email : '',
        password : ''
    })
    const [ error, setError ] = useState({});
    const handleLoginChange = (e) => {
        try {
            const value = e.target.value;
            const name = e.target.name;
            setLoginForm({
                ...loginForm,
                [name] : value
            })
            setError(prev => ({
                ...prev,
                [`${name}Error`]: ''
            }));
        } catch (error) {
            console.log(`Error for handle Login Change : ${error.message}`);
        }
    }
    const handleErrors = () => {
        try {
            let errors = {};
            if(!loginForm.email){
                errors.emailError = 'Email is require!'
            }
            if(!loginForm.password){
                errors.passwordError = 'Password is require!'
            }
            if(Object.keys(errors).length > 0){
                setError(errors);
            }
        } catch (error) {
            console.log(`Error for handle Login Change : ${error.message}`);
        }
    }
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        handleErrors();
        try {
            const response = await fetch(`http://localhost:8000/api/users/login`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    email : loginForm.email,
                    password : loginForm.password
                })
            });
            if(!response.ok){
                const errorData = await response.json()
                if(errorData.message){
                    setError(prev => (
                        {   
                            ...prev, 
                            serverError : errorData.message
                        }
                    ));
                }
            }
            const result = await response.json();
            if(result.status){
                if(result.token){
                    localStorage.setItem('token', JSON.stringify(result.token));
                }
                navigate('/tasks');
                setLoginForm({
                    email: '',
                    password: ''
                });
            }
            console.log(result);
        } catch (error) {
            console.log(`Error for handle Login Submit: ${error.message}`);
        }
    }
    return (
        <>
            <section style={{backgroundColor : "#707e67", height : '100vh'}}>
                <section className="container-fluid" >
                    <div className="row d-flex justify-content-center">
                        <div className="col-3 p-4 position-absolute top-50 start-50 translate-middle" style={{backgroundColor : '#e9ccbe'}}>
                            <h1 className='fs-2 text-center my-41'>Login</h1>
                            <form method='post' onSubmit={handleLoginSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email'value={loginForm.email} onChange={(e) => handleLoginChange(e)}/>
                                    {error.emailError && <p className="text-danger p-o my-1">{error.emailError}</p>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name='password'value={loginForm.password} onChange={(e) => handleLoginChange(e)}/>
                                    {error.passwordError && <p className="text-danger p-o my-1">{error.passwordError}</p>}
                                </div>
                                {error.serverError && <p className="text-danger p-o my-1">{error.serverError}</p>}
                                <button type="submit" className="btn mt-3" style={{backgroundColor : '#d3bf9a'}}>Submit</button>
                            </form>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}

export default Login;