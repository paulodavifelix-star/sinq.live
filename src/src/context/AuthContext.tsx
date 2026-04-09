import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider, db } from "../firebase";
import { signInWithPopup, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);

const ADMIN_UID = "t2o0wJmLnbZ8VHWE1Th168F66xv2";

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const u = result.user;

      const ref = doc(db, "users", u.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        let username = (u.displayName || "user")
          .replace(/\s+/g, "")
          .toLowerCase();

        await setDoc(ref, {
          name: u.displayName || "User",
          username,
          verified: u.uid === ADMIN_UID,
          followers: 0,
          createdAt: Date.now()
        });
      }
    } catch (e) {
      console.error("Erro no login:", e);
      alert("Erro ao entrar com Google");
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
