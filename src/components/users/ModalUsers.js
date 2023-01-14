import React, {Component, createElement} from "react";
import axios from "axios";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

class ModalUsers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            lastName: '',
            username: '',
            lapel: '',
            sex: '',
            ci: '',
            type: '',

            password: '',
            passwordConfirm: '',

            wasInit: false,
            errors: []
        }
    }

    handleChanges = (property, value) => {
        let state = {};
        state[property] = value;
        this.setState(state);
    }

    validateForm = () => {
        let state = {}
        let errors = []

        if (!this.state.wasInit) {
            if (this.state.password.length < 8) {
                const message = 'La contraseña debe tener al menos 8 caracteres'
                errors.splice(errors.length, 0, message)
            } else {
                if (this.state.password !== this.state.passwordConfirm) {
                    const message = 'Las contraseñas no coinciden'
                    errors.splice(errors.length, 0, message)
                }
            }
        }

        state['errors'] = errors
        this.setState(state)

        return this.state.errors.length === 0;
    }

    handleSubmit = (event) => {
        event.preventDefault()

        if (this.validateForm()) {
            let new_obj = {
                name: this.state.name,
                lastName: this.state.lastName,
                // username: this.state.username,
                lapel: this.state.lapel,
                sex: this.state.sex,
                ci: this.state.ci,
                type: this.state.type,
            }

            if (this.state.wasInit) {
                new_obj['userId'] = this.state.userId

                // TODO axios patch http://127.0.0.1:8080/users/id obj.userId
                if (this.props.api_connection) {
                    let url = "http://127.0.0.1:8080/users/id".concat(this.props.obj.userId)
                    async function updateObj() {
                        const response = axios.put(url, new_obj)
                        console.log(response)
                    }

                    updateObj()
                } else {
                    console.log(new_obj)
                }
            } else {
                // new_obj['password'] = this.state.password

                // TODO axios post http://127.0.0.1:8080/users
                if (this.props.api_connection) {
                    let url = "http://127.0.0.1:8080/users"
                    async function createObj() {
                        const response = axios.post(url, new_obj)
                        console.log(response)
                    }

                    createObj()
                } else {
                    console.log(new_obj)
                }
            }

            let modal = document.getElementById(this.props.id)
            let modal_backdrop = document.getElementsByClassName('modal-backdrop fade show')

            modal.setAttribute('style', 'display: none;')
            modal_backdrop[0].remove()
        }
    }

    title = () => {
        if (!this.state.wasInit) {
            return "Registrar usuario"
        } else {
            return this.props.obj.name.concat(' ').concat(this.props.obj.lastName)
        }
    }

    errors = () => {
        if (this.state.errors.length !== 0) {

            let errors = []

            for (let i = 0; i < this.state.errors.length; i++) {
                errors.splice(i, 0, createElement('li', {key: i}, this.state.errors[i]))
            }

            return (
                createElement('div', {className: "text-danger text-center mb-3"},
                    createElement('ul', {className: "list-unstyled"}, [
                        errors
                    ])
                )
            )
        }
    }

    typeStudent = () => {
        if (this.state.wasInit) {
            if (this.props.obj.type === 'Estudiante') {
                return <input className="form-check-input" type="radio" required name={'inlineRadioTypeOptions-'.concat(this.state.userId)} id={'inlineRadioStudent-'.concat(this.state.userId)} value="Estudiante" checked onChange={(event) => {this.handleChanges('type', event.target.value)}}/>
            }
        }
        return <input className="form-check-input" type="radio" required name={'inlineRadioTypeOptions-'.concat(this.state.userId)} id={'inlineRadioStudent-'.concat(this.state.userId)} value="Estudiante" onChange={(event) => {this.handleChanges('type', event.target.value)}}/>
    }

    typeTeacher = () => {
        if (this.state.wasInit) {
            if (this.props.obj.type === 'Profesor') {
                return <input className="form-check-input" type="radio" required name={'inlineRadioTypeOptions-'.concat(this.state.userId)} id={'inlineRadioTeacher-'.concat(this.state.userId)} value="Profesor" checked onChange={(event) => {this.handleChanges('type', event.target.value)}}/>
            }
        }
        return <input className="form-check-input" type="radio" required name={'inlineRadioTypeOptions-'.concat(this.state.userId)} id={'inlineRadioTeacher-'.concat(this.state.userId)} value="Profesor" onChange={(event) => {this.handleChanges('type', event.target.value)}}/>
    }

    typeAssociatedDean = () => {
        if (this.state.wasInit) {
            if (this.props.obj.type === 'Vicedecano') {
                return <input className="form-check-input" type="radio" required name={'inlineRadioTypeOptions-'.concat(this.state.userId)} id={'inlineRadioAssociateDean-'.concat(this.state.userId)} value="Vicedecano" checked onChange={(event) => {this.handleChanges('type', event.target.value)}}/>
            }
        }
        return <input className="form-check-input" type="radio" required name={'inlineRadioTypeOptions-'.concat(this.state.userId)} id={'inlineRadioAssociateDean-'.concat(this.state.userId)} value="Vicedecano" onChange={(event) => {this.handleChanges('type', event.target.value)}}/>
    }

    sexMale = () => {
        if (this.state.wasInit) {
            if (this.props.obj.sex === 'Masculino') {
                return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions-'.concat(this.state.userId)} id={'inlineRadioMan-'.concat(this.state.userId)} value="Masculino" checked onChange={(event) => {this.handleChanges('sex', event.target.value)}}/>
            }
        }
        return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions-'.concat(this.state.userId)} id={'inlineRadioMan-'.concat(this.state.userId)} value="Masculino"  onChange={(event) => {this.handleChanges('sex', event.target.value)}}/>
    }

    sexFemale = () => {
        if (this.state.wasInit) {
            if (this.props.obj.sex === 'Femenino') {
                return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions-'.concat(this.state.userId)} id={'inlineRadioWoman-'.concat(this.state.userId)} value="Femenino" checked onChange={(event) => {this.handleChanges('sex', event.target.value)}}/>
            }
        }
        return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions-'.concat(this.state.userId)} id={'inlineRadioWoman-'.concat(this.state.userId)} value="Femenino" onChange={(event) => {this.handleChanges('sex', event.target.value)}}/>
    }

    password = () => {
        if (!this.state.wasInit) {
            return (
                <div>
                    <div className="form-floating">
                        <input type="password" className="form-control mt-3" required id={'floatingPassword-'.concat(this.state.userId)} placeholder="Contraseña" onChange={(event) => {this.handleChanges('password', event.target.value)}}/>
                        <label htmlFor={'floatingPassword-'.concat(this.state.userId)}>Contraseña</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control mt-3" required id={'floatingPasswordConfirm-'.concat(this.state.userId)} placeholder="Confirmar contraseña" onChange={(event) => {this.handleChanges('passwordConfirm', event.target.value)}}/>
                        <label htmlFor={'floatingPasswordConfirm-'.concat(this.state.userId)}>Confirmar contraseña</label>
                    </div>
                </div>
            )
        }
    }

    render() {
        if (this.props.obj !== null && !(this.state.wasInit)) {
            let state = this.state
            let wasInit = true

            state['userId'] = this.props.obj.userId

            state['name'] = this.props.obj.name
            state['lastName'] = this.props.obj.lastName
            state['username'] = this.props.obj.username
            state['lapel'] = this.props.obj.lapel
            state['sex'] = this.props.obj.sex
            state['ci'] = this.props.obj.ci
            state['type'] = this.props.obj.type

            state['wasInit'] = wasInit
            this.setState(state)
        }

        return (
            <div className="modal fade" id={this.props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={this.props.id.concat('-label')} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-4" id={this.props.id.concat('-label')}>{ this.title() }</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={event => this.handleSubmit(event)}>
                                { this.errors() }
                                <div className="form-floating">
                                    <input type="text" required className="form-control" id={'floating-name-'.concat(this.state.userId)} autoComplete="disable" placeholder="Nombre" value={this.state.name} onChange={(event) => {this.handleChanges('name', event.target.value)}}/>
                                    <label htmlFor={'floating-name-'.concat(this.state.userId)}>Nombre</label>
                                </div>
                                <div className="form-floating mt-3">
                                    <input type="text" required className="form-control" id={'floating-lastName-'.concat(this.state.userId)} autoComplete="disable" placeholder="Apellidos" value={this.state.lastName} onChange={(event) => {this.handleChanges('lastName', event.target.value)}}/>
                                    <label htmlFor={'floating-lastName-'.concat(this.state.userId)}>Apellidos</label>
                                </div>
                                <div className="form-floating mt-3">
                                    <input type="text" required className="form-control" id={'floating-username-'.concat(this.state.userId)} autoComplete="disable" placeholder="Nombre de usuario" value={this.state.username} onChange={(event) => {this.handleChanges('username', event.target.value)}}/>
                                    <label htmlFor={'floating-username-'.concat(this.state.userId)}>Nombre de usuario</label>
                                </div>
                                <div className="form-floating mt-3">
                                    <input type="text" required className="form-control" id={'floating-lapel-'.concat(this.state.userId)} autoComplete="disable" placeholder="Solapín" value={this.state.lapel} onChange={(event) => {this.handleChanges('lapel', event.target.value)}}/>
                                    <label htmlFor={'floating-lapel-'.concat(this.state.userId)}>Solapín</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" className="form-control mt-3" id={"floating-ci-".concat(this.state.userId)} autoComplete="disable" placeholder="Carnet de identidad" value={this.state.ci} onChange={(event) => {this.handleChanges('ci', event.target.value)}}/>
                                    <label htmlFor={"floating-ci-".concat(this.state.userId)}>Carnet de identidad</label>
                                </div>
                                <div className="form-floating row p-0 ms-3 mt-3 text-start">
                                    <div className="col-4 col-sm-3 p-0 fw-bold">
                                        Tipo
                                    </div>
                                    <div className="col-8 col-sm-9 row row-cols-1 row-cols-sm-3 p-0 m-0">
                                        <div className="form-check form-check-inline col p-0 m-0">
                                            { this.typeStudent() }
                                            <label className="form-check-label" htmlFor={'inlineRadioStudent-'.concat(this.state.userId)}>Estudiante</label>
                                        </div>
                                        <div className="form-check form-check-inline col p-0 m-0">
                                            { this.typeTeacher() }
                                            <label className="form-check-label" htmlFor={'inlineRadioTeacher-'.concat(this.state.userId)}>Profesor</label>
                                        </div>
                                        <div className="form-check form-check-inline col p-0 m-0">
                                            { this.typeAssociatedDean() }
                                            <label className="form-check-label" htmlFor={'inlineRadioAssociateDean-'.concat(this.state.userId)}>Vicedecano</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-floating row p-0 ms-3 mt-3 text-start">
                                    <div className="col-4 col-sm-3 p-0 fw-bold">
                                        Sexo
                                    </div>
                                    <div className="col-8 col-sm-9 row row-cols-1 row-cols-sm-3 p-0 m-0">
                                        <div className="form-check form-check-inline col p-0 m-0">
                                            { this.sexMale() }
                                            <label className="form-check-label" htmlFor={'inlineRadioMan-'.concat(this.state.userId)}>Masculino</label>
                                        </div>
                                        <div className="form-check form-check-inline col p-0 m-0">
                                            { this.sexFemale() }
                                            <label className="form-check-label" htmlFor={'inlineRadioWoman-'.concat(this.state.userId)}>Femenino</label>
                                        </div>
                                    </div>
                                </div>

                                {/*<div className="form-floating">*/}
                                {/*    <input type="text" className="form-control mt-3" id="floatingInput" placeholder="Tipo"></input>*/}
                                {/*    <label htmlFor="floatingInput">Brigada</label>*/}
                                {/*</div>*/}

                                { this.password() }

                                <div className="mt-3 text-end">
                                    <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalUsers
