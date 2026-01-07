import React from 'react'
import Nav from '../../components/Nav'
import QuizCard from './QuizCard'

export default function Quiz() {
  return (
    <>
    <Header />
    <main className='mt-20 flex justify-center'>
        <QuizCard />
    </main>
    </>
  )
}

function Header() {
    return (
        <header>
            <Nav />
        </header>
    )
}