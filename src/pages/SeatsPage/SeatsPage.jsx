import styled from "styled-components"
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link, createPath, useNavigate, useParams } from "react-router-dom";

export default function SeatsPage(props) {

    const navigate = useNavigate();

    const { objeto2, setObjeto2, objeto3, setObjeto3, objeto4, setObjeto4, name, setName, cpf, setCpf, cadeirasSelectNumero, setCadeirasSelectNumero} = props;

    const [cadeiras, setCadeiras] = useState([]);
    const [cadeirasSelect, setCadeirasSelect] = useState([]);

    const parametro2 = useParams();

    useEffect(() => {

        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametro2.idSessao}/seats`;

        const promise = axios.get(url);

        promise.then((resposta) => {

            setCadeiras(resposta.data.seats);
            setObjeto2(resposta.data.movie);
            setObjeto3(resposta.data.day);
            setObjeto4(resposta.data.name);

        })

        promise.catch((erro) => {

            console.log(erro.response.data);

        })

    }, []);

    function enviarInfos(e) {
        e.preventDefault();

        const obj = {
            ids: cadeirasSelect,
            name: name,
            cpf: cpf
        }

        const url = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";

        const promise = axios.post(url, obj);

        promise.then(resposta => {

        if(cadeirasSelect.length > 0) {
            console.log(resposta.data)
            navigate("/sucesso")
            console.log("Deu certo!")
        } else{
            alert("Por favor escolha um acento!")
        }
            
        });

        promise.catch(erro => console.log(erro.response.data));

    }

    function selecionarCadeira(cadeira) {

        console.log(cadeira);

        if (cadeira.isAvailable === false) {
            alert("Esse assento não está disponível");
        } else {

            let podeadd = true;
            let numero;

            cadeirasSelect.forEach(acento => {
                if (acento === cadeira.id) {
                    podeadd = false;
                    numero = cadeira.name;

                }
            });

            if (podeadd === true) {

                setCadeirasSelect([...cadeirasSelect, cadeira.id]);
                console.log([...cadeirasSelect, cadeira.id])
                setCadeirasSelectNumero([...cadeirasSelectNumero, cadeira.name])
                console.log([...cadeirasSelectNumero, cadeira.name])

            } else {
                let novosacentos = [];
                let acentosatuais = [...cadeirasSelect];

                let novosnumeros = [];
                let numerosatuais = [...cadeirasSelectNumero];

                acentosatuais.forEach(acento => {
                    if(acento != cadeira.id){

                        novosacentos.push(acento);
                    }
                })

                numerosatuais.forEach(acento => {
                    if(acento != cadeira.name){

                        novosnumeros.push(acento);
                    }
                })

                setCadeirasSelect(novosacentos);
                console.log(novosacentos);

                setCadeirasSelectNumero(novosnumeros)
                console.log(novosnumeros);

            }

        }

    }

        return (
            <PageContainer>
                Selecione o(s) assento(s)

                <SeatsContainer>

                    {cadeiras.map((cadeira, index) => (

                        <SeatItem data-test="seat"

                            key={cadeira.id}

                            isAvailable={cadeira.isAvailable}

                            id={cadeira.id}

                            array = {cadeirasSelect}

                            onClick={() => selecionarCadeira(cadeira)}

                        >{cadeira.name}</SeatItem>
                    )
                    )}

                </SeatsContainer>

                <CaptionContainer>
                    <CaptionItem>
                        <CaptionCircle1 />
                        Selecionado
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle2 />
                        Disponível
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle3 />
                        Indisponível
                    </CaptionItem>
                </CaptionContainer>

                <form onSubmit={enviarInfos}>

                    <FormContainer>
                        Nome do Comprador:
                        <input data-test="client-name" type="text" id="nome" value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite seu nome..." required />

                        CPF do Comprador:
                        <input data-test="client-cpf" type="text" id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="Digite seu CPF..." required/>

                    </FormContainer>

                    <FormContainer2>


                        <button data-test="book-seat-btn" type="submit">Reservar Assento(s)</button>


                    </FormContainer2>

                </form>


                <FooterContainer data-test="footer" >
                    <div>
                        <img src={objeto2.posterURL} alt="poster" />
                    </div>
                    <div>
                        <p>{objeto2.title}</p>
                        <p>{objeto3.weekday} - {objeto4}</p>
                    </div>
                </FooterContainer>

            </PageContainer>
        )
    }

    const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
    const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
    const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 18px;
    color:#293845;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    
    input {
        width: calc(100vw - 60px);
    }
`
    const FormContainer2 = styled.div`
    width: 375px; 
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    margin-top: 41px;
    
    button {
    height: 42px;
    width: 225px;
    border-radius: 3px;
    background-color: #E8833A;
    color: #ffffff;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0.04em;
    text-align: center;
    border: none;
    }
`
    const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
    const CaptionCircle1 = styled.div`
    border: 1px solid #0E7D71;         // Essa cor deve mudar
    background-color: #1AAE9E;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
    const CaptionCircle2 = styled.div`
    border: 1px solid #7B8B99;         // Essa cor deve mudar
    background-color: #C3CFD9;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
    const CaptionCircle3 = styled.div`
    border: 1px solid #F7C52B;         // Essa cor deve mudar
    background-color: #FBE192;    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
    const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
    const SeatItem = styled.div`
    /* Estilos padrão para todas as cadeiras */
    border: 1px solid ${({ isAvailable, array, id }) =>
            isAvailable && array.includes(id) ? '#0E7D71' : isAvailable && !array.includes(id) ? '#7B8B99' : '#F7C52B'};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;

    cursor: ${({ isAvailable }) => (isAvailable ? 'pointer' : 'not-allowed')};

    /* Estilos condicionais com base em isAvailable */
    background-color: ${({ isAvailable, array, id }) =>
             isAvailable && array.includes(id) ? '#1AAE9E' : isAvailable && !array.includes(id) ? '#C3CFD9' : '#FBE192'};
`;

    const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`