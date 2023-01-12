import React, {Component} from "react";
import axios from "axios";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'


class ModalReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: '',
            info: '',
            result: '',

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
            event: this.state.event,
            info: this.state.info,
            result: this.state.result,
        }

        if (this.state.wasInit) {
            new_obj['idReport'] = this.props.obj.idReport

            // TODO axios patch http://127.0.0.1:8080/reports/ obj.id
            if (this.props.api_connection) {
                async function updateObj() {
                    let url = "http://127.0.0.1:8080/reports/".concat(this.props.obj.idReport.toString())

                    const response = axios.put(url, new_obj)
                    console.log(response)
                }

                updateObj()
            } else {

                console.log(new_obj)

            }
        } else {
            // TODO axios post http://127.0.0.1:8080/reports/
            if (this.props.api_connection) {
                async function createObj() {
                    let url = "http://127.0.0.1:8080/reports/"

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
            return "Añadir Reporte"
        } else {
            return this.props.obj.event
        }
    }

    render() {
        if (this.props.obj !== null && !(this.state.wasInit)) {
            let state = {}
            let wasInit = true

            state['idReport'] = this.props.obj.idReport
            state['event'] = this.props.obj.event
            state['info'] = this.props.obj.info
            state['result'] = this.props.obj.result

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
                                <input type="text" required className="form-control" id={'floating-event-'.concat(this.state.id)} autoComplete="disable" placeholder="Evento" value={this.state.event} onChange={(event) => {this.handleChanges('event', event.target.value)}}/>
                                <label htmlFor={'floating-event-'.concat(this.state.id)}>Evento</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input type="text" required className="form-control" id={'floating-info-'.concat(this.state.id)} autoComplete="disable" placeholder="Info" value={this.state.info} onChange={(event) => {this.handleChanges('info', event.target.value)}}/>
                                <label htmlFor={'floating-info-'.concat(this.state.id)}>Info</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input type="text" required className="form-control" id={'floating-result-'.concat(this.state.id)} autoComplete="disable" placeholder="Resultado" value={this.state.result} onChange={(event) => {this.handleChanges('result', event.target.value)}}/>
                                <label htmlFor={'floating-result-'.concat(this.state.id)}>Resultado</label>
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

export default ModalReport
