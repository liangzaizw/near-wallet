import React from 'react'
import styled from 'styled-components'
import Balance from '../../common/Balance'
import { Translate } from 'react-localize-redux'

const Container = styled.div`

    .input-wrapper {
        display: flex;
        align-items: center;
        border-bottom: 2px solid #CCCCCC;
        color: #24272A;
        font-size: 34px;
        color: #CCCCCC;
        border-color: ${props => props.status ? props.status : ''};

        span {
            margin-right: 10px;
            font-size: 70%;
            font-weight: 500 !important;
            color: ${props => props.hasValue ? '#24272A' : ''};
        }
    }

    input {
        background: none !important;
        border: 0 !important;
        font-size: 40px !important;
        padding: 0 !important;
        margin: 0 !important;
        font-weight: 500 !important;
        color: #24272A !important;
        color: ${props => props.status === '#ff585d' ? props.status : '#24272A'} !important;

        ::placeholder {
            color: #CCCCCC;
            opacity: 1;
        }
    }

    .available-balance {
        cursor: pointer;
        margin-top: 10px;
        font-size: 13px;
        display: flex;
        line-height: normal;
        color: ${props => props.status === '#ff585d' ? props.status : ''};
    }
`

export default function AmountInput({
    value, onChange, valid, loading, insufficientBalance,
    availableBalance, availableClick = null, action
}) {
    let validationStatus
    if (valid) {
        validationStatus = '#6AD1E3'
    } else if (insufficientBalance) {
        validationStatus = '#ff585d'
    }

    return (
        <Container status={validationStatus} hasValue={value.length}>
            <div className='input-wrapper'>
                <span>Ⓝ</span>
                <input 
                    disabled={loading} 
                    type='number' 
                    autoFocus 
                    placeholder='0' 
                    value={value} 
                    onChange={e => onChange(e.target.value)}
                />
            </div>
            <div className='available-balance' onClick={availableClick}>
                {insufficientBalance && 
                    <span><Translate id={`staking.${action}.input.insufficientFunds`} />&nbsp;</span>
                }
                <Translate id={`staking.${action}.input.availableBalance`} />&nbsp;<Balance amount={availableBalance} noSymbol='near'/>
            </div>
        </Container>
    )
}