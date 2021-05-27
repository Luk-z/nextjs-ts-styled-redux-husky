import styled from 'styled-components'
import { getHomePage } from '../services/test'

const Title = styled.h1`
  font-size: 30px;
`

type Props = {
  payload: { [key: string]: string }
}

function Home({ payload }: Props) {
  return (
    <div>
      <Title>{JSON.stringify(payload)}</Title>
    </div>
  )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps = async () => {
  const payload = await getHomePage()

  return {
    props: {
      payload,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    revalidate: 15, // In seconds
  }
}

// export const getServerSideProps : GetServerSideProps = async () => {
//   const url =
//     'xxxxx'

//   const headers = {
//     'key': 'value',
//   }

//   const res = await fetch(url, {headers})
//   const payload = await res.json()

//   console.log('payload', payload)

//   return {
//     props: {
//       payload,
//     },
//   }
// }

export default Home
