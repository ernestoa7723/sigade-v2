import React, {Component} from "react";
import axios from "axios";
import '../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'


class ModalSignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            sex: "Masculino",
            type: "Estudiante",
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

        let new_obj = this.state

        // TODO axios post http://127.0.0.1:8080/users/
        if (this.props.api_connection) {
            let url = "http://127.0.0.1:8088/users/"
            async function createObj() {
                const response = await axios.post(url, new_obj)

                console.log(response)
            }

            createObj()

            let modal = document.getElementById('sign-up-modal')
            let modal_backdrop = document.getElementsByClassName('modal-backdrop fade show')

            modal.setAttribute('style', 'display: none;')
            modal_backdrop[0].remove()

        } else {
            console.log(this.state)
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
            <div className="modal fade" id="sign-up-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="sign-up-label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-4" id="sign-up-label">Registrarse</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="p-3" onSubmit={event => this.handleSubmit(event)}>
                            { this.error() }
                            <div className="d-flex justify-content-around">
                                <div className="d-flex flex-column">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="floatingUsernameR" placeholder="Nombre de usuario" required onChange={(event) => {this.handleChanges(event.target.value, 'username')}}/>
                                        <label htmlFor="floatingUsernameR">Nombre de usuario</label>
                                    </div>
                                    <div className="form-floating mt-3">
                                        <input type="text" className="form-control" id="floatingName" placeholder="Nombre" required onChange={(event) => {this.handleChanges(event.target.value, 'name')}}/>
                                        <label htmlFor="floatingName">Nombre</label>
                                    </div>
                                    <div className="form-floating mt-3">
                                        <input type="text" className="form-control" id="floatingLastName" placeholder="Apellidos" required onChange={(event) => {this.handleChanges(event.target.value, 'lastName')}}/>
                                        <label htmlFor="floatingLastName">Apellidos</label>
                                    </div>
                                    <div className="form-floating mt-3">
                                        <input type="text" className="form-control" id="floatingGroup" placeholder="Brigada" required onChange={(event) => {this.handleChanges(event.target.value, 'group')}}/>
                                        <label htmlFor="floatingGroup">Brigada</label>
                                    </div>
                                    <div className="form-floating mt-3">
                                        <input type="password" className="form-control" id="floatingPasswordR" placeholder="Contraseña" required onChange={(event) => {this.handleChanges(event.target.value, 'password')}}/>
                                        <label htmlFor="floatingPasswordR">Contraseña</label>
                                    </div>
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="form-floating mt-3">
                                        <select className="form-control" name="sex" id="floatingSex" required onChange={(event) => {this.handleChanges(event.target.value, 'sex')}}>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                        </select>
                                        {/* <input type="text" className="form-control" id="floatingSex" placeholder="Sexo" required onChange={(event) => {this.handleChanges(event.target.value, 'sex')}}/> */}
                                        <label htmlFor="floatingSex">Sexo</label>
                                    </div>
                                    <div className="form-floating mt-3">
                                        <input type="text" className="form-control" id="floatingLapel" placeholder="Solapin" required onChange={(event) => {this.handleChanges(event.target.value, 'lapel')}}/>
                                        <label htmlFor="floatingLapel">Solapin</label>
                                    </div>
                                    <div className="form-floating mt-3">
                                        <input type="text" className="form-control" id="floatingCI" placeholder="CI" required onChange={(event) => {this.handleChanges(event.target.value, 'ci')}}/>
                                        <label htmlFor="floatingCI">CI</label>
                                    </div>
                                    <div className="form-floating mt-3">
                                        <select className="form-control" name="type" id="floatingType" required onChange={(event) => {this.handleChanges(event.target.value, 'type')}}>
                                            <option value="Estudiante">Estudiante</option>
                                            <option value="Profesor">Profesor</option>
                                            <option value="Vicedecano">Vicedecano</option>
                                        </select>
                                        {/* <input type="text" className="form-control mt-3" id="floatingType" placeholder="Tipo" required onChange={(event) => {this.handleChanges(event.target.value, 'type')}}/> */}
                                        <label htmlFor="floatingType">Tipo</label>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-top-0 p-0 mt-3">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Registrarse</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalSignUp
