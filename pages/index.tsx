import Head from 'next/head'
import Image from 'next/image'
import NextLink from 'next/link'
import toast from 'react-hot-toast'
import styles from '../styles/Home.module.css'

import Loader from '../components/Loader';

export default function Home() {
  return (
    <div className={styles.container}>
      <button onClick={() => toast.success("Toasty")}>
        Toast Test
      </button>
      <NextLink prefetch = {false} href="/jeffd23">
        <a>Jeff's Profile</a>
        </NextLink>
        <Loader show={true}/>
    </div>
  )
}
