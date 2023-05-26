import styled from "styled-components"
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function SessionsPage() {

    const [sessoes, setSessoes] = useState([]);
    const [objeto, setObjeto] = useState({});

    const parametro = useParams();
    console.log(parametro);

    useEffect(() => {

        const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${parametro.idFilme}/showtimes`;

        const promise = axios.get(url);

        promise.then((resposta) => {

            console.log(resposta.data);
            setObjeto(resposta.data)
            setSessoes(resposta.data.days);

        })

        promise.catch((erro) => {

            console.log(erro.response.data);

        })

    }, []);

    return (
        <PageContainer>
            Selecione o horário
            <div>
                {sessoes.map(sessao => (

                    <SessionContainer key={sessao.id}>
                        {sessao.weekday} - {sessao.date}

                        <ButtonsContainer >

                            {sessao.showtimes.map((horario) => (

                                <Link to={`/assentos/${horario.id}`} key={horario.id}>


                                    <button>{horario.name}</button>


                                </Link>


                            )
                            )}

                        </ButtonsContainer>

                    </SessionContainer>

                )
                )}

            </div>

            <FooterContainer>
                <div>
                    <img src={objeto.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{objeto.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    font-family: Roboto;
    font-size: 24px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0.04em;
    text-align: center;

    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #293845;
    padding: 0 20px;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0.02em;
    text-align: left;
    color: #293845;

`
const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
    margin: 20px 0;

    button {
    margin-right: 8px;
    height: 43px;
    width: 83px;
    border-radius: 3px;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0.02em;
    text-align: center;
    color:#FFFFFF;


    background-color:#E8833A;
    border:none;
    }
    a {
        text-decoration: none;
    }
`
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
            font-family: Roboto;
            font-size: 26px;
            font-weight: 400;
            line-height: 30px;
            letter-spacing: 0em;
            text-align: left;
            color: #293845;

            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`