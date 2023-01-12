import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import '../src/assets/bootstrap-5.2.3-dist/css/bootstrap.css'

import App from './components/App';

const html = document.getElementsByTagName('html')
html[0].setAttribute('class', 'h-100')

const body = document.getElementsByTagName('body')
body[0].setAttribute('class', 'h-100')

const root = document.getElementById('root')
root.setAttribute('class', 'd-flex flex-column h-100')

const react_root = ReactDOM.createRoot(root);
react_root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
