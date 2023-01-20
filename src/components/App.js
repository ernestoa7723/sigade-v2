import {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import axios from "axios";

import '../App.css';

import Header from "./Header";
import ModalSignIn from "./ModalSignIn";
import ModalSignUp from "./ModalSignUp";
import Main from "./Main";

import ListMedalsTable from "./medals-table/ListMedalsTable";
import ListUsers from "./users/ListUsers";

import Footer from "./Footer";
import ListSports from "./sports/ListSports";
import ListEvents from "./events/ListEvents";
import ListCalendars from "./calendars/ListCalendars";
import ListReports from "./reports/ListReports";


function App() {
    const api_connection = true

    const [userState, setUserState] = useState();
    const [medalsTableState, setMedalsTableState] = useState();
    const [sportState, setSportState] = useState();
    const [eventState, setEventState] = useState();
    const [calendarState, setCalendarState] = useState();
    const [reportState, setReportState] = useState();

    useEffect(() => {
        const getDataUser = async () => {
            let response

            // TODO get http://127.0.0.1:8080/users/list
            if (api_connection) {
                response = await axios.get('http://127.0.0.1:8088/users/list')
            } else {
                response = await axios.get('http://127.0.0.1:3000/data.json')
            }
            const response_data = await response.data

            api_connection ? setUserState(response_data) : setUserState(response_data['User'])
        }

        const getDataMedalsTable = async () => {
            let response

            // TODO get http://127.0.0.1:8080/medals/all
            if (api_connection) {
                response = await axios.get('http://127.0.0.1:8088/medals/all')
            } else {
                response = await axios.get('http://127.0.0.1:3000/data.json')
            }
            const response_data = await response.data

            api_connection ? setMedalsTableState(response_data) : setMedalsTableState(response_data['MedalsTable'])
        }

        const getDataSport = async () => {
            let response

            // TODO get http://127.0.0.1:8080/sports/list
            if (api_connection) {
                response = await axios.get('http://127.0.0.1:8088/sports/list')
            } else {
                response = await axios.get('http://127.0.0.1:3000/data.json')
            }
            const response_data = await response.data

            api_connection ? setSportState(response_data) : setSportState(response_data['Sport'])
        }

        const getDataEvent = async () => {
            let response

            // TODO get http://127.0.0.1:8080/events/list
            if (api_connection) {
                response = await axios.get('http://127.0.0.1:8088/events/list')
            } else {
                response = await axios.get('http://127.0.0.1:3000/data.json')
            }
            const response_data = await response.data

            api_connection ? setEventState(response_data) : setEventState(response_data['Event'])
        }

        const getDataCalendar = async () => {
            let response

            // TODO get http://127.0.0.1:8080/calendars/list
            if (api_connection) {
                response = await axios.get('http://127.0.0.1:8088/calendars/list')
            } else {
                response = await axios.get('http://127.0.0.1:3000/data.json')
            }
            const response_data = await response.data

            api_connection ? setCalendarState(response_data) : setCalendarState(response_data['Calendar'])
        }

        const getDataReport = async () => {
            let response

            // TODO get http://127.0.0.1:8080/reports/list
            if (api_connection) {
                response = await axios.get('http://127.0.0.1:8088/reports/list')
            } else {
                response = await axios.get('http://127.0.0.1:3000/data.json')
            }
            const response_data = await response.data

            api_connection ? setReportState(response_data) : setReportState(response_data['Report'])
        }

        getDataUser()
        getDataMedalsTable()
        getDataSport()
        getDataEvent()
        getDataCalendar()
        getDataReport()
    }, []);

    const getUser = () => {
        return (JSON.parse(sessionStorage.getItem('user')) !== null) ? true : false
    }

    let user = getUser()

    return userState && medalsTableState && sportState && eventState && calendarState && reportState && (
        <div className="d-flex flex-column h-100">
            <BrowserRouter>
                <Header user={user}/>
                <ModalSignIn api_connection={api_connection} User={userState}/>
                <ModalSignUp api_connection={api_connection} User={userState}/>
                <Routes>
                    <Route exact path={'/'} element={<Main user={user}/>}></Route>
                    <Route exact path={'/medallas'} element={<ListMedalsTable api_connection={api_connection} user={user} MedalsTable={medalsTableState}/>}></Route>
                    <Route exact path={'/usuarios'} element={<ListUsers api_connection={api_connection} user={user} User={userState}/>}></Route>
                    <Route exact path={'/deportes'} element={<ListSports api_connection={api_connection} user={user} Sport={sportState}/>}></Route>
                    <Route exact path={'/eventos'} element={<ListEvents api_connection={api_connection} user={user} Event={eventState}/>}></Route>
                    <Route exact path={'/calendarios'} element={<ListCalendars api_connection={api_connection} user={user} Calendar={calendarState}/>}></Route>
                    <Route exact path={'/reportes'} element={<ListReports api_connection={api_connection} user={user} Report={reportState}/>}></Route>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
