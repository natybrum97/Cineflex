import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react";

export default function App() {

    axios.defaults.headers.common['Authorization'] = 'dDfHIe4yQDK16EKpL7Q9TzAH';

    const [objeto2, setObjeto2] = useState({});
    const [objeto3, setObjeto3] = useState({});
    const [objeto4, setObjeto4] = useState(undefined);
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [cadeirasSelectNumero, setCadeirasSelectNumero] = useState([]);
    const [cadeirasSelect, setCadeirasSelect] = useState([]);


    return (
        <>
            <BrowserRouter>

                <NavContainer>CINEFLEX</NavContainer>

                <Routes>

                <Route path="/" element={<HomePage />}></Route>
                <Route path="/sessoes/:idFilme" element={<SessionsPage />}></Route>
                <Route path="/assentos/:idSessao" element={<SeatsPage objeto2={objeto2} setObjeto2={setObjeto2} objeto3={objeto3} setObjeto3={setObjeto3} objeto4={objeto4} setObjeto4={setObjeto4} name={name} setName={setName} cpf={cpf} setCpf={setCpf} cadeirasSelectNumero={cadeirasSelectNumero} setCadeirasSelectNumero={setCadeirasSelectNumero} cadeirasSelect={cadeirasSelect} setCadeirasSelect={setCadeirasSelect} />}></Route>
                <Route path="/sucesso" element={<SuccessPage objeto2={objeto2} setObjeto2={setObjeto2} objeto3={objeto3} setObjeto3={setObjeto3} objeto4={objeto4} setObjeto4={setObjeto4} name={name} setName={setName} cpf={cpf} setCpf={setCpf} cadeirasSelectNumero={cadeirasSelectNumero} setCadeirasSelectNumero={setCadeirasSelectNumero} cadeirasSelect={cadeirasSelect} setCadeirasSelect={setCadeirasSelect} />}></Route>
                  
                </Routes>

            </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
