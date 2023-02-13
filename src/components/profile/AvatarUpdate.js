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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset disabled={submitting}>
                    {updateError && (
                        <FormError>
                            <p>{avatarError}</p>
                        </FormError>
                    )}
                    <input
                        {...register('avatar')}
                        placeholder="URL to your new profile picture"
                    />
                    {errors.avatar && (
                        <FormError>{errors.avatar.message}</FormError>
                    )}
                    <button>{submitting ? 'Saving...' : 'Save'}</button>
                </fieldset>
            </form>
        </div>
    )
}

export default AvatarUpdate
