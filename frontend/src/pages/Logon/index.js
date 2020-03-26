import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import './styles.css'
import api from '../../services/api'

import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Logon() {
    const [id, setId] = useState('')

    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await api.post('sessions', { id })

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            history.push('/profile')

        } catch(err) {
            alert('Login failed! Try again.')
        }
    }

    return(
        <div className="logon-container">
            <section className='form'>
                <img src={logoImg} alt="Be The Hero" />
                <form onSubmit={handleLogin}>
                    <h1>Sign in</h1>
                    <input
                        placeholder="Your ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type='submit'>Submit</button>
                    <Link className='back-link' to='/register' >
                        <FiLogIn size={16} color='#E02041' />
                        I have no account
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}
