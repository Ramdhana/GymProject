import { useRouter } from "next/router";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyB1jZlLwaeynBF3jUATcovPlvSZaKmTOHE",
  authDomain: "gym-pro-33.firebaseapp.com",
  databaseURL: "https://gym-pro-33-default-rtdb.firebaseio.com",
  projectId: "gym-pro-33",
  storageBucket: "gym-pro-33.appspot.com",
  messagingSenderId: "51797740819",
  appId: "1:51797740819:web:ab282975613546c5aa5ee6",
  measurementId: "G-7ZQY6278EL"
};

firebase.initializeApp(firebaseConfig);

export default function Login() {
  const router = useRouter();
  const [clientData, setClientData] = useState({
    User: '',
    Pass: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setClientData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const database = firebase.database();
    const ref = database.ref('Login');
    let query = ref.orderByChild('User').equalTo(clientData.User);

    query.once('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const filteredData = Object.values(data).filter(item => item.Pass === clientData.Pass);
        if (filteredData.length > 0) {
          alert("Login successfully");
          router.push("/home/adminLayout");
        } else {
          alert("Invalid credentials. Please try again.");
        }
      } else {
        alert("User not found. Please register.");
      }
    });
  };

  useEffect(() => {
    // Code to run on component mount or state change
  }, []); // Empty array means run this effect only once on mount

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://th.bing.com/th/id/OIP.35UAQnFvhD2xfs_3Ct4RLAHaHa?rs=1&pid=ImgDetMain" alt="Map" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              User Name
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="User"
                type="text"
                required
                value={clientData.User}
                autoComplete="off"
                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="Pass"
                type="password"
                required
                value={clientData.Pass}
                autoComplete=""
                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-3">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
