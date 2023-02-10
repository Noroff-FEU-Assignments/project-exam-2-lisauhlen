import React from 'react'
import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import useAxios from '../../hooks/useAxios'
import { socialUsers } from '../../constants/api/api'
import AuthContext from '../../context/AuthContext'
import FormError from '../common/FormError'
import { bannerError } from '../common/ErrorMessages'

const schema = yup.object().shape({
    banner: yup
        .string()
        .required('Please enter the URL to you new banner image.')
        .matches(
            /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
            'Please enter a valid url.'
        ),
})

function BannerUpdate() {
    const [submitting, setSubmitting] = useState(false)
    const [updateError, setUpdateError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)

    const http = useAxios()
    const endpoint = socialUsers + '/' + auth.name + '/media'

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    async function onSubmit(data) {
        setSubmitting(true)
        setUpdateError(null)

        try {
            const response = await http.put(endpoint, data)
            console.log(response)
            setAuth({ ...auth, banner: response.data.banner })
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
                {updateError && (
                    <FormError>
                        <div>
                            <p>{bannerError}</p>
                            <p>Error message: {updateError}</p>
                        </div>
                    </FormError>
                )}
                <fieldset disabled={submitting}>
                    <input
                        {...register('banner')}
                        placeholder="URL to your new banner image"
                    />
                    {errors.banner && (
                        <FormError>{errors.banner.message}</FormError>
                    )}
                    <button>{submitting ? 'Saving...' : 'Save'}</button>
                </fieldset>
            </form>
        </div>
    )
}

export default BannerUpdate
