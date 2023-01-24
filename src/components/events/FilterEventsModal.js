import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'
import DatePicker from "react-date-picker";

function FilterEventsModal(props) {
    const [state, setState] = useState({
        sport: '',
        modality: '',
        evenName: '',
        date: '',

        wasInit: false
    });
    const navigate = useNavigate()
    
    const handleChanges = (property, value) => {
        state[property] = value;
        setState(state);
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let query_params = []

        if (state['sport'] !== '') {
            query_params.push('sport=' + state.sport)
        }
        if (state['modality'] !== '') {
            query_params.push('modality=' + state.modality)
        }
        if (state['evenName'] !== '') {
            query_params.push('evenName=' + state.evenName)
        }
        if (state['date'] !== '') {
            query_params.push('date=' + state.date)
        }

        navigate('/eventos/buscar?' + query_params.join('&'))

        let modal = document.getElementById(props.id)
        let modal_backdrop = document.getElementsByClassName('modal-backdrop fade show')

        modal.setAttribute('style', 'display: none;')
        modal_backdrop[0].remove()
    }

    const title = () => {
        if (!state.wasInit) {
            return "Buscar Evento"
        } else {
            return props.obj.sport.concat(' ').concat(props.obj.modality).concat(' ').concat(props.obj.evenName)
        }
    }

    return (
        <div className="modal fade" id={ props.id } data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={ props.id.concat('-label') } aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-4" id={ props.id.concat('-label') }>{ title() }</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form className="p-3" onSubmit={event => handleSubmit(event)}>
                        <div className="form-floating">
                            <div className="row p-3 border rounded mx-auto mt-3 bg-light">
                                <div className="col row row-cols-1 row-cols-md-2 g-1">
                                    <div className="col px-1">
                                        <input type="text" className="form-control" id={'floating-sport'} placeholder="Deporte" onChange={event => handleChanges('sport', event.target.value)}/>
                                    </div>
                                    <div className="col px-1">
                                        <input type="text" className="form-control" id={'floating-modality'} placeholder="Modalidad" onChange={event => handleChanges('modality', event.target.value)}/>
                                    </div>
                                    <div className="col px-1">
                                        <input type="text" className="form-control" id={'floating-evenName'} placeholder="Nombre" onChange={event => handleChanges('evenName', event.target.value)}/>
                                    </div>
                                    <div className="col px-1">
                                        <DatePicker
                                            className="form-control p-1"
                                            calendarClassName="rounded"
                                            onChange={value => {handleChanges('date', value)}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-top-0 p-0 mt-3">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="submit" className="btn btn-primary">Buscar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FilterEventsModal
