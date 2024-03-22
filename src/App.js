import './index.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient(
    'https://bwlxwwtjuqdiuloefuux.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3bHh3d3RqdXFkaXVsb2VmdXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAyOTE3NzksImV4cCI6MjAyNTg2Nzc3OX0.g-3wuPVmiZDe1Gr3SbZxg7eKKUEfmCV0ii196Vw0UIU'
)
// const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: {
//         queryParams: {
//             access_type: 'offline',
//             prompt: 'consent',
//         },
//     },
// })
export  function App() {
    const [session, setSession] = useState(null)

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
        return <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google']}
        />
    }
    else {
        return <div>Logged in!</div>
    }
}

export default App;
