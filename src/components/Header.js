import React, {Component} from "react";

import '../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'


class Header extends Component {
    buttonLog = () => {
        if (!this.props.user) {
            return (
                <button type="button" className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#sign-in-modal">
                    Iniciar sesión
                </button>
            )
        } else {
            return (
                <button type="button" className="btn btn-danger" onClick={event => this.handleLogout()}>
                    Cerrar sesión
                </button>
            )
        }
    }

    handleLogout = () => {
        sessionStorage.removeItem('user')
        window.location.reload()
    }

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-dark" aria-label="navbar">
                    <div className="container">
                        <a href="/" className="d-flex align-items-center my-auto text-white text-decoration-none">
                            <img src="http://127.0.0.1:3000/assets/fontawesome-free-6.2.1-web/svgs/brands/bootstrap-white.svg" width="30" height="30" alt=""></img>
                            <span className="navbar-brand ms-2">SIGADE</span>
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbar">
                            <ul className="navbar-nav me-auto mb-2 my-md-auto mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/medallas">Medallas</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/deportes">Deportes</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/calendarios">Calendarios</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/eventos">Eventos</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/reportes">Reportes</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/usuarios">Usuarios</a>
                                </li>
                            </ul>
                            <div className="row">
                                <div className="text-end col col-lg-auto">
                                    <button type="button" className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#sign-up-modal">
                                        Registrarse
                                    </button>
                                </div>
                                <div className="text-start col col-lg-auto">
                                    { this.buttonLog() }
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header
