import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function Signup() {
    const navigate = useNavigate();
    const [ signupForm, setSignupForm ] = useState({
        fname : '',
        lname : '',
        email : '',
        password : '',
        cPassword : ''
    });
    const [ error, setError ] = useState({});
    const handleSignupChange = (e) => {
        try {
            const value = e.target.value;
            const name = e.target.name;
            setSignupForm({
                ...signupForm,
                [name] : value
            })
            setError(prev => ({
                ...prev,
                [`${name}Error`] : ''
            }))
        } catch (error) {
            console.log(`Error for handle Login Change : ${error.message}`);
        }
    }
    const handleErrors = () => {
        try {
            let errors = {}
            if(!signupForm.fname){
                errors.fnameError = 'First name is required!'
            }
            if(!signupForm.lname){
                errors.lnameError = 'Last name is required!'
            }
            if(!signupForm.email){
                errors.emailError = 'Email is required!'
            }
            if(!signupForm.password){
                errors.passwordError = 'Password is required!'
            }
            if(!signupForm.cPassword || (!signupForm.password && !signupForm.cPassword)){
                errors.cPasswordError = 'Confirm your password!'
            }
            if(signupForm.cPassword !== signupForm.password){
                errors.cPasswordError = 'Your password is not matched!'
            }
            if(Object.keys(errors).length > 0){
                setError(errors);
            }
        } catch (error) {
            console.log(`Error for handle Login Change : ${error.message}`);
        }
    }
    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            handleErrors();
            const response = await fetch(`http://localhost:8000/api/users/register`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    fname : signupForm.fname,
                    lname : signupForm.lname,
                    email : signupForm.email,
                    password : signupForm.cPassword
                })
            });
            if(!response.ok){
                const errorData = await response.json();
                if(errorData.message){
                    setError(prev => ({...prev, serverError : errorData.message}));
                }
            }
            const result = await response.json();
            if(result.status){
                navigate('/login')
                setSignupForm({});
            }
        } catch (error) {
            console.log(`Error for handle Login Change : ${error.message}`);
        }
    }

    return (
        <>
            <section style={{backgroundColor : "#707e67", height : '100vh'}}>
                <section className="container-fluid" >
                    <div className="row d-flex justify-content-center">
                        <div className="col-3 p-4 position-absolute top-50 start-50 translate-middle" style={{backgroundColor : '#e9ccbe'}}>
                            <h1 className='fs-2 text-center my-41'>Sign-up</h1>
                            <form method='post' onSubmit={(e) => handleSignupSubmit(e)}>
                                <div className="mb-4">
                                    <label htmlFor="fname" className="form-label">First name</label>
                                    <input type="text" className="form-control" id="fname" aria-describedby="emailHelp" name='fname'value={signupForm.fname} onChange={(e) => handleSignupChange(e)}/>
                                    { error.fnameError && <p className="text-danger p-0 my-1">{error.fnameError}</p> }
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="lname" className="form-label">Last name</label>
                                    <input type="text" className="form-control" id="lname" aria-describedby="emailHelp" name='lname'value={signupForm.lname} onChange={(e) => handleSignupChange(e)}/>
                                    { error.lnameError && <p className="text-danger p-0 my-1">{error.lnameError}</p> }
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email'value={signupForm.email} onChange={(e) => handleSignupChange(e)}/>
                                    { error.emailError && <p className="text-danger p-0 my-1">{error.emailError}</p> }
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name='password'value={signupForm.password} onChange={(e) => handleSignupChange(e)}/>
                                    { error.passwordError && <p className="text-danger p-0 my-1">{error.passwordError}</p> }
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="cPassword" className="form-label">Confirm password</label>
                                    <input type="password" className="form-control" id="cPassword" name='cPassword'value={signupForm.cPassword} onChange={(e) => handleSignupChange(e)}/>
                                    { error.cPasswordError && <p className="text-danger p-0 my-1">{error.cPasswordError}</p> }
                                </div>
                                {error.serverError && <p className="text-danger p-0 my-1">{error.serverError}</p>}
                                <button type="submit" className="btn mt-3" style={{backgroundColor : '#d3bf9a'}}>Submit</button>
                            </form>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}

export default Signup;