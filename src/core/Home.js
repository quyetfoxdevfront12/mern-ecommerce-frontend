import React from 'react'
import { API } from '../config'
import Layout from './Layout'

const Home = () => {
    return (
        <>
            <Layout title="Home page" description="Node react">
                {API}
            </Layout>
        </>
    )
}

export default Home
