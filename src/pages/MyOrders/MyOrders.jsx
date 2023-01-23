import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import * as Yup from 'yup'
import Notification from '../../components/Notification/Notification'
import Prompt from '../../components/Prompt/Prompt'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import axios from 'axios'
import { makeRequrest } from '../../makeRequest'
import MyOrdersTable from '../../components/MyOrdersTable/MyOrdersTable'
import jwtDecode from 'jwt-decode'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const MyOrders = () => {


    return(
        <div className="account py-10">
            <MyOrdersTable />
        </div>

    )
}

export default MyOrders;