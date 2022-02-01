import { auth, firestore } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, collection } from 'firebase/firestore';

export function useUserData() {
const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  
  useEffect(() => {
    let unsubscribe;
  
    if(user) {
      const ref = doc(firestore, 'users', user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return {user, username};
}