import { useState, useEffect } from "react";
import Header from "../../components/Header";

export default function HomePage() {

    const [data, setData] = useState({
        id: '',
        name: '',
        email: ''
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        // console.log(user)s
        setData({
            id: user.id,
            name: user.name,
            email: user.email
        })
    }, [])


    return (<div>
        {/* <Header /> */}

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand m-auto" href="/">Home Page</a>
            </div>
        </nav>

        <div className="container">
            <div className="mt-4">
                <div className="card m-auto p-4" style={{ width: '32rem' }}>
                    <div className="container">
                        <div className="text-center mb-3 mt-1">
                            <h3>User Information</h3>
                        </div>
                        <div>
                            <div class="form-group">
                                <label>User ID :</label>&nbsp;
                                <strong>{data.id}</strong>
                            </div>
                            <div class="form-group">
                                <label>User name  :</label>&nbsp;
                                <strong>{data.name}</strong>
                            </div>
                            <div class="form-group">
                                <label>User email :</label>&nbsp;
                                <strong>{data.email}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}