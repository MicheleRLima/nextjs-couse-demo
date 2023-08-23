import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A First Meetup',
//     image:
//       'https://rotadeferias.com.br/wp-content/uploads/2022/10/Depositphotos_393655782_L.jpg',
//     address: 'Some address, 5. Some City',
//   },
//   {
//     id: 'm2',
//     title: 'A Second Meetup',
//     image:
//       'https://rotadeferias.com.br/wp-content/uploads/2022/10/Depositphotos_393655782_L.jpg',
//     address: 'Some address, 12. Some City',
//   },
// ];

function HomePage(props) {

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content='React application to list meetups' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

//outra opção é o getServerSideProps()

export async function getStaticProps() {
  //aqui não aparece no client-side
  //conectiong API:

  const client = await MongoClient.connect('mongodb+srv://michelelima232:POzPMYEr6lGAvVWk@cluster0.irmcl2z.mongodb.net/meetups?retryWrites=true&w=majority');

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString()
      })),
    },
    revalidate: 10 //tempo em segundos
  };
}

export default HomePage;
