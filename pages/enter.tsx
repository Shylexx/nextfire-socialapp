import { useContext } from "react";
import { UserContext } from "../lib/context";
import { auth, googleAuthProvider } from "../lib/firebase";


export default function EnterPage({}) {
    const {user, username} = useContext(UserContext)

    // 1. user signed out <SignInButton />
    // 2. user signed in, but no username <UsernameForm />
    // 3. User Signed in and has username <SignOutButton />
    return (
        <main>
            {user ?
                !username ? <UsernameForm /> : <SignOutButton />
                :
                <SignInButton />
            }
        </main>
    )
}

function SignInButton() {
    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
    };


    return (
        <button className="btn-google" onClick={signInWithGoogle}>
            Google Sign In
        </button>
    );
}

function SignOutButton() {


    return (
        <button onClick={() => auth.signOut()}>
            Sign Out
        </button>
        );
}

function UsernameForm() {


    return (
        <h3>UsernameForm</h3>
        );
}