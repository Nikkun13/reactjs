import { useState, createContext, useContext } from 'react'
import './notification.css'

const Notification = ({ message, severity }) => {

    const claseNotification = (severity) => {
        if (severity === 'success') {
            return 'verde'
        } else if (severity === 'warning') {
            return 'amarillo'
        } else {
            return 'rojo'
        }
    }
    

    if (message === '') {
        return (null)
    }

    return(
        <div className={`estiloNotificacion ${claseNotification(severity)}`}> 
            {message}
        </div>
    )
}

const NotificationContext = createContext()

export const NotificationProvider = ({children}) => {
    const [message, setMessage] = useState('')
    const [severity,setSeverity] = useState('')

    const setNotification = (sev, msg) => {
        setMessage(msg)
        setSeverity(sev)
        setTimeout(() => {
            setMessage('')
        },3000)
    }

    return(
        <NotificationContext.Provider value={{setNotification}}>
            <Notification message={message} severity={severity}/>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    return useContext(NotificationContext)
}