import styled from "styled-components"
import { Link } from "react-router-dom";

export default function SuccessPage(props) {

    const {objeto2, objeto3, objeto4, name, cpf, setName, setCpf, cadeirasSelectNumero, setCadeirasSelectNumero,cadeirasSelect, setCadeirasSelect} = props;

    function zerarArrays () {
        const array = [];
        setCadeirasSelect(array);
        setCadeirasSelectNumero(array);
        setCpf('');
        setName('');
    }

    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{objeto2.title}</p>
                <p>{objeto3.date} - {objeto4}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {cadeirasSelectNumero.map(cadeira => <p key={cadeira}>Assento {cadeira} </p>)}

            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {name}</p>
                <p>CPF: {cpf}</p>
            </TextContainer>

            <Link data-test="go-home-btn" to="/">
                <button onClick={zerarArrays}>Voltar para Home</button>
            </Link>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`