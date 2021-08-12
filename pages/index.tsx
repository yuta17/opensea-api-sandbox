import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { openseaClient } from './api/opensea/client'
import { OpenSeaAsset } from 'opensea-js/lib/types'

export default function Home({ assets }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Test OpenSea API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">OpenSea!</a>
        </h1>

        <p className={styles.description}>
          <ul>
            {assets.map((data: OpenSeaAsset) => {
              return <li>
                <img src={data.imageUrl}></img>
                <p>{data.name}</p>
                <a href={data.openseaLink} target="_blank">opensea Link</a>
                <p>ownerName: {data.owner.user.username}</p>
                <p>tokenId: {data.tokenId}</p>
              </li>
            })}
          </ul>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const cryptpunkAssets = await openseaClient.api.getAssets({ search: 'CryptoPunks' })
  return {
    props: {
      assets: JSON.parse(JSON.stringify(cryptpunkAssets.assets))
    }
  }
}

// getAssets Query

// export interface OpenSeaAssetQuery {
//     owner?: string;
//     asset_contract_address?: string;
//     token_ids?: Array<number | string>;
//     search?: string;
//     order_by?: string;
//     order_direction?: string;
//     limit?: number;
//     offset?: number;
// }
