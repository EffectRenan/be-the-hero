import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './styles.css'

import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function Profile() {
    const [incidents, setIncidents] = useState([])

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    const history = useHistory()

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    async function handleDeleteIncident(id) {
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch(err) {
            alert('Error!')
        }
    }

    function handleLogout() {
        localStorage.clear()
        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Welcome, {ongName}</span>

                <Link className="button" to="/incidents/new">Register new incident</Link>
                <button onClick={handleLogout} type="buton">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Registred incidents</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Incident:</strong>
                        <p>{incident.title}</p>

                        <strong>Description:</strong>
                        <p>{incident.description}</p>

                        <strong>Value:</strong>
                        <p>{Intl.NumberFormat('en-US', { style: 'currency', currency:'USD' }).format(incident.value)  }</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#A8A8B3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
