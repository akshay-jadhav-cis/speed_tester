export default function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light  px-4">
            <a className="navbar-brand " href="/">
                BroadBand Speed Tester
            </a>

            <div className="ms-auto d-flex align-items-center gap-3">
                <a className="nav-link" href="/">
                    About
                </a>

                <button className="btn btn-outline-success">
                    Login
                </button>
            </div>
        </nav>
    );
}