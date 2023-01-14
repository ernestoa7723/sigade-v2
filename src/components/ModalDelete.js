import React, {Component} from "react";
import axios from "axios";


class ModalDelete extends Component {
    getDate = (date) => {
        const months = {
            '01': 'Enero', '02': 'Febrero', '03': 'Marzo', '04': 'Abril', '05': 'Mayo', '06': 'Junio',
            '07': 'Julio', '08': 'Agosto', '09': 'Septiembre', '10': 'Octubre', '11': 'Noviembre', '12': 'Diciembre'
        }

        let view_date = date.split('T')[0].split('-')

        let year = view_date[0]
        let month = view_date[1]
        let day = view_date[2]

        for (let monthsKey in months) {
            if (monthsKey === month) {
                month = months[monthsKey]
            }
        }

        return day.concat(' de ').concat(month).concat(' del ').concat(year)
    }

    handleSubmit = (event) => {
        event.preventDefault()

        if (this.props.api_connection) {
            let url = ""

            // TODO del http://127.0.0.1:8080/medals/id obj.id
            if (this.props.model === 'MedalsTable') {
                url = "http://127.0.0.1:8080/medals/id".concat(this.props.obj.id)
            }

            // TODO del http://127.0.0.1:8080/users/id obj.userId ?id= obj.userId
            if (this.props.model === 'User') {
                url = "http://127.0.0.1:8080/users/id".concat(this.props.obj.userId).concat('?id=').concat(this.props.obj.userId)
            }

            // TODO del http://127.0.0.1:8080/sports/id obj.sportId ?id= obj.sportId
            if (this.props.model === 'Sport') {
                url = "http://127.0.0.1:8080/sports/id".concat(this.props.obj.sportId).concat('?id=').concat(this.props.obj.sportId)
            }

            // TODO del http://127.0.0.1:8080/events/id obj.eventId ?id= obj.eventId
            if (this.props.model === 'Event') {
                url = "http://127.0.0.1:8080/events/id".concat(this.props.obj.eventId).concat('?id=').concat(this.props.obj.eventId)
            }

            // TODO del http://127.0.0.1:8080/calendars/id obj.idCalendar ?id= obj.idCalendar
            if (this.props.model === 'Calendar') {
                url = "http://127.0.0.1:8080/calendars/id".concat(this.props.obj.idCalendar).concat('?id=').concat(this.props.obj.idCalendar)
            }

            // TODO del http://127.0.0.1:8080/reports/id obj.idReport ?id= obj.idReport
            if (this.props.model === 'Report') {
                url = "http://127.0.0.1:8080/reports/id".concat(this.props.obj.idReport).concat('?id=').concat(this.props.obj.idReport)
            }
            async function deleteObj() {
                const response = axios.delete(url)
                console.log(response)
            }

            deleteObj()
        } else {
            console.log(this.props.obj)
        }

        let modal = document.getElementById(this.props.id)
        let modal_backdrop = document.getElementsByClassName('modal-backdrop fade show')

        modal.setAttribute('style', 'display: none;')
        modal_backdrop[0].remove()
    }

    title = () => {
        if (this.props.model === 'MedalsTable') {
            return "Eliminar tabla de medallas".concat(' ').concat(this.props.obj.id)
        }
        if (this.props.model === 'User') {
            return "Eliminar usuario".concat(' ').concat(this.props.obj.userId)
        }
        if (this.props.model === 'Sport') {
            return "Eliminar deporte".concat(' ').concat(this.props.obj.name).concat(' ').concat(this.props.obj.modality).concat(' ').concat(this.props.obj.sex)
        }
        if (this.props.model === 'Event') {
            return "Eliminar evento".concat(' ').concat(this.props.obj.sport).concat(' ').concat(this.props.obj.modality).concat(' ').concat(this.props.obj.evenName)
        }
        if (this.props.model === 'Calendar') {
            return "Eliminar calendario".concat(' ').concat(this.getDate(this.props.obj.date))
        }
        if (this.props.model === 'Report') {
            return "Eliminar reporte".concat(' ').concat(this.props.obj.event)
        }
    }

    confirmation = () => {
        if (this.props.model === 'MedalsTable') {
            return "'Tabla de medallas".concat(' ').concat(this.props.obj.id).concat("'")
        }
        if (this.props.model === 'User') {
            return "'usuario".concat(' ').concat(this.props.obj.userId).concat("'")
        }
        if (this.props.model === 'Sport') {
            return "'".concat(this.props.obj.name).concat(' ').concat(this.props.obj.modality).concat(' ').concat(this.props.obj.sex).concat("'")
        }
        if (this.props.model === 'Event') {
            return "'".concat(this.props.obj.sport).concat(' ').concat(this.props.obj.modality).concat(' ').concat(this.props.obj.evenName).concat("'")
        }
        if (this.props.model === 'Calendar') {
            return "'".concat(this.getDate(this.props.obj.date)).concat("'")
        }
        if (this.props.model === 'Report') {
            return "'".concat(this.props.obj.event).concat("'")
        }
    }

    render() {
        return (
            <div className="modal fade" id={this.props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={this.props.id.concat('-label')} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header text-start">
                            <h1 className="modal-title fs-4" id={this.props.id.concat('-label')}>{ this.title() }</h1>
                            <button type="button" className="btn-close mt-0 mb-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="p-3" onSubmit={event => this.handleSubmit(event)}>
                            <div className="text-start">
                                <p>
                                    ¿Está seguro que desea eliminar { this.confirmation() }?
                                    <br/>
                                    Los datos eliminados no se podrán recuperar.
                                </p>
                            </div>
                            <div className="modal-footer border-top-0 p-0 mt-3">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-danger">Eliminar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalDelete
