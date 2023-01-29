import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Api from '../Api/index.js';
import Error from '../components/Error/index.js';
import HeaderLayout from '../components/Layout/HeaderLayout.js';
import LoadingAnimation from '../components/LoadingAnimation/index.js';
import styles from './Variables.module.css'
import './global.css'

function Variables() {
    const [variable, setVariable] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()

    useEffect(() => {
        setLoading(true)

        Api
            .getVehicleVariables()
            .then(list => {
                setVariable(list.Results)
                setError('')
            })
            .catch(err => setError(err))
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <>
            <HeaderLayout>
                <div className={styles.div}>
                    <NavLink className={styles.a} onClick={() => navigation(-1)}>Back</NavLink>
                    <NavLink className={styles.a} onClick={() => navigation(+1)}>Next</NavLink>
                </div>
            </HeaderLayout>
            {error && (
                <Error value={error} />
            )}
            {loading && (
                <LoadingAnimation loading={loading} />
            )}
            <ul className={styles.ul}>{variable.length > 0 && (
                variable.map(res => <li key={res.ID}><NavLink className={styles.link} to={`/variables/${res.ID}`}>{res.Name}</NavLink>: {res.Description.replace(/<\/?[^>]+>/g, '')}</li>)
            )}</ul>
        </>
    );
}

export default Variables;