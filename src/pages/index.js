import React, { useEffect, useState } from "react"
import { Formik, Form, ErrorMessage, Field } from "formik"
import * as Yup from "yup"
import { Box, CircularProgress, Typography,Button } from "@mui/material"
import '../styles/page.css'


export default function Home() {
  const [data, setData] = useState()
  const [messages, setmessages] = useState()
  const [updateData, setUpdateData] = useState()
  const [isUpdating, setIsUpdating] = useState(false)
  const [isloading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    (async () => {
      await fetch("/.netlify/functions/read_all-todo")
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setmessages(data)
        })
    })()
  }, [data, isloading, isDeleting, isUpdating])

  const handleDelete = id => {
    console.log(JSON.stringify(id))
    setIsDeleting(true)
    fetch("/.netlify/functions/delete-todo", {
      method: "delete",
      body: JSON.stringify(id),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.message)
        setIsDeleting(false)
        setmessages(undefined)
        setIsUpdating(false)
      })
  }
  const handleUpdate = id => {
    const msgUpdate = messages.find(msg => msg.ref["@ref"].id === id)
    setIsUpdating(true)
    setUpdateData(msgUpdate)
    console.log(msgUpdate)
  }

  return (
      <div className="home--page">
        <Box py={4}>
          <div>
          <Typography
            align="center"
            variant="h4"
            color={'#707070'}
          >
            Serverless CRUD
          </Typography>
          </div>
            <div className="home--page_form" >
        
        <Formik
          enableReinitialize={true}
          validationSchema={ Yup.object().shape({
            title: Yup.string().required("Message is Required"),
          })
          }
          initialValues={{
            id: !updateData ? "" : updateData.ref['@ref'].id ,
            title: !updateData ? "" : updateData.data.title
          }}
          onSubmit={(values, actions) => {
            if(isUpdating){
              console.log(values);
              setIsLoading(true)
              fetch(`/.netlify/functions/update-todo`,{
                method: 'put',
                body: JSON.stringify(values)
              })
              .then(res => res.json())
              .then( data => {
                setData(data)
                setIsLoading(false)
                setIsUpdating(false)
                setmessages(undefined)
              })
            }
            else{
              console.log(values);
              setIsLoading(true)
              fetch(`/.netlify/functions/create-todo`, {
                method: "post",
                body: JSON.stringify(values),
              })
                .then(response => response.json())
                .then(data => {
                  setData(data)
                  setIsLoading(false)
                  setmessages(undefined)
            //resetForm
                  actions.resetForm({
                    values: {
                      id: "",
                      title: "",
                    },
                  })
                })
            }
              
          }}
        >
          {formik => (

            <Form onSubmit={formik.handleSubmit}>
              <Box sx={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
              <div>
                <Field
                  type="text"
                  color="secondary"
                  variant="outlined"
                  label="title"
                  name="title"
                  id="title"
                  cols={40}
                  rows={60}
                  as={'textarea'}
                  className="home--page_field"
                />
                <Box pt={1} style={{color: 'red', fontWeight: 'bold'}}>
                  <ErrorMessage
                    name="title"
                  />
                </Box>
              </div>

                <Box>
                  <Button
                    disableElevation
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={isloading ? true : false}
                    style={{ color: "white", padding: '10px 2rem',marginLeft: '10px' }}
                    size="large"
                  >
                    {
                       isUpdating ? 
                       isloading ? 'Updating...' :
                        'Update' : isloading ?
                         'Adding...' : 'Add'}
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
        <div>
          <Box mt={3} sx={{display:'flex', justifyContent: 'center'}}>
            {!messages ? (
                <CircularProgress color="secondary" />
            ) : (
              <div className="home--page_itemslist">{
              messages.map(msg => (
                <div
                  key={msg.ref["@ref"].id}
                  className="home--page_items"
                >
                    <Typography variant={'h6'} color="#707070">
                      {msg.data.title}
                    </Typography>
                    <Box>
                    <Button
                      style={{ margin: "2px 10px " }}
                      variant="contained"
                      color={"primary"}
                      size="small"
                      onClick={() => handleUpdate(msg.ref["@ref"].id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color={"secondary"}
                      onClick={() => handleDelete(msg.ref["@ref"].id)}
                      size="small"
                      disabled={isDeleting ? true : false}
                      style={{ color: "white" }}
                    >
                      {isDeleting && msg.ref["@ref"].id ? "Deleting..." : "Delete"}
                    </Button></Box>
                </div>
              ))
              }
              </div>
            )}
          </Box>
        </div>
            </div>
        </Box>
      </div>
  )
}