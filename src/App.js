import './index.css'
import React, {Fragment, useEffect, useState} from 'react'
import {createClient} from '@supabase/supabase-js'

const supabase = createClient(
    'https://bwlxwwtjuqdiuloefuux.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3bHh3d3RqdXFkaXVsb2VmdXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAyOTE3NzksImV4cCI6MjAyNTg2Nzc3OX0.g-3wuPVmiZDe1Gr3SbZxg7eKKUEfmCV0ii196Vw0UIU'
)

export function App() {
    // const [session, setSession] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const {data: {user}} = supabase.auth.getUser().then(d => d);
        setToken(JSON.stringify(user, null, 2));
        // supabase.auth.getSession().then(({data: {session}}) => {
        //     setSession(session)
        // })
        //
        // const {
        //     data: {subscription},
        // } = supabase.auth.onAuthStateChange((_event, session) => {
        //     if (_event === "SIGNED_IN") {
        //         const {data: {user}} = supabase.auth.getUser().then(d => d);
        //         setToken(JSON.stringify(user, null, 2));
        //     } else {
        //         setTimeout(() => {
        //             supabase.auth.signInWithOAuth({
        //                 provider: 'google',
        //                 options: {
        //                     queryParams: {
        //                         access_type: 'offline',
        //                         prompt: 'consent',
        //                     },
        //                 },
        //             })
        //         }, 1000)
        //     }
        // })
        //
        return () => subscription.unsubscribe()
    }, [])

    return (
        <main>
            <div className='mx-5 py-4'>

                <div className='p-4 row align-items-center rounded-3 border shadow-lg'>

                    <h1 id="countdown"></h1>
                    <p className="sub-title">
                        {!session ? '' :
                            <Fragment>
                                Logado como:
                                {token}
                            </Fragment>
                        }
                    </p>

                </div>
            </div>
        </main>
    )
}


export default App;
