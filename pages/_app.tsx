import '../styles/globals.css'

import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'



const activeChainId = ChainId.BinanceSmartChainMainnet;

function MyApp({ Component, pageProps }: AppProps) {
  
  
  
  return    <ThirdwebProvider desiredChainId={activeChainId}>   <Head>
        <title>Meta Invoker Verification</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='description'
          content='Meta Invoker Verification'
        />
    </Head>  
      <Component {...pageProps} />
    </ThirdwebProvider>
   
  
     
     

}

export default MyApp
