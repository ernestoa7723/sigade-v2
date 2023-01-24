import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

function FilterSportsModal(props) {
    const [state, setState] = useState({
        name: '',
        modality: '',
        sex: '',
        faculty: '',

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

        if (state['name'] !== '') {
            query_params.push('name=' + state.name)
        }
        if (state['faculty'] !== '') {
            query_params.push('faculty=' + state.faculty)
        }
        if (state['modality'] !== '') {
            query_params.push('modality=' + state.modality)
        }
        if (state['sex'] !== '') {
            query_params.push('sex=' + state.sex)
        }

        navigate('/deportes/buscar?' + query_params.join('&'))

        let modal = document.getElementById(props.id)
        let modal_backdrop = document.getElementsByClassName('modal-backdrop fade show')

        modal.setAttribute('style', 'display: none;')
        modal_backdrop[0].remove()
    }

    const title = () => {
        if (!state.wasInit) {
            return 'Buscar Deporte'
        } else {
            return <span>{props.obj.name.concat(' ').concat(props.obj.modality).concat(' ').concat(props.obj.sex)}</span>
        }
    }

    const modalityTeam = () => {
        if (state.wasInit) {
            if (props.obj.modality === 'Equipo') {
                return <input className="form-check-input" type="radio" name={'inlineRadioModalityOptions_'.concat(state.id)} id={'inlineRadioTeam_'.concat(state.id)} value="Equipo" checked onChange={event => handleChanges('modality', event.target.value)}/>
            }
        }
        return <input className="form-check-input" type="radio" name={'inlineRadioModalityOptions'} id={'inlineRadioTeam'} value="Equipo" onChange={event => handleChanges('modality', event.target.value)}/>
    }

    const modalitySingle = () => {
        if (state.wasInit) {
            if (props.obj.modality === 'Individual') {
                return <input className="form-check-input" type="radio" name={'inlineRadioModalityOptions_'.concat(state.id)} id={'inlineRadioSingle_'.concat(state.id)} value="Individual" checked onChange={event => handleChanges('modality', event.target.value)}/>
            }
        }
        return <input className="form-check-input" type="radio" name={'inlineRadioModalityOptions'} id={'inlineRadioSingle'} value="Individual" onChange={event => handleChanges('modality', event.target.value)}/>
    }

    const sexMale = () => {
        if (state.wasInit) {
            if (props.obj.sex === 'Masculino') {
                return <input className="form-check-input" type="radio" name={'inlineRadioSexOptions-'.concat(state.userId)} id={'inlineRadioMan-'.concat(state.userId)} value="Masculino" checked onChange={(event) => {handleChanges('sex', event.target.value)}}/>
            }
        }
        return <input className="form-check-input" type="radio" name={'inlineRadioSexOptions'} id={'inlineRadioMan'} value="Masculino"  onChange={(event) => {handleChanges('sex', event.target.value)}}/>
    }

    const sexFemale = () => {
        if (state.wasInit) {
            if (props.obj.sex === 'Femenino') {
                return <input className="form-check-input" type="radio" name={'inlineRadioSexOptions-'.concat(state.userId)} id={'inlineRadioWoman-'.concat(state.userId)} value="Femenino" checked onChange={(event) => {handleChanges('sex', event.target.value)}}/>
            }
        }
        return <input className="form-check-input" type="radio" name={'inlineRadioSexOptions'} id={'inlineRadioWoman'} value="Femenino" onChange={(event) => {handleChanges('sex', event.target.value)}}/>
    }

    const sexMix = () => {
        if (state.wasInit) {
            if (props.obj.sex === 'Mixto') {
                return <input className="form-check-input" type="radio" name={'inlineRadioSexOptions_'.concat(state.id)} id={'inlineRadioMix_'.concat(state.id)} value="Mixto" checked onChange={event => handleChanges('sex', event.target.value)}/>
            }
        }
        return <input className="form-check-input" type="radio" name={'inlineRadioSexOptions'} id={'inlineRadioMix'} value="Mixto" onChange={event => handleChanges('sex', event.target.value)}/>
    }

    return (
        <div className="modal fade" id={props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={props.id.concat('-label')} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-4" id={props.id.concat('-label')}>{ title() }</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="p-3" onSubmit={event => handleSubmit(event)}>
                            <div className="form-floating">
                                <input type="text" className="form-control" id={'floating-name'} autoComplete="disable" placeholder="Nombre" onChange={(event) => {handleChanges('name', event.target.value)}}/>
                                <label htmlFor={'floating-name'}>Nombre</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input type="text" className="form-control" id={'floating-faculty'} autoComplete="disable" placeholder="Facultad" onChange={(event) => {handleChanges('faculty', event.target.value)}}/>
                                <label htmlFor={'floating-faculty'}>Facultad</label>
                            </div>
                            <div className='row mx-auto mt-3'>
                                <div className="form-floating col row row-cols-1 px-0 mx-auto">
                                    <div className="col text-start fw-bold">
                                        Modalidad
                                    </div>
                                    <div className="col row row-cols-1 mx-auto mt-1">
                                        <div className="form-check form-check-inline col col-lg-auto text-start">
                                            { modalityTeam() }
                                            <label className="form-check-label" htmlFor={'inlineRadioTeam'}>Equipo</label>
                                        </div>
                                        <div className="form-check form-check-inline col col-lg-auto text-start">
                                            { modalitySingle() }
                                            <label className="form-check-label" htmlFor={'inlineRadioSingle'}>Individual</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-floating col row row-cols-1 px-0 mx-auto">
                                    <div className="col text-start fw-bold">
                                        Sexo
                                    </div>
                                    <div className="col row row-cols-1 mx-auto mt-1">
                                        <div className="form-check form-check-inline col col-lg-auto text-start">
                                            { sexMale() }
                                            <label className="form-check-label" htmlFor={'inlineRadioMale'}>Masculino</label>
                                        </div>
                                        <div className="form-check form-check-inline col col-lg-auto text-start">
                                            { sexFemale() }
                                            <label className="form-check-label" htmlFor={'inlineRadioFemale'}>Femenino</label>
                                        </div>
                                        <div className="form-check form-check-inline col col-lg-auto text-start">
                                            { sexMix() }
                                            <label className="form-check-label" htmlFor={'inlineRadioMix'}>Mixto</label>
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
        </div>
    )
}

export default FilterSportsModal
