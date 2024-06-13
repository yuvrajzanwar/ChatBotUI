import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const LoadingSpinner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: white;
`;

const Spinner = styled.div`
    align-self: center;
    position: relative;
    width: 80px;
    height: 80px;
`;

const bounce = keyframes`
    0%, 100% {
        transform: scale(0.0);
    }
    50% {
        transform: scale(1.0);
    }
`;

const DoubleBounce = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: white;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    animation: ${bounce} 2.0s infinite ease-in-out;

    &:nth-child(2) {
        animation-delay: -1.0s;
    }
`;

const LoadingText = styled.p`
    margin-top: 20px;
    font-size: 1.2em;
    color: #ffffff;
    font-family: 'Arial', sans-serif;
    line-height: 1.5;
    background: -webkit-linear-gradient(left, #ffffff, #2610c3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 10px;
    border-radius: 10px;
`;

const LoadingScreen = () => {
    return (
        <LoadingOverlay>
            <LoadingSpinner>
                <Spinner>
                    <DoubleBounce className="double-bounce1"></DoubleBounce>
                    <DoubleBounce className="double-bounce2"></DoubleBounce>
                </Spinner>
                <LoadingText>
                Please wait while we process your documents.<br/> This may take a few moments for larger files.
                </LoadingText>
            </LoadingSpinner>
        </LoadingOverlay>
    );
};

export default LoadingScreen;
