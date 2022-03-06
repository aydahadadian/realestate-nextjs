import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import Footer from './Footer';

export default function Layout({children}) {
  return (
      <>
      <Head>
          <title>Real Estate</title>
      </Head>
      <Box width='100%' m='auto'>

       <main>{children}</main>
       <footer>
           
           <Footer />
       </footer>
      </Box>
      </>
  )
}
