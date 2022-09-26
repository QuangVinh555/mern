import React, { useContext, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { PostContext } from '../../contexts/PostContext'
import { useEffect } from 'react'
const UpdatePostModal = () => {
    
    const {showUpdatePost, setShowUpdatePost, state:{post}, updatePost, setShowToast} = useContext(PostContext);

     // State
	const [updatedPost, setUpdatedPost] = useState(post)
    const {title, description, url, status} = updatedPost;

    // useEffect post
    useEffect(() => {
        setUpdatedPost(post)
    }, [post])

    // close Modal
    const closeDialog = () => {
        setUpdatedPost(post)
        setShowUpdatePost(!showUpdatePost);     
    }

    const onChangeUpdatePostForm = (e) => {
        setUpdatedPost({...updatedPost, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const {success, message} = await updatePost(updatedPost)
            setShowToast({show: true, message: message, type: success ? 'success' : 'danger'});

        } catch (error) {
            console.log(error);
        }
        setUpdatedPost({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN',
        })
        setShowUpdatePost(!showUpdatePost);
    }

  return (
    <Modal show = {showUpdatePost} onHide = {closeDialog}>
        <Modal.Header closeButton>
            <Modal.Title>Making progress?</Modal.Title>
        </Modal.Header>
        <Form onSubmit = {onSubmit}>
            <Modal.Body>
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Title'
                        name='title'
                        required
                        aria-describedby='title-help'
                        value = {title}
                        onChange = {onChangeUpdatePostForm}

                    />
                    <Form.Text id='title-help' muted>
                        Required
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        as='textarea'
                        rows={3}
                        placeholder='Description'
                        name='description'
                        value = {description}
                        onChange = {onChangeUpdatePostForm}


                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Youtube Tutorial URL'
                        name='url'
                        value = {url}
                        onChange = {onChangeUpdatePostForm}


                    />
                </Form.Group>

                <Form.Group>
                    <Form.Control 
                        as = 'select' 
                        value = {status} 
                        name = 'status'
                        onChange={onChangeUpdatePostForm}
                    >
                        <option value = 'TO LEARN'>TO LEARN</option>
                        <option value = 'LEARNING'>LEARNING</option>
                        <option value = 'LEARNED'>LEARNED</option>
                    </Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={closeDialog}>
                    Cancel
                </Button>
                <Button variant='primary' type='submit'>
                    LearnIt!
                </Button>
            </Modal.Footer>
        </Form>
</Modal>
  )
}

export default UpdatePostModal