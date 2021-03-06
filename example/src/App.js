import React from 'react'

import Book from '3d-book'

const App = () => {
  return (
    <div className='App'>
      <Book
        style={{ width: 500, height: 600, background: 'white' }}
        bookCovers={{
          front: '/3d-book/images/front.jpeg',
          back: '/3d-book/images/back.jpeg',
          spine: '/3d-book/images/spine.jpeg'
        }}
      />
      <h2>
        <a href='https://github.com/zoomKoding/3d-book'>3d book</a> by{' '}
        <a href='https://threejs.org/'>three.js</a>
      </h2>
      <strong>Hover your mouse to rotate the book.</strong>
    </div>
  )
}

export default App
