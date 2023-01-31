import React from 'react'
import Heading from '../layout/Heading'
import { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, socialPosts } from '../../constants/api/api'
import Loader from '../common/Loader'
import ErrorComponent from '../common/ErrorComponent'
import { feedError } from '../common/ErrorMessages'
import AuthContext from '../../context/AuthContext'
import { urlMessage } from '../common/FormMessages'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormError from '../common/FormError'

const schema = yup.object().shape({
    title: yup.string().required('Please enter a post title.'),
    body: yup.string(),
    // media: yup.string().matches(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, 'Please enter a valid url.'),
})

function EditPost() {
    const [submitting, setSubmitting] = useState(false)
    const [editError, setEditError] = useState(null)
    const [auth, setAuth] = useContext(AuthContext)
    const [value, setValue] = useState([])

    const navigate = useNavigate()

    const { id } = useParams()

    const url = BASE_URL + socialPosts + "/" + id

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const options = {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
    }    
    
    useEffect(function() {
        async function defaultValues() {
            try {
                const response = await axios(url, options)
                console.log(response.data)
                setValue(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        defaultValues()
    }, [url])

    let title = value.title
    let body = value.body
    let media = value.media

    async function onSubmit(data) {
        setSubmitting(true)
        setEditError(null)
        
        if (data.title) {
            title = data.title
        }

        if (data.body) {
            body = data.body
        }

        if (data.media) {
            media = data.media
        }

        const newData = {
            "title": title,
            "body": body,
            "media": media
        }

        try {
            const response = await axios.put(url, newData, options)
            console.log(response.data)
            navigate('/')
        } catch (error) {
            console.log(error)
            const errorMessage = error.response.data.errors[0].message
            setEditError(errorMessage.toString())
        } finally {
            setSubmitting(false)
        }
    }

  return (
    <div>
        <Heading headingLevel="h1">Edit Post</Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("title")} defaultValue={title} placeholder="Post Title" />
            <textarea {...register("body")} defaultValue={body} placeholder="Post Text..."/>
            <input {...register("media")} defaultValue={media} placeholder="Image URL"/>
            <button>{submitting ? 'Publishing...' : 'Publish'}</button>
        </form>
    </div>
  )
}

export default EditPost