import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { UserIcon } from '@heroicons/react/24/solid'
import { makeRequrest } from '../../makeRequest'
import { makeRequrestAsUser } from '../../makeRequestAsUser'

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  

 

  export default function UsersTable() {
    const [userData, setUserData] = useState()
    const [view, setView] = useState(false)

    let user = {}
    useEffect(() => {
      const users = async () => {
          user = await  makeRequrestAsUser.get(`/users`)
         setUserData(user.data)
         setView(true);
      }
    users()
  }, [])


 
    return(
        <div className="userstable">
             <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users </h1>
          <p className="mt-2 text-sm text-gray-700">
          </p>
        </div>
        
      
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Nume
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Cont creat in data de
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Rol
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Vizualizeaza</span>
                    </th>
                  </tr>
                </thead>
                {view ? 
                <tbody className="divide-y divide-gray-200 bg-white">
                  {userData?.map((person) => (
                    <tr key={person.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <UserIcon className="rounded-full text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{person.firtName}</div>
                            <div className="text-gray-500">{person.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">{person?.createdAt}</div>
                        <div className="text-gray-500"></div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span 
                        className={classNames( person.confirmed ? "inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
                        : "inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800")}>
                          {person.confirmed ? "Activat" : "Neactivat"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role.name}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link to={"../../users/" + person.id} className="text-indigo-600 hover:text-indigo-900">
                          Vizualizeaza<span className="sr-only">, {person.firstName}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
  : <p>LOADING</p>}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
    )
}

