import React from 'react'
import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import useAxios from '../../hooks/useAxios'
import { socialUsers } from '../../constants/api/api'
import AuthContext from '../../context/AuthContext'
import { urlMessage } from '../common/FormMessages'
import FormError from '../common/FormError'
import { avatarError } from '../common/ErrorMessages'

/**
 * This is the Avatar Update component where the user can update their Avatar image.
 * The form input is validated with Yup.
 * On submit, the image link is send to the API.
 * On success, the response is saved in the auth variable, which saves the response in Local Storage through useContext.
 */

// Validating form input with Yup.
const schema = yup.object().shape({
    avatar: yup
        .string()
        .required('Please enter the URL to you new profile picture.')
        .matches(
            /[(http(s)?):(www)?a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&=]*)/,
            'Please enter a valid url.'
        ),
})

function AvatarUpdate() {
    // Setting up useStates to handle the form submit, and any errors. Using useContext to handle authentication.
    const [submitting, setSubmitting] = useState(false)
    const [updateError, setUpdateError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)

    // Declaring the Axios instance.
    const http = useAxios()

    // Declaring register, handleSubmit, reset, and errors for the post form.
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    // Creating the URL for the API call.
    const endpoint = socialUsers + '/' + auth.name + '/media'

    // This function runs on submit.
    async function onSubmit(data) {
        setSubmitting(true)
        setUpdateError(null)

        // Making the put request. On success, adding the result to the auth array.
        // Setting error as the value of updateError, and submitting to false.
        try {
            const response = await http.put(endpoint, data)
            setAuth({ ...auth, avatar: response.data.avatar })
            reset()
        } catch (error) {
            console.log(error)
            setUpdateError(error.toString())
        } finally {
            setSubmitting(false)
        }
    }

    // Rendering the form to update image.
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
