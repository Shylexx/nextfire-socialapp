import NextLink from 'next/link'
import { useContext } from 'react';
import { UserContext } from '../lib/context';


export default function Navbar({ }) {
    const {user, username} = useContext(UserContext)
    
    return (
        <nav className = "navbar">
            <ul>
                <li>
                    <NextLink href="/">
                        <button className='btn-logo'>FEED</button>
                    </NextLink>
                </li>

                {/* If user is signed in and has username*/}
                {username && (
                    <>
                    <li className='push-left'>
                        <NextLink href="/admin">
                            <button className='btn-blue'>Write Post</button>
                        </NextLink>
                    </li>
                    <li>
                        <NextLink href= {`/${username}`}>
                            <img src={user?.photoURL} />
                        </NextLink>
                    </li>
                    </>
                )}

                {/* User not signed in or has no username */}
                {!username && (
                    <li className='push-left'>
                        <NextLink href="/enter">
                            <button className='btn-blue'>Log In</button>
                        </NextLink>
                    </li>
                )}
            </ul>
        </nav>
  )
}