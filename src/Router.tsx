import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import NotFoundPage from './pages/NotFoundPage'
import Article from './pages/Article'
import NewPost from './pages/NewPost'

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path='/new/post' element={<NewPost />} />
      <Route path='/post/:id/edit' element={<Article.Edit />} />
      <Route path='/post/:id' element={<Article />} />
      <Route path='/signin' element={<SignInPage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default Router