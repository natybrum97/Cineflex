import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";

const GoBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const back = () => {
    navigate(-1); // Redireciona para a página anterior
  };

  // Verifica se a localização atual é diferente da página inicial
  const condicao = location.pathname !== "/";

  return (
    condicao && (
      <ButtonContainer>
        <BackButton data-test="go-home-header-btn" onClick={back}>
          <IonIcon icon={arrowBackOutline} />
        </BackButton>
      </ButtonContainer>
    )
  );
};

const ButtonContainer = styled.div`
  position: fixed;
  top: 16px;
  left: 20px;
`;

const BackButton = styled.button`
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  ion-icon {
    font-size: 24px;
    color: #000000;
  }
`;

export default GoBackButton;
