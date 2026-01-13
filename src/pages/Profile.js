import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { onAuthStateChanged, deleteUser } from "firebase/auth";
import { auth, db } from "../firebase/firebase.config";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
const Profile = () => {
    const [firebaseUser, setFirebaseUser] = useState(null);
    const [userData, setUserData] = useState(null);
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
                }
                else {
                    console.log("❌ DOC NOT FOUND FOR UID:", currentUser.uid);
                    setUserData(null);
                }
            }
            catch (err) {
                console.error("🔥 FIRESTORE ERROR:", err);
                setUserData(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    if (loading)
        return _jsx("p", { children: "Loading..." });
    if (!firebaseUser)
        return _jsx("p", { children: "Please log in first." });
    if (!userData)
        return _jsx("p", { children: "No profile found. Did you signup?" });
    const handleUpdate = async () => {
        if (!firebaseUser)
            return;
        await updateDoc(doc(db, "users", firebaseUser.uid), { name });
        alert("Profile updated!");
    };
    const handleDelete = async () => {
        if (!firebaseUser)
            return;
        await deleteDoc(doc(db, "users", firebaseUser.uid));
        await deleteUser(firebaseUser);
        alert("Account deleted");
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "Your Profile" }), _jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " ", firebaseUser.email] }), _jsx("label", { children: "Name:" }), _jsx("input", { value: name, onChange: (e) => setName(e.target.value) }), _jsx("br", {}), _jsx("button", { onClick: handleUpdate, children: "Update" }), _jsx("br", {}), _jsx("br", {}), _jsx("button", { style: { color: "red" }, onClick: handleDelete, children: "Delete Account" })] }));
};
export default Profile;
