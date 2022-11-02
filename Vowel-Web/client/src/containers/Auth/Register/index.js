import { useState } from "react";
import { registerService } from "../../../services";

export default function RegisterPage() {

    const [error, setError] = useState({
        name: '',
        email: '',
        password: ''
    });


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (name || email || password) {
            // console.log(name, email, password);
            registerService({ name, email, password })
        }
    }

    return (<div className="container">

        <div className="mt-4">
            <div className="card m-auto p-4" style={{ width: '32rem' }}>
                <div className="container">
                    <div className="text-center mb-3 mt-1">
                        <h3>Register Form</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Your name</label>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <span>@</span>
                                </span>
                            </div>
                            <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
                            {error.name ? <small
                                className="form-text text-danger w-100">
                                Please enter name!</small> : ''}
                        </div>
                        <label htmlFor="email">Email address</label>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-envelope"></i>
                                </span>
                            </div>
                            <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
                            {error.email ? <small
                                className="form-text text-danger w-100">
                                Please enter email!</small> : ''}
                        </div>
                        <label htmlFor="password">Password</label>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-lock"></i>
                                </span>
                            </div>
                            <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                            {error.password ? <small
                                className="form-text text-danger w-100">
                                Please enter password!</small> : ''}
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-block btn-outline-primary">
                                Create Account
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="mb-0">
                                Already have account?
                                <a href="/" >
                                    Login Yourself
                                </a>
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>)
}