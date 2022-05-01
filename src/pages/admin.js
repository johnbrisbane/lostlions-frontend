import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '../hooks/auth'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <>
            <Head>
                <title>Admin</title>
            </Head>
                    

            <div className="hidden fixed top-750 right-600 px-6 py-4 sm:block">
                    {user ?
                        <Link href="/dashboard">
                            <a className="ml-4 text-sm text-white-700 underline">
                                Dashboard
                            </a>
                        </Link>
                        :
                        <>
                            <Link href="/login">
                                <a className="text-sm text-white-700 underline">Login</a>
                            </Link>
                        </>
                    }
                </div>
        </>
    )
}
