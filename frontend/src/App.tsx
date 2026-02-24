import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { BrowserRouter as Router } from "react-router-dom"; // Router ইম্পোর্ট করুন
import Login from "./pages/Login";

function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // ফায়ারবেস থেকে আইডি টোকেন নেওয়া
        const token = await user.getIdToken();

        console.log("------- COPY THIS TOKEN FOR POSTMAN -------");
        console.log(token);
        console.log("-------------------------------------------");
      } else {
        console.log("No user logged in yet.");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    // এরর এড়াতে Router দিয়ে র‍্যাপ করা হয়েছে
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Token Generator for Postman</h1>
        <div className="bg-white p-8 shadow-md rounded-lg">
          <Login />
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Login with Google, then check the Browser Console for the token.
        </p>
      </div>
    </Router>
  );
}

export default App;
