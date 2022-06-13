import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import MeetingInfoBox from '../components/MeetingInfoBox/MeetingInfoBox'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <h1 className="p-3 font-bold text-2xl">Meetings</h1>
      <div className="p-3">
        <MeetingInfoBox
          meetingName='Team-Meeting'
          meetingDate={new Date()}
        />
        <MeetingInfoBox
          meetingName='Das ist ein ganz langer Meeting-Name'
          meetingDate={new Date()}
        />
      </div>
    </>
  )
}

export default Home
