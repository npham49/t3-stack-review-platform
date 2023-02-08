import React from 'react'
import NewItemForm from '../../components/NewItemForm'

const newItem = () => {
  return (
    <>
    <main>
      <div className="container mx-auto pt-28">
        <a className="btn btn-primary" href='/items'>Back to Items</a>
        <h1 className="text-6xl font-bold text-white my-4">New Item</h1>
        <NewItemForm/>
      </div>
    </main>
    </>

  )
}

export default newItem