import React, {useState, useEffect} from 'react'
import { Fragment } from 'react'
import { Menu, Transition, Popover } from '@headlessui/react'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { ArrowLeftOnRectangleIcon, Cog6ToothIcon, DocumentTextIcon, PencilSquareIcon, UserIcon, WrenchIcon } from '@heroicons/react/24/outline'
import { Link } from "react-router-dom"
import authCheck from '../../services/authCheck';
import getJwtData from '../../services/getJwtData'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



const AccountDropDown = () => {

  function deleteToken(){
    localStorage.removeItem("auth");
    window.location.reload(false)
  }
  let userData = {};

  const [test, setTest] = useState(true);


  useEffect(() => {
    const data = async () => {
      userData = await getJwtData;
      setTest(userData);
    }
  data()
}, [])
    return(
        <div className="accountdropdown">
            <Menu as="div" className="relative inline-block text-left z-40">
      <div>
        <Menu.Button className="-m-2 p-2 flex flex-row text-gray-400 hover:text-gray-500">
        <UserIcon className="m-1 w-6 h-6" aria-hidden="true" />
        <p className="text-xs w-10 ">{authCheck ? `Salut, ${test?.firstName}` : "Contul meu"}</p>
        </Menu.Button>
      </div>
     

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
          
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          {!authCheck ?
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/login"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Logare
                </Link>
              )}
               
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/register"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <PencilSquareIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Inregistrare
                </Link>
              )}
            </Menu.Item>
            
            <div clasName="fixed inset-0 bg-black opacity-10" aria-hidden="true" />
            
          </div>
: <></> }


          <div className="py-1">
          {authCheck ?
          <>
          <Menu.Item>
              {({ active }) => (
                <Link
                  to="/account"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <Cog6ToothIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Setari cont
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/orders"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <DocumentTextIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Istoric comenzi
                </Link>
              )}
            </Menu.Item>
            </>
: <></>}
{authCheck && test?.role?.id === 3 ?
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/dashboard"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <WrenchIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Administrare Magazin
                </Link>
              )}
            </Menu.Item>
            : <></>
                  }
          </div>

{authCheck ?
          <div className="py-1">
          <Menu.Item>
              {({ active }) => (
                <Link
                  onClick={() => deleteToken()}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Deconecteaza-te
                </Link>
              )}
            </Menu.Item>
          </div>
: <></> }
          
        </Menu.Items>
       
      </Transition>
      
    </Menu>
        </div>
    )
}

export default AccountDropDown;