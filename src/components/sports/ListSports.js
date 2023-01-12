import React, {Component} from "react";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

import ModalSport from "./ModalSport";
import ModalDelete from "../ModalDelete";


class ListSports extends Component {
    createSportModal = () => {
        if (this.props.user !== null) {
            return (
                <div className="col-auto px-1 ms-auto my-auto">
                    <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#create-sport-modal">Añadir</button>
                    <ModalSport id={'create-sport-modal'} obj={null} api_connection={this.props.api_connection} />
                </div>
            )
        }
    }

    updateSportModal = (index, sport) => {
        if (this.props.user !== null) {
            return (
                <div className="col text-center">
                    <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={'#update-sport-modal-'.concat(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>
                    <ModalSport id={'update-sport-modal-'.concat(index)} obj={sport} api_connection={this.props.api_connection} />
                </div>
            )
        }
    }

    deleteSportModal = (index, sport) => {
        if (this.props.user !== null) {
            return (
                <div className="col text-center">
                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={'#delete-sport-modal-'.concat(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                        </svg>
                    </button>
                    <ModalDelete id={'delete-sport-modal-'.concat(index)} model={'Sport'} obj={sport} api_connection={this.props.api_connection} />
                </div>
            )
        }
    }

    render() {
        return (
            <main className="flex-shrink-0">
                <div className="container p-3">
                    <div className="row row-cols-1 row-cols-md-auto">
                        <div className="col-auto">
                            <h1>Deportes</h1>
                        </div>
                        { this.createSportModal() }
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Modalidad</th>
                                    <th scope="col">Sex</th>
                                    <th scope="col">Facultad</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {
                                this.props.Sport.map(
                                    (sport, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{sport.name}</td>
                                                <td>{sport.modality}</td>
                                                <td>{sport.sex}</td>
                                                <td>{sport.faculty}</td>
                                                <td>
                                                    <div className="row row-cols-1 row-cols-md-2 g-1 m-0">
                                                        { this.updateSportModal(index, sport) }
                                                        { this.deleteSportModal(index, sport) }
                                                    </div>
                                                </td>
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
}

export default ListSports
