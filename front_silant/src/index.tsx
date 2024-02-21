
import ReactDOM from 'react-dom/client';
import './style/index.scss';
import App from './App';
import "./style/fonts.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {setupStore} from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const store = setupStore()
root.render(
    <Provider store={store}>
        <BrowserRouter>
           <App />
        </BrowserRouter>
    </Provider>

);