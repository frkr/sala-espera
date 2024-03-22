import './index.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { jwtDecode } from "jwt-decode";


const supabase = createClient(
    'https://bwlxwwtjuqdiuloefuux.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3bHh3d3RqdXFkaXVsb2VmdXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAyOTE3NzksImV4cCI6MjAyNTg2Nzc3OX0.g-3wuPVmiZDe1Gr3SbZxg7eKKUEfmCV0ii196Vw0UIU'
)

export  function App() {
    const [session, setSession] = useState(null)
    const [token, setToken] = useState('')

    useEffect(() => {
        try {
            const decodedHeader = jwtDecode(token, {header: true});
            console.log(decodedHeader);

            setToken(JSON.stringify(decodedHeader, null, 2));
        } catch (e) {
            console.log(e);
        }
    }, [session])

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (!session) {
        return <div><Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google']}
        />
        </div>
    }
    else {
        return <div>Logged in! {token}</div>
    }
}

export default App;
