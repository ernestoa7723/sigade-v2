import React, {useState, useEffect} from "react";

import axios from "axios";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

import ModalEvent from "./ModalEvent";
import ModalDelete from "../ModalDelete";

import FilterEventsModal from "./FilterEventsModal";


function FilterEvents(props) {
    const api_connection = props.api_connection

    const query_params = window.location.search

    const [eventState, setEventState] = useState();

    useEffect(() => {
        const getDataEvent = async () => {
            let response

            // TODO get http://127.0.0.1:8080/events/filter
            if (api_connection) {
                response = await axios.get('http://127.0.0.1:8088/events/filter' + query_params)
            } else {
                response = await axios.get('http://127.0.0.1:3000/data.json')
            }
            const response_data = await response.data

            api_connection ? setEventState(response_data) : setEventState(response_data.event)
        }

        getDataEvent()
    }, []);

    const createEventModal = () => {
        if (props.user) {
            return (
                <div className="col-auto px-1 ms-auto my-auto">
                    <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#create-event-modal">Añadir</button>
                    <ModalEvent data={props.Sport} id={'create-event-modal'} obj={null} api_connection={props.api_connection} />

                    <button className="btn btn-primary ms-3" type="button" data-bs-toggle="modal" data-bs-target="#filter-event-modal">Buscar</button>
                    <FilterEventsModal id={'filter-event-modal'}/>
                </div>
            )
        }
    }

    const adminTh = () => {
        if (props.user) {
            return (
                <th scope="col">Acciones</th>
            )
        }
    }

    const adminTd = (index, event) => {
        if (props.user) {
            return (
                <td>
                    <div className="row row-cols-1 row-cols-md-2 g-1 justify-content-evenly mx-0">
                        <div className="col text-center">
                            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={'#update-event-modal-'.concat(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </button>
                            <ModalEvent id={'update-event-modal-'.concat(index)} obj={event} api_connection={props.api_connection} />
                        </div>
                        <div className="col text-center">
                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={'#delete-event-modal-'.concat(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                </svg>
                            </button>
                            <ModalDelete id={'delete-event-modal-'.concat(index)} model={'Event'} obj={event} api_connection={props.api_connection} />
                        </div>
                    </div>
                </td>
            )
        }
    }

    const getDate = (date) => {
        const days = {
            Mon: 'Lun', Tue: 'Mar', Wed: 'Mie', Thu: 'Jue', Fri: 'Vie', Sat: 'Sab', Sun: 'Dom'
        }

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

        return <span>{day} de {month} del {year}</span>
    }

    return eventState && (
        <main className="flex-shrink-0">
            <div className="container p-3">
                <div className="row row-cols-1 row-cols-md-auto">
                    <div className="col col-4 col-md-auto">
                        <h1>Eventos</h1>
                    </div>
                    { createEventModal() }
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Deporte</th>
                            <th scope="col">Modalidad</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Fecha</th>
                            { adminTh() }
                        </tr>
                        </thead>
                        <tbody className="table-group-divider">
                        {
                            eventState.event.map(
                                (event, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{event.sport}</td>
                                            <td>{event.modality}</td>
                                            <td>{event.evenName}</td>
                                            <td>{getDate(event.date)}</td>
                                            { adminTd(index, event) }
                                        </tr>
                                    )
                                }
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}

export default FilterEvents
