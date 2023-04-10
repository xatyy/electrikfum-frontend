import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'

export default function Banner() {
  return (
    <div className="rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Atenție</h3>
          <div className="mt-2 text-sm text-red-700">
            Comenziile depuse pe site vor fi preluate incepând cu data de 10.04.2023. Vă mulțumim pentru ințelegere!
          </div>
        </div>
      </div>
    </div>
  )
}
