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

export default function memberCreation() {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [clientData, setClientData] = useState({
    name: '',
    mobilenumber: '',
    address: '',
    image: '',
    joiningdate: currentDate,
    packagetype: '',
    packagestart: currentDate,
    packageend: currentDate,
    email: '',
    gender: '',
    packagedays: '',
    oldId: '',
    Id: '',
    type: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: {
    target: {
      [x: string]: string;
      files: any; name: any; value: any;
    };
  }) => {

    debugger;
    const { name } = e.target;
    const { value } = e.target;
    const { files } = e.target;
    if (name === 'image1' && files) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (r) => {
        try {
          const base64String = r.target?.result?.toString().split(',')[1];
          if (base64String) {
            clientData.image = base64String;
          } else {
            console.error('Failed to extract Base64 string from data URL.');
          }
        } catch (error) {
          console.error('Error processing Base64 string:', error);
        }
      };

      reader.readAsDataURL(file);
    }
    else {

      setClientData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }


    // Calculate package end date when package type changes
    if ((name === 'packagetype' || name === 'packagestart' || name === 'packagedays')) {
      debugger
      if ((name === 'packagetype')) {
        const selectedOption = e.target.selectedOptions[0];
        const selectedLabel = selectedOption ? selectedOption.label : '';
        clientData.packagetype = selectedLabel;
      }
      if ((name === 'packagetype' || name === 'packagedays')) {
        clientData.packagedays = value;
      }
      if (clientData.packagedays != '') {
        const packageType = parseInt(clientData.packagedays, 10); // Convert value to integer
        const startDate = new Date(clientData.packagestart); // Convert package start date to Date object
        const endDate = new Date(startDate); // Create a new date object based on package start date
        endDate.setDate(startDate.getDate() + packageType); // Add package type days to the start date
        if ((name === 'packagetype' || name === 'packagedays')) {
          setClientData((prevData) => ({
            ...prevData,
            packageend: endDate.toISOString().split('T')[0],
            packagedays: value
          }));
        }
        else {
          setClientData((prevData) => ({
            ...prevData,
            packageend: endDate.toISOString().split('T')[0],
          }));
        }
      }
      else {
        setClientData((prevData) => ({
          ...prevData,
          packagestart: currentDate,
          packageend: currentDate,
        }));
      }
    }
  };


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      setIsSubmitting(true);
      const database = firebase.database();
      const ref = database.ref('Members');
      ref.once('value', async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const filteredData = Object.values(data);
          debugger;
          if (filteredData.length > 0) {
            const lastId = filteredData[filteredData.length - 1].Id;
            const Id = parseInt(lastId, 10) + 1;
            const paddedId = Id.toString().padStart(4, '0');
            clientData.Id = paddedId;
            const filteredData1 = Object.values(data).filter(item => item.Id === Id);
            if (filteredData1.length > 0) {
              alert('Unable to create. Please try again later.(E)');
              setIsSubmitting(false);
              return false;
            }
            const options = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(clientData),
            }

            try {
              const res = await fetch('https://gym-pro-33-default-rtdb.firebaseio.com/Members.json', options);
              if (!res.ok) {
                throw new Error('Unable to create. Please try again later.');
               
              }
              alert('Member created successfully');
              setIsSubmitting(false);
              window.location.reload();
            } catch (error) {
              console.error('Error sending message:', error);
              alert('Unable to create. Please try again later.');
              setIsSubmitting(false);
            }

          }
        }
      });
    };

  


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center p-4 lg:px-8">
      <div>

        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2  px-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>

              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={clientData.name}
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                Image
              </label>

              <div className="mt-2">
                <input
                  id="image"
                  name="image"
                  type="file"
                  value={clientData.image}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/3  px-3">
              <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                Gender
              </label>

              <div className="mt-2">
                <select id="gender"  autoComplete="off" name="gender" value={clientData.gender} onChange={handleChange} required className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">-Select Gender-</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

            </div>
            <div className="w-full md:w-1/3  px-3">
              <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                Type
              </label>

              <div className="mt-2">
                <select id="type" name="type" value={clientData.type}  autoComplete="off" onChange={handleChange} required className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">-Select Type-</option>
                  <option value="New">New</option>
                  <option value="Renewel">Renewel</option>
                </select>
              </div>

            </div>
            <div className="w-full md:w-1/3  px-3">
              <label htmlFor="joiningdate" className="block text-sm font-medium leading-6 text-gray-900">
                Joining Date
              </label>

              <div className="mt-2">
                <input
                  id="joiningdate"
                  name="joiningdate"
                  type="date"
                  required
                  autoComplete="off"
                  value={clientData.joiningdate}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="w-full md:w-1/3  px-3">
              <label htmlFor="oldId" className="block text-sm font-medium leading-6 text-gray-900">
                Old Id
              </label>

              <div className="mt-2">
                <input
                  id="oldId"
                  name="oldId"
                  type="text"
                  autoComplete="off"
                  value={clientData.oldId}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2  px-3">
              <label htmlFor="mobilenumber" className="block text-sm font-medium leading-6 text-gray-900">
                Mobile Number
              </label>

              <div className="mt-2">
                <input
                  id="mobilenumber"
                  name="mobilenumber"
                  type="text"
                  required
                  autoComplete="off"
                  value={clientData.mobilenumber}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2  px-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>

              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="off"
                  value={clientData.email}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className=" px-3 -mx-3 mb-4">
            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
              Address
            </label>

            <div className="mt-2">
              <textarea id="address" name="address" className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter the address..."
                required
                value={clientData.address}
                autoComplete="off"
                onChange={handleChange}>

              </textarea>


            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/3 px-3">
              <label htmlFor="packagetype" className="block text-sm font-medium leading-6 text-gray-900">
                Package Type
              </label>

              <div className="mt-2">
                <select id="packagetype"  autoComplete="off" name="packagetype" onChange={handleChange} required value={clientData.packagetype} className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="">-Select Package-</option>
                  <option value="30">1 Month</option>
                  <option value="90">3 Months</option>
                  <option value="180">6 Months</option>
                  <option value="365">1 Year</option>
                </select>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3">
              <label htmlFor="packagedays" className="block text-sm font-medium leading-6 text-gray-900">
                Package Days
              </label>

              <div className="mt-2">
                <input
                  id="packagedays"
                  name="packagedays"
                  type="text"
                  required
                  autoComplete="off"
                  value={clientData.packagedays}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3">
              <label htmlFor="packagestart" className="block text-sm font-medium leading-6 text-gray-900">
                Package Start
              </label>

              <div className="mt-2">
                <input
                  id="packagestart"
                  name="packagestart"
                  type="date"
                  required
                  disabled
                  value={clientData.packagestart}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3">
              <label htmlFor="packageend" className="block text-sm font-medium leading-6 text-gray-900">
                Package End
              </label>

              <div className="mt-2">
                <input
                  id="packageend"
                  name="packageend"
                  type="date"
                  required
                  disabled
                  value={clientData.packageend}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit" disabled={isSubmitting}
              className="flex w-40  rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Create
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}