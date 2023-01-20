import React, {Component} from "react";
import axios from "axios";
import '../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'


class ModalSignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,

            error: null
        }
    }

    handleChanges = (value, property) => {
        let state = {};
        state[property] = value;
        this.setState(state);
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        let user_logged = null
        if (this.props.api_connection) {
            try{
                let response = await axios.get('http://localhost:8088/users/list')
                let data = await response.data
                data.map((user, i) => {
                    if(user.username === this.state.username){
                        user_logged = {
                            username: user.username,
                            password: user.password,
                            type: user.type
                        }
                    }
                })
                // console.log(user_logged)
            }catch(e){
                console.log(e)
            }
        } else {
            this.props.User.forEach(
                user => {
                    if (this.state.username === user.username) {
                        user_logged = user
                    }
                }
            )

        }

        if (user_logged !== null && user_logged.type === "Vicedecano") {
            if (this.state.password === user_logged.password) {
                sessionStorage.setItem('user', JSON.stringify(user_logged.username))
                window.location.reload()
            } else {
                this.setState({error: 'El nombre de usuario y/o contraseña es incorrecto.'})
            }
        } else if(user_logged !== null && user_logged.type !== "Vicedecano"){
            this.setState({error: 'Usted no tiene permiso para autenticarse.'})
        } else {
            this.setState({error: 'El nombre de usuario y/o contraseña es incorrecto.'})
        }
    }

    error = () => {
        if (this.state.error !== null) {
            return (
                <div className="text-danger text-center mb-3">
                    {this.state.error}
                </div>
            )
        }
    }

    render() {
        return (
            <div className="modal fade" id="sign-in-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="sign-in-label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-4" id="sign-in-label">Iniciar sesión</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="p-3" onSubmit={event => this.handleSubmit(event)}>
                            { this.error() }
                            <div className="form-floating">
                                <input type="text" className="form-control" id="floatingUsername" placeholder="Nombre de usuario" required onChange={(event) => {this.handleChanges(event.target.value, 'username')}}/>
                                <label htmlFor="floatingUsername">Nombre de usuario</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control mt-3 " id="floatingPassword" placeholder="Contraseña" required onChange={(event) => {this.handleChanges(event.target.value, 'password')}}/>
                                <label htmlFor="floatingPassword">Contraseña</label>
                            </div>
                            <div className="modal-footer border-top-0 p-0 mt-3">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalSignIn
