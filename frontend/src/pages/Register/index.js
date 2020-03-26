import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [UF, setUF] = useState('')

    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault()

        const data = {
            name,
            email,
            whatsapp,
            city,
            UF,
        }

        try {
            const response = await api.post('ongs', data)
            alert(`Your access ID: ${response.data.id}`)
            history.push('/')

        } catch(err) {
            alert('Error! Try again')
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Registration</h1>
                    <p>Make your registration, Enter in the platform and help peaple to find out the cases in your ONG.</p>
                    <Link className='back-link' to='/' >
                        <FiArrowLeft size={16} color='#E02041' />
                        I have no account
                    </Link>

                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder="ONG's name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input=group">
                        <input
                            placeholder="City"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={UF}
                            onChange={e => setUF(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
