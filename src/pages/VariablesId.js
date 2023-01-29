import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Api from '../Api/index.js';
import Error from '../components/Error/index.js';
import HeaderLayout from '../components/Layout/HeaderLayout.js';
import LoadingAnimation from '../components/LoadingAnimation/index.js';
import styles from './VariablesId.module.css'
import './global.css'

function VariablesId() {
    const [variable, setVariable] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        setLoading(true)

        Api
            .getVehicleVariables()
            .then(list => {
                setVariable([list.Results.find(res => res.ID === +id)])
                setError('')
            })
            .catch(err => setError(err))
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    return (
        <>
            <HeaderLayout>
                <NavLink className={styles.a} onClick={() => navigation(-1)}>Back</NavLink>
            </HeaderLayout>
            {error && (
                <Error value={error} />
            )}
            {loading && (
                <LoadingAnimation loading={loading} />
            )}
            {variable.length > 0 && (
                variable.map(variable => <p className={styles.p} key={variable.ID}>{variable.Name}: {variable.Description.replace(/<\/?[^>]+>/g, '')}</p>)
            )}
        </>
    );
}

export default VariablesId;