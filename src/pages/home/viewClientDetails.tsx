export default function viewClientDetails() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Client Details
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
          <div>
                  <label htmlFor="searchtype" className="block text-sm font-medium leading-6 text-gray-900">
                  Search Type
                  </label>
        
                <div className="mt-2">
                 <select  id="searchtype" required className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="UI">User Id</option>
                    <option value="MN">Mobile Number</option>
                    <option value="UN">User Name</option>
                 </select>
                </div>
              </div>

              <div>
                  <label htmlFor="searchvalue" className="block text-sm font-medium leading-6 text-gray-900">
                  Search Value
                  </label>
        
                <div className="mt-2">
                  <input
                    id="searchvalue"
                    name="searchvalue"
                    type="text"
                    required
                    className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>

            <div>
              <button
                type="submit" 
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )

}
