import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase.config";
import { setDoc, doc } from "firebase/firestore";
const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const handleSignup = async () => {
        try {
            // Create user auth account
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Create user document in Firestore
            await setDoc(doc(db, "users", user.uid), {
                email,
                name,
                createdAt: new Date(),
            });
            alert("User registered successfully!");
        }
        catch (error) {
            alert(error.message);
        }
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "Sign Up" }), _jsx("input", { type: "text", placeholder: "Name", value: name, onChange: (e) => setName(e.target.value) }), _jsx("br", {}), _jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("br", {}), _jsx("input", { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("br", {}), _jsx("button", { onClick: handleSignup, children: "Register" })] }));
};
export default Signup;
