import { useState } from "react";
import { loginService } from "../../../services";

export default function LoginPage() {

    const [error, setError] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (email || password) {
            // console.log(email, password);
            loginService({ email, password }).then((result) => {
                if (result) {
                    setLoading(true);
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000);
                }
            })
        }
    }

    return (<div className="container">

        <div className="mt-4">
            <div className="card m-auto p-4" style={{ width: '32rem' }}>
                <div className="container">
                    <div className="text-center mb-3 mt-1">
                        <h3>Login Form</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
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
                            {loading ? <button className="btn btn-block btn-primary my-2" type="button" disabled>
                                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button> :
                                <button type="submit" className="btn btn-block btn-outline-primary">
                                    Sign In
                                </button>
                            }
                        </div>

                        <div className="text-center">
                            <p className="mb-0">
                                Don't have account?
                                <a href="/register" >
                                    Register Yourself
                                </a>
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>)
}