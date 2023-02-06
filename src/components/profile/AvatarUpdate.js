import React from 'react'
import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { BASE_URL, socialUsers } from '../../constants/api/api'
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

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const options = {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
    }

    const url = BASE_URL + socialUsers + '/' + auth.name + '/media'

    async function onSubmit(data) {
        setSubmitting(true)
        setUpdateError(null)

        console.log(url)
        console.log(data)

        try {
            const response = await axios.put(url, data, options)
            console.log(response.data)
            setAuth({ ...auth, avatar: response.data.avatar })
            reset()
        } catch (error) {
            console.log(error)
            const errorMessage = error.response.data.errors[0].message
            setUpdateError(errorMessage.toString())
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
                            <div>
                                <p>{avatarError}</p>
                                <p>Error message: {updateError}</p>
                            </div>
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
