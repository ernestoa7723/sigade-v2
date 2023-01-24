import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import '../../assets/bootstrap-5.2.3-dist/css/bootstrap.css'
import '../../assets/bootstrap-5.2.3-dist/js/bootstrap.bundle'

function FilterUsersModal(props) {
    const [state, setState] = useState({
            name: '',
            lastName: '',
            username: '',
            lapel: '',
            ci: '',
            type: '',
            sex: '',
    
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
        if (state['lastName'] !== '') {
            query_params.push('Lastname=' + state.lastName)
        }
        if (state['username'] !== '') {
            query_params.push('userName=' + state.username)
        }
        if (state['lapel'] !== '') {
            query_params.push('lape=' + state.lapel)
        }
        if (state['sex'] !== '') {
            query_params.push('sex=' + state.sex)
        }
        if (state['type'] !== '') {
            query_params.push('type=' + state.type)
        }

        navigate('/usuarios/buscar?' + query_params.join('&'))

        let modal = document.getElementById(props.id)
        let modal_backdrop = document.getElementsByClassName('modal-backdrop fade show')

        modal.setAttribute('style', 'display: none;')
        modal_backdrop[0].remove()
    }

    const title = () => {
        if (!state.wasInit) {
            return "Buscar usuario"
        } else {
            return props.obj.name.concat(' ').concat(props.obj.lastName)
        }
    }

    const typeStudent = () => {
        if (state.wasInit) {
            if (props.obj.type === 'Estudiante') {
                return <input className="form-check-input" type="radio" name={'inlineRadioTypeOptions-'.concat(state.userId)} id={'inlineRadioStudent-'.concat(state.userId)} value="Estudiante" checked onChange={(event) => {handleChanges('type', event.target.value)}}/>
            }
        }
        return <input className="form-check-input" type="radio" name={'inlineRadioTypeOptions'} id={'inlineRadioStudent'} value="Estudiante" onChange={(event) => {handleChanges('type', event.target.value)}}/>
    }

    const typeTeacher = () => {
        if (state.wasInit) {
            if (props.obj.type === 'Profesor') {
                return <input className="form-check-input" type="radio" name={'inlineRadioTypeOptions-'.concat(state.userId)} id={'inlineRadioTeacher-'.concat(state.userId)} value="Profesor" checked onChange={(event) => {handleChanges('type', event.target.value)}}/>
            }
        }
        return <input className="form-check-input" type="radio" name={'inlineRadioTypeOptions'} id={'inlineRadioTeacher'} value="Profesor" onChange={(event) => {handleChanges('type', event.target.value)}}/>
    }

    const typeAssociatedDean = () => {
        if (state.wasInit) {
            if (props.obj.type === 'Vicedecano') {
                return <input className="form-check-input" type="radio" name={'inlineRadioTypeOptions-'.concat(state.userId)} id={'inlineRadioAssociateDean-'.concat(state.userId)} value="Vicedecano" checked onChange={(event) => {handleChanges('type', event.target.value)}}/>
            }
        }
        return <input className="form-check-input" type="radio" name={'inlineRadioTypeOptions'} id={'inlineRadioAssociateDean'} value="Vicedecano" onChange={(event) => {handleChanges('type', event.target.value)}}/>
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

    return (
        <div className="modal fade" id={props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={props.id.concat('-label')} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-4" id={props.id.concat('-label')}>{ title() }</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={event => handleSubmit(event)}>
                            <div className="form-floating">
                                <input type="text" className="form-control" id={'floating-name'} autoComplete="disable" placeholder="Nombre" onChange={(event) => {handleChanges('name', event.target.value)}}/>
                                <label htmlFor={'floating-name-'.concat(state.userId)}>Nombre</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input type="text" className="form-control" id={'floating-lastName'} autoComplete="disable" placeholder="Apellidos" onChange={(event) => {handleChanges('lastName', event.target.value)}}/>
                                <label htmlFor={'floating-lastName-'.concat(state.userId)}>Apellidos</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input type="text" className="form-control" id={'floating-username'} autoComplete="disable" placeholder="Nombre de usuario" onChange={(event) => {handleChanges('username', event.target.value)}}/>
                                <label htmlFor={'floating-username-'.concat(state.userId)}>Nombre de usuario</label>
                            </div>
                            <div className="form-floating mt-3">
                                <input type="text" className="form-control" id={'floating-lapel'} autoComplete="disable" placeholder="Solapín" onChange={(event) => {handleChanges('lapel', event.target.value)}}/>
                                <label htmlFor={'floating-lapel-'.concat(state.userId)}>Solapín</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control mt-3" id={"floating-ci"} autoComplete="disable" placeholder="Carnet de identidad" onChange={(event) => {handleChanges('ci', event.target.value)}}/>
                                <label htmlFor={"floating-ci-".concat(state.userId)}>Carnet de identidad</label>
                            </div>
                            <div className="form-floating row p-0 ms-3 mt-3 text-start">
                                <div className="col-4 col-sm-3 p-0 fw-bold">
                                    Tipo
                                </div>
                                <div className="col-8 col-sm-9 row row-cols-1 row-cols-sm-3 p-0 m-0">
                                    <div className="form-check form-check-inline col p-0 m-0">
                                        { typeStudent() }
                                        <label className="form-check-label" htmlFor={'inlineRadioStudent'}>Estudiante</label>
                                    </div>
                                    <div className="form-check form-check-inline col p-0 m-0">
                                        { typeTeacher() }
                                        <label className="form-check-label" htmlFor={'inlineRadioTeacher'}>Profesor</label>
                                    </div>
                                    <div className="form-check form-check-inline col p-0 m-0">
                                        { typeAssociatedDean() }
                                        <label className="form-check-label" htmlFor={'inlineRadioAssociateDean'}>Vicedecano</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-floating row p-0 ms-3 mt-3 text-start">
                                <div className="col-4 col-sm-3 p-0 fw-bold">
                                    Sexo
                                </div>
                                <div className="col-8 col-sm-9 row row-cols-1 row-cols-sm-3 p-0 m-0">
                                    <div className="form-check form-check-inline col p-0 m-0">
                                        { sexMale() }
                                        <label className="form-check-label" htmlFor={'inlineRadioMan'}>Masculino</label>
                                    </div>
                                    <div className="form-check form-check-inline col p-0 m-0">
                                        { sexFemale() }
                                        <label className="form-check-label" htmlFor={'inlineRadioWoman'}>Femenino</label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 text-end">
                                <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Buscar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterUsersModal
