import { useEffect, useState } from "react";
import { onAuthStateChanged, deleteUser } from "firebase/auth";
import { auth, db } from "../firebase/firebase.config";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

const Profile = () => {
  const [firebaseUser, setFirebaseUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("AUTH STATE:", currentUser);

      if (!currentUser) {
        console.log("🔥 No Firebase user logged in");
        setFirebaseUser(null);
        setUserData(null);
        setLoading(false);
        return;
      }

      // We now know auth has a user
      console.log("🔥 LOGGED IN UID:", currentUser.uid);
      setFirebaseUser(currentUser);

      try {
        const path = `users/${currentUser.uid}`;
        console.log("📄 Attempting to read:", path);

        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        console.log("📄 DOC EXISTS?:", docSnap.exists());

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("📄 USER DATA:", data);
          setUserData(data);
          setName(data.name || "");
        } else {
          console.log("❌ DOC NOT FOUND FOR UID:", currentUser.uid);
          setUserData(null);
        }
      } catch (err) {
        console.error("🔥 FIRESTORE ERROR:", err);
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!firebaseUser) return <p>Please log in first.</p>;
  if (!userData) return <p>No profile found. Did you signup?</p>;

  const handleUpdate = async () => {
    if (!firebaseUser) return;

    await updateDoc(doc(db, "users", firebaseUser.uid), { name });
    alert("Profile updated!");
  };

  const handleDelete = async () => {
    if (!firebaseUser) return;

    await deleteDoc(doc(db, "users", firebaseUser.uid));
    await deleteUser(firebaseUser);
    alert("Account deleted");
  };

  return (
    <div>
      <h2>Your Profile</h2>

      <p><strong>Email:</strong> {firebaseUser.email}</p>

      <label>Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <br/>

      <button onClick={handleUpdate}>Update</button>
      <br/><br/>

      <button style={{ color: "red" }} onClick={handleDelete}>
        Delete Account
      </button>
    </div>
  );
};

export default Profile;
