import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { verifyMailService } from "../../../services";

export default function VerifyMailPage() {

    const navigate = useNavigate();

    const search = useLocation().search;
    const token = new URLSearchParams(search).get("token");
    // console.log(token);

    useEffect(() => {
        verifyMailService(token).then((res) => {
            setTimeout(() => {
                navigate("/");
            }, 5000)
        });
    }, []);

    return (<div className="container">

        <div className="mt-4">
            <div className="card m-auto p-4" style={{ width: '32rem' }}>
                <div className="container">
                    <div className="text-center mb-3 mt-1">
                        <h3 className="mb-2">Verify Mail</h3>
                        <button className="btn btn-primary my-2" type="button" disabled>
                            <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}