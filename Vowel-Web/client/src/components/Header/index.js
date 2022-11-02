import './index.css';

export default function Header() {

    return (<nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="navbar-brand" href="#">Auth React</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto align-items-center">
                    <li class="nav-item">
                        <button type="button" class="btn btn-outline-danger"
                            routerLink="/">Sign In</button>
                    </li>
                    <li class="nav-item profile">
                        <span>
                            <img src="assets/images/avatar.svg"
                                width="40" height="40" class="rounded-circle" />
                        </span>
                        <div class="profile-popup">
                            <ul>
                                <li><a routerLink="dashboard"><i class="fa fa-th-large"></i> Dashboard</a></li>
                                <li><a routerLink="profile"><i class="fa fa-eye"></i> View Profile</a></li>
                                <li><a><i class="fa fa-power-off"></i> Sign Out</a></li>
                            </ul>
                        </div>
                    </li>
                </ul >
            </div >
        </div >
    </nav >)
}