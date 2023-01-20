import React, {Component} from "react";
import DatePicker from 'react-date-picker';

import axios from "axios";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

class ModalEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sport: '',
            modality: '',
            evenName: '',
            date: '',

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
            sport: this.state.sport,
            modality: this.state.modality,
            evenName: this.state.evenName,
            date: this.state.date
        }

        if (this.state.wasInit) {
            new_obj['eventId'] = this.state.eventId

            // TODO axios patch http://127.0.0.1:8080/events/id obj.eventId
            if (this.props.api_connection) {
                let url = "http://127.0.0.1:8088/events/id".concat(this.props.obj.eventId)
                async function updateObj() {
                    const response = axios.put(url, new_obj)
                    console.log(response)
                }

                updateObj()
            } else {

                console.log(new_obj)

            }
        } else {
            // TODO axios post http://127.0.0.1:8080/events/
            if (this.props.api_connection) {
                let url = "http://127.0.0.1:8088/events/"
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
            return "Añadir Evento"
        } else {
            return this.props.obj.sport.concat(' ').concat(this.props.obj.modality).concat(' ').concat(this.props.obj.evenName)
        }
    }

    render() {
        if (this.props.obj !== null && !(this.state.wasInit)) {
            let state = {}
            let wasInit = true

            state['eventId'] = this.props.obj.eventId
            state['sport'] = this.props.obj.sport
            state['modality'] = this.props.obj.modality
            state['evenName'] = this.props.obj.evenName
            state['date'] = this.props.obj.date

            state['wasInit'] = wasInit
            this.setState(state)
        }

        return (
            <div className="modal fade" id={ this.props.id } data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={ this.props.id.concat('-label') } aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-4" id={ this.props.id.concat('-label') }>{ this.title() }</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="p-3" onSubmit={event => this.handleSubmit(event)}>
                            <div className="form-floating">
                                <div className="row p-3 border rounded mx-auto mt-3 bg-light">
                                    <div className="col row row-cols-1 row-cols-md-2 g-1">
                                        <div className="col px-1">
                                            <input type="text" className="form-control" id={'floating-sport-'.concat(this.state.eventId)} placeholder="Deporte" value={this.state.sport} required onChange={event => this.handleChanges('sport', event.target.value)}/>
                                        </div>
                                        <div className="col px-1">
                                            <input type="text" className="form-control" id={'floating-modality-'.concat(this.state.eventId)} placeholder="Modalidad" value={this.state.modality} required onChange={event => this.handleChanges('modality', event.target.value)}/>
                                        </div>
                                        <div className="col px-1">
                                            <input type="text" className="form-control" id={'floating-evenName-'.concat(this.state.eventId)} placeholder="Nombre" value={this.state.evenName} required onChange={event => this.handleChanges('evenName', event.target.value)}/>
                                        </div>
                                        <div className="col px-1">
                                            <DatePicker
                                                className="form-control p-1"
                                                calendarClassName="rounded"
                                                required
                                                onChange={value => {this.handleChanges('date', value)}}
                                                value={ this.state.date }
                                            />
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
        );
    }
}

export default ModalEvent
