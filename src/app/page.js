"use client"; // This is a client component
import Head from 'next/head';
import "../flow/config";
import { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";

export default function Home() {

  const [user, setUser] = useState({loggedIn: null})
	// sets default value of loggedIn to null

  useEffect(() => fcl.currentUser.subscribe(setUser), [])
	// uses FCL to subscribe the user that logs in or signs up

  const AuthedState = () => {
    // function updates the user variable as true or false based on whether a user is logged in or not. 

    return (
	// generates a log out button if loggedIn is true
      <div>
        <div>Address: {user?.addr ?? "No Address"}</div>
        <button onClick={fcl.unauthenticate}>Log Out</button>
          </div>
        )
      }

      const UnauthenticatedState = () => {
        return (
	// displays default app settings when loggedIn is null
          <div>
            <button onClick={fcl.logIn}>Log In</button>
            <button onClick={fcl.signUp}>Sign Up</button>
          </div>
        )
      }


      return (
        <div>
          <Head>
            <title>FCL Quickstart with NextJS</title>
            <meta name="description" content="My first web3 app on Flow!" />
            <link rel="icon" href="/favicon.png" />
          </Head>
          <h1>Flow App</h1>
          {user.loggedIn
            ? <AuthedState />
            : <UnauthenticatedState />
          }
        </div>
      );
    }
