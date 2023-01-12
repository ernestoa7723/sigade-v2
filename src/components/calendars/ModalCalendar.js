import React, {Component} from "react";
import axios from "axios";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'
import DatePicker from "react-date-picker";

class ModalCalendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '',
            site: '',

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
            date: this.state.date,
            site: this.state.site,
        }

        if (this.state.wasInit) {
            new_obj['idCalendar'] = this.props.obj.idCalendar

            // TODO axios patch http://127.0.0.1:8080/calendars/ obj.id
            if (this.props.api_connection) {
                async function updateObj() {
                    let url = "http://127.0.0.1:8080/calendars/".concat(this.props.obj.id.toString())

                    const response = axios.put(url, new_obj)
                    console.log(response)
                }

                updateObj()
            } else {

                console.log(new_obj)

            }
        } else {
            // TODO axios post http://127.0.0.1:8080/calendars/
            if (this.props.api_connection) {
                async function createObj() {
                    let url = "http://127.0.0.1:8080/calendars/"

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
            return "Añadir Calendario"
        } else {
            return this.props.obj.date
        }
    }

    render() {
        if (this.props.obj !== null && !(this.state.wasInit)) {
            let state = {}
            let wasInit = true

            state['idCalendar'] = this.props.obj.idCalendar
            state['site'] = this.props.obj.site

            let date = this.props.obj.date.split(' ', 4)
            let month = date[1]
            let day = date[2]
            let year = date[3]

            state['date'] = new Date(year.concat('-').concat(month).concat('-').concat(day))

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
                                <input type="text" required className="form-control" id={'floating-site-'.concat(this.state.id)} autoComplete="disable" placeholder="Lugar" value={this.state.site} onChange={(event) => {this.handleChanges('site', event.target.value)}}/>
                                <label htmlFor={'floating-name-'.concat(this.state.id)}>Lugar</label>
                            </div>
                            <div className="form-floating mt-3">
                                <DatePicker
                                    className="form-control p-1"
                                    calendarClassName="rounded"
                                    required
                                    onChange={value => {this.handleChanges('date', value)}}
                                    value={ this.state.date }
                                />
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

export default ModalCalendar
