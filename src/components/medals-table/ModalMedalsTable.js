import React, {Component} from "react";

import axios from "axios";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

class ModalMellaGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            place: '',
            team: '',
            gold: '',
            plate: '',
            bronze: '',
            total: '',

            wasInit: false,
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
            place: this.state.place,
            team: this.state.team,
            gold: parseInt(this.state.gold),
            plate: this.state.plate,
            bronze: this.state.bronze,
            total: this.state.total,
        }

        if (this.state.wasInit) {
            new_obj['id'] = this.props.obj.id

            // TODO axios patch http://127.0.0.1:8080/medals/id obj.id
            if (this.props.api_connection) {
                let url = "http://127.0.0.1:8080/medals/id".concat(this.props.obj.id)
                async function updateObj() {
                    const response = await axios.put(url, new_obj)
                    console.log(response)
                }

                updateObj()
            } else {
                console.log(new_obj)
            }
        } else {
            // TODO axios post http://127.0.0.1:8080/medals/
            if (this.props.api_connection) {
                let url = "http://127.0.0.1:8080/medals"
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
            return <span>Añadir tabla de medallas</span>
        } else {
            return <span>Tabla de medallas {this.props.obj.id}</span>
        }
    }

    render() {
        if (this.props.obj !== null && !(this.state.wasInit)) {
            let state = {}
            let wasInit = true

            state['place'] = this.props.obj.place
            state['team'] = this.props.obj.team
            state['gold'] = this.props.obj.gold
            state['plate'] = this.props.obj.plate
            state['bronze'] = this.props.obj.bronze
            state['total'] = this.props.obj.total

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
                                <input type="text" className="form-control" id={'floating-place-'.concat(this.props.id)} placeholder="Lugar" value={this.state.place} required onChange={(event) => {this.handleChanges('place', event.target.value)}}/>
                                <label htmlFor={'floating-place-'.concat(this.props.id)}>Lugar</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input type="text" className="form-control" id={'floating-team-'.concat(this.props.id)} placeholder="Equipo" value={this.state.team} required onChange={(event) => {this.handleChanges('team', event.target.value)}}/>
                                <label htmlFor={'floating-team-'.concat(this.props.id)}>Equipo</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input type="text" className="form-control" id={'floating-gold-'.concat(this.props.id)} placeholder="Oro" value={this.state.gold} required onChange={(event) => {this.handleChanges('gold', event.target.value)}}/>
                                <label htmlFor={'floating-gold-'.concat(this.props.id)}>Oro</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input type="text" className="form-control" id={'floating-plate-'.concat(this.props.id)} placeholder="Plata" value={this.state.plate} required onChange={(event) => {this.handleChanges('plate', event.target.value)}}/>
                                <label htmlFor={'floating-plate-'.concat(this.props.id)}>Plata</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input type="text" className="form-control" id={'floating-bronze-'.concat(this.props.id)} placeholder="Bronce" value={this.state.bronze} required onChange={(event) => {this.handleChanges('bronze', event.target.value)}}/>
                                <label htmlFor={'floating-bronze-'.concat(this.props.id)}>Bronce</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input type="text" className="form-control" id={'floating-total-'.concat(this.props.id)} placeholder="Total" value={this.state.total} required onChange={(event) => {this.handleChanges('total', event.target.value)}}/>
                                <label htmlFor={'floating-total-'.concat(this.props.id)}>Total</label>
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

export default ModalMellaGame
