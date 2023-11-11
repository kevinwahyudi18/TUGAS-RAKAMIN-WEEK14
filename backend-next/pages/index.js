import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [users, setItems] = useState([])

  useEffect(()=>{
    const fetchUsers = async () => {
      const res = await fetch('/api/users')
      const data = await res.json()
      setItems(data)
    }
    
    fetchUsers()
  },[])
  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <div>
          <h1 className={styles.title}>Users</h1>
          <ul>
            {item}
          </ul>
        </div>
      </main>
    </>
  )
}
