import React, {Component} from "react";
import axios from "axios";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

class ModalSport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            modality: '',
            sex: '',
            faculty: '',

            wasInit: false
        }
    }

    handleChanges = (property, value) => {
        let state = {}
        state[property] = value
        this.setState(state)
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let new_obj = {
            name: this.state.name,
            modality: this.state.modality,
            sex: this.state.sex,
            faculty: this.state.faculty,
        }

        if (this.state.wasInit) {
            new_obj['sportId'] = this.state.sportId

            // TODO axios patch http://127.0.0.1:8080/sports/id obj.sportId
            if (this.props.api_connection) {
                let url = "http://127.0.0.1:8080/sports/id".concat(this.props.obj.sportId)
                async function updateObj() {
                    const response = axios.put(url, new_obj)
                    console.log(response)
                }

                updateObj()
            } else {

                console.log(new_obj)

            }
        } else {
            // TODO axios post http://127.0.0.1:8080/sports/
            if (this.props.api_connection) {
                let url = "http://127.0.0.1:8080/sports/"
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

    title = () => {
        if (!this.state.wasInit) {
            return <span>Añadir Deporte</span>
        } else {
            return <span>{this.props.obj.name.concat(' ').concat(this.props.obj.modality).concat(' ').concat(this.props.obj.sex)}</span>
        }
    }

    modalityTeam = () => {
        if (this.state.wasInit) {
            if (this.props.obj.modality === 'Equipo') {
                return <input className="form-check-input" type="radio" required name={'inlineRadioModalityOptions_'.concat(this.state.id)} id={'inlineRadioTeam_'.concat(this.state.id)} value="Equipo" checked onChange={event => this.handleChanges('modality', event.target.value)}/>
            }
        }
        return <input className="form-check-input" type="radio" required name={'inlineRadioModalityOptions_'.concat(this.state.id)} id={'inlineRadioTeam_'.concat(this.state.id)} value="Equipo" onChange={event => this.handleChanges('modality', event.target.value)}/>
    }

    modalitySingle = () => {
        if (this.state.wasInit) {
            if (this.props.obj.modality === 'Individual') {
                return <input className="form-check-input" type="radio" required name={'inlineRadioModalityOptions_'.concat(this.state.id)} id={'inlineRadioSingle_'.concat(this.state.id)} value="Individual" checked onChange={event => this.handleChanges('modality', event.target.value)}/>
            }
        }
        return <input className="form-check-input" type="radio" required name={'inlineRadioModalityOptions_'.concat(this.state.id)} id={'inlineRadioSingle_'.concat(this.state.id)} value="Individual" onChange={event => this.handleChanges('modality', event.target.value)}/>
    }

    sexMale = () => {
        if (this.state.wasInit) {
            if (this.props.obj.sex === 'Masculino') {
                return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions_'.concat(this.state.id)} id={'inlineRadioMale_'.concat(this.state.id)} value="Masculino" checked onChange={event => this.handleChanges('sex', event.target.value)}/>
            }
        }
        return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions_'.concat(this.state.id)} id={'inlineRadioMale_'.concat(this.state.id)} value="Masculino" onChange={event => this.handleChanges('sex', event.target.value)}/>
    }

    sexFemale = () => {
        if (this.state.wasInit) {
            if (this.props.obj.sex === 'Femenino') {
                return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions_'.concat(this.state.id)} id={'inlineRadioFemale_'.concat(this.state.id)} value="Femenino" checked onChange={event => this.handleChanges('sex', event.target.value)}/>
            }
        }
        return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions_'.concat(this.state.id)} id={'inlineRadioFemale_'.concat(this.state.id)} value="Femenino" onChange={event => this.handleChanges( 'sex', event.target.value)}/>
    }

    sexMix = () => {
        if (this.state.wasInit) {
            if (this.props.obj.sex === 'Mixto') {
                return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions_'.concat(this.state.id)} id={'inlineRadioMix_'.concat(this.state.id)} value="Mixto" checked onChange={event => this.handleChanges('sex', event.target.value)}/>
            }
        }
        return <input className="form-check-input" type="radio" required name={'inlineRadioSexOptions_'.concat(this.state.id)} id={'inlineRadioMix_'.concat(this.state.id)} value="Mixto" onChange={event => this.handleChanges('sex', event.target.value)}/>
    }

    render() {
        if (this.props.obj !== null && !(this.state.wasInit)) {
            let state = {}
            let wasInit = true

            state['sportId'] = this.props.obj.sportId
            state['name'] = this.props.obj.name
            state['modality'] = this.props.obj.modality
            state['sex'] = this.props.obj.sex
            state['faculty'] = this.props.obj.faculty

            state['wasInit'] = wasInit
            this.setState(state)
        }

        return (
            <div className="modal fade" id={this.props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={this.props.id.concat('-label')} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-4" id={this.props.id.concat('-label')}>{ this.title() }</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="p-3" onSubmit={event => this.handleSubmit(event)}>
                            <div className="form-floating">
                                <input type="text" required className="form-control" id={'floating-name-'.concat(this.state.id)} autoComplete="disable" placeholder="Nombre" value={this.state.name} onChange={(event) => {this.handleChanges('name', event.target.value)}}/>
                                <label htmlFor={'floating-name-'.concat(this.state.id)}>Nombre</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input type="text" required className="form-control" id={'floating-faculty-'.concat(this.state.id)} autoComplete="disable" placeholder="Facultad" value={this.state.faculty} onChange={(event) => {this.handleChanges('faculty', event.target.value)}}/>
                                <label htmlFor={'floating-faculty-'.concat(this.state.id)}>Facultad</label>
                            </div>
                            <div className='row mx-auto mt-3'>
                                <div className="form-floating col row row-cols-1 px-0 mx-auto">
                                    <div className="col text-start fw-bold">
                                        Modalidad
                                    </div>
                                    <div className="col row row-cols-1 mx-auto mt-1">
                                        <div className="form-check form-check-inline col col-lg-auto text-start">
                                            { this.modalityTeam() }
                                            <label className="form-check-label" htmlFor={'inlineRadioTeam_'.concat(this.state.id)}>Equipo</label>
                                        </div>
                                        <div className="form-check form-check-inline col col-lg-auto text-start">
                                            { this.modalitySingle() }
                                            <label className="form-check-label" htmlFor={'inlineRadioSingle_'.concat(this.state.id)}>Individual</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-floating col row row-cols-1 px-0 mx-auto">
                                    <div className="col text-start fw-bold">
                                        Sexo
                                    </div>
                                    <div className="col row row-cols-1 mx-auto mt-1">
                                        <div className="form-check form-check-inline col col-lg-auto text-start">
                                            { this.sexMale() }
                                            <label className="form-check-label" htmlFor={'inlineRadioMale_'.concat(this.state.id)}>Masculino</label>
                                        </div>
                                        <div className="form-check form-check-inline col col-lg-auto text-start">
                                            { this.sexFemale() }
                                            <label className="form-check-label" htmlFor={'inlineRadioFemale_'.concat(this.state.id)}>Femenino</label>
                                        </div>
                                        <div className="form-check form-check-inline col col-lg-auto text-start">
                                            { this.sexMix() }
                                            <label className="form-check-label" htmlFor={'inlineRadioMix_'.concat(this.state.id)}>Mixto</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer border-top-0 p-0 mt-3">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalSport
