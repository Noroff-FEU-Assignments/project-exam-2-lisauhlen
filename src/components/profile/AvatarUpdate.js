import React from 'react'
import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import useAxios from '../../hooks/useAxios'
import { socialUsers } from '../../constants/api/api'
import AuthContext from '../../context/AuthContext'
import FormError from '../common/FormError'
import { avatarError } from '../common/ErrorMessages'
import { urlMessage } from '../common/FormMessages'

const schema = yup.object().shape({
    avatar: yup
        .string()
        .required('Please enter the URL to you new profile picture.')
        .matches(
            /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
            'Please enter a valid url.'
        ),
})

function AvatarUpdate() {
    const [submitting, setSubmitting] = useState(false)
    const [updateError, setUpdateError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)

    const http = useAxios()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const endpoint = socialUsers + '/' + auth.name + '/media'

    async function onSubmit(data) {
        setSubmitting(true)
        setUpdateError(null)

        try {
            const response = await http.put(endpoint, data)
            console.log(response.data)
            setAuth({ ...auth, avatar: response.data.avatar })
            reset()
        } catch (error) {
            console.log(error)
            setUpdateError(error.toString())
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="update-images">
                {updateError && <FormError>{avatarError}</FormError>}
                <fieldset disabled={submitting}>
                    <div className="flex-elements">
                        <input
                            {...register('avatar')}
                            placeholder="URL to your new profile picture"
                            className="form-input"
                        />
                        <button className="input-button">
                            {submitting ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                    <p className="url-message">{urlMessage}</p>
                    {errors.avatar && (
                        <FormError>{errors.avatar.message}</FormError>
                    )}
                </fieldset>
            </form>
        </>
    )
}

export default AvatarUpdate
