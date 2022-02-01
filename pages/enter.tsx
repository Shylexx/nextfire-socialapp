import { signInWithPopup } from "firebase/auth";
import { useContext, useEffect } from "react";
import { UserContext } from "../lib/context";
import { auth, firestore, googleProvider } from "../lib/firebase";
import { useState, useCallback } from "react";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import debounce from 'lodash.debounce';
import Loader from "../components/Loader";


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
    const googleSignIn = async () => {
        await signInWithPopup(auth, googleProvider)
        .then((user) =>{
            console.log(user);
        })
        .catch((error) => {
            console.error(error);
        });
    };


    return (
        <button className="btn-google" onClick={googleSignIn}>
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
    const[formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const {user, username} = useContext(UserContext);

    useEffect(() => {
      checkUsername(formValue);
    }, [formValue]);

    const onSubmit = async (e) => {
        e.preventDefault();

        // Create refs for user and username
        const userDoc = doc(firestore, `users/${user.uid}`);
        const usernameDoc = doc(firestore, `usernames/${formValue}`);

        // Commit both docs as batch write simultaneously.
        const batch = writeBatch(firestore);
        batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
        batch.set(usernameDoc, { uid: user.uid });

        await batch
            .commit()
            .then(() => {
                console.log("Batch commit successful");
            })
            .catch((error) => {
                console.error(error);
            });
    };
    

    const onChange = (e) => {
        //Force form value typed in form to match standard format
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        if(val.length < 3) {
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }
        if (re.test(val)) {
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    };

    // Check database for if username already exists
    const checkUsername = useCallback(
        debounce(async (username) => {
        if(username.length >= 3) {
            const users = await getDoc(doc(firestore, `usernames/${username}`));
            console.log('Read Firestore');
            if(!users.exists()) {
                setIsValid(true);
                setLoading(false);
            } else if (users.exists()) {
                setIsValid(false);
                setLoading(false);
            }
        }
    }, 500),
    []
    );
    
    return (
        !username && (
            <section>
                <h3>Choose a Username</h3>
                <form onSubmit={onSubmit}>
                    <input name="username" placeholder="username" value={formValue} onChange={onChange} />

                    <UsernameMessage username={formValue} isValid={isValid} loading={loading} />

                    <button type="submit" className="btn-green" disabled={!isValid}>
                        Confirm
                    </button>

                    <h3>Debug State</h3>
                    <div>
                        Username: {formValue}
                        <br/>
                        Loading: {loading.toString()}
                        <br/>
                        Username Valid: {isValid.toString()}
                    </div>
                </form>
            </section>
        )
    );
}

function UsernameMessage({ username, isValid, loading}) {
    if(loading) {
        return (<><p>Checking Username...</p> <Loader show={true}/></>)
    } else if(isValid) {
        return (<><p className="text-success">{username} is available!</p><Loader show={false}/></>)
    } else if (username && !isValid) {
        return (<><p className="text-danger">{username} is taken</p><Loader show={false}/></>)
    } else {
        return (<><p></p><Loader show={false}/></>)
    }
}