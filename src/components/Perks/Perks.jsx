import { CheckBadgeIcon, TruckIcon } from "@heroicons/react/24/solid"

const perks = [
    {
      name: 'Livrare oriunde in tara!',
      icon: TruckIcon,
      description:
        "Livram oriunde in tara, iar la cumparaturi de peste 250 de lei livrarea este gratuita!",
    },
    {
      name: 'Produse de calitate si originale.',
      icon: CheckBadgeIcon,
      description:
        "Asiguram calitatea produselor cat si originalitatea lor.",
    },
   
  ]
  
  export default function Perks() {
    return (
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-24 sm:px-2 sm:py-32 lg:px-4">
          <div className="max-w-2xl mx-auto px-4 grid grid-cols-1 gap-y-12 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {perks.map((perk) => (
              <div key={perk.name} className="sm:flex">
                <div className="sm:flex-shrink-0">
                  <div className="flow-root">
                    <perk.icon className="w-20 text-gray-800" />
                  </div>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <h3 className="text-sm font-medium text-gray-900">{perk.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  