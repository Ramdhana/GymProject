import { useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

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

export default function MemberProfile() {
  const [clientData, setClientData] = useState({ searchtype: '', searchvalue: '' });
  const [state, setState] = useState([]);

  const fetchData = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const database = firebase.database();
    const ref = database.ref('Members');
    let query = ref;

    if (clientData.searchtype && clientData.searchvalue) {
      switch (clientData.searchtype) {
        case 'UI':
          query.orderByChild('userId').equalTo(clientData.searchvalue);
          break;
        case 'MN':
          query.orderByChild('mobileNumber').equalTo(clientData.searchvalue);
          break;
        case 'UN':
         query.orderByChild('userName').equalTo(clientData.searchvalue);
          break;
        default:
          break;
      }
    }

    query.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataArray:any = Object.values(data);
        setState(dataArray);
      }
    });
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center p-4 lg:px-8">
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/3 px-3">
            <label htmlFor="searchtype" className="block text-sm font-medium leading-6 text-gray-900">
              Search Type
            </label>
            <div className="mt-2">
              <select
                id="searchtype"
                required
                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setClientData({ ...clientData, searchtype: e.target.value })}
              >
                <option value="UI">User Id</option>
                <option value="MN">Mobile Number</option>
                <option value="UN">User Name</option>
              </select>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3">
            <label htmlFor="searchvalue" className="block text-sm font-medium leading-6 text-gray-900">
              Search Value
            </label>
            <div className="mt-2">
              <input
                id="searchvalue"
                name="searchvalue"
                type="text"
                required
                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setClientData({ ...clientData, searchvalue: e.target.value })}
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mt-8">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={fetchData}
            >
              Search
            </button>
          </div>
        </div>

        <div className="px-3 -mx-3 mb-4">
          {state.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                  <th className="px-6 py-3">Action</th>
                    <th className="px-6 py-3">Member Id</th>
                    <th className="px-6 py-3">Member Name</th>
                    <th className="px-6 py-3">Joining Date</th>
                    <th className="px-6 py-3">Member Type</th>
                    <th className="px-6 py-3">Package Type</th>
                    <th className="px-6 py-3">Package Days</th>
                    <th className="px-6 py-3">Package Start</th>
                    <th className="px-6 py-3">Package End</th>
                    <th className="px-6 py-3">Gender</th>
                    <th className="px-6 py-3">Address</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Mobile Number</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-600 dark:text-gray-300">
                  {state.map((item: any, index: number) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`}
                    >
                      <td className="px-6 py-4">Edit</td>
                      <td className="px-6 py-4">{item.Id}</td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.joiningdate}</td>
                      <td className="px-6 py-4">{item.type}</td>
                      <td className="px-6 py-4">{item.packagetype}</td>
                      <td className="px-6 py-4">{item.packagedays}</td>
                      <td className="px-6 py-4">{item.packagestart}</td>
                      <td className="px-6 py-4">{item.packageend}</td>
                      <td className="px-6 py-4">{item.gender}</td>
                      <td className="px-6 py-4">{item.address}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">{item.mobilenumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
