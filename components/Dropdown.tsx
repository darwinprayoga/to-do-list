import { useState } from "react";
import { Bottom, Top } from "./Icons";

const priority = [
    { name: 'Very High', color: 'bg-red-500' },
    { name: 'High', color: 'bg-yellow-500' },
    { name: 'Medium', color: 'bg-green-500' },
    { name: 'Low', color: 'bg-blue-500' },
    { name: 'Very Low', color: 'bg-purple-500' }
]

export default function DropDown() {

    const [on, setOn] = useState(false)
    const [active, setActive] = useState(0)

    return (
        <div className="relative">

            {on ?
                <div onClick={() => setOn(false)} className='flex w-[200px] pointer border-2 justify-between items-center rounded-md rounded-b-none p-3 mt-2 bg-[#E5E5E5]'>
                    <p>Pilih Priority</p>
                    <Top className='w-5 text-gray-500' />
                </div> :
                <div onClick={() => setOn(true)} className='flex w-[200px] pointer border-2 justify-between items-center rounded-md p-3 mt-2 bg-white'>
                    <div className="flex items-center">
                        <div className={`w-3 h-3 ${priority[active].color} mr-4 rounded-full`} />
                        <p>{priority[active].name}</p>
                    </div>
                    <Bottom className='w-5 text-gray-500' />
                </div>}

            {on && <section className="absolute w-[200px] pointer left-0 z-10 divide-y-2 items-center rounded-md rounded-t-none border-x-2 border-b-2 bg-white">
                {priority.map((x, i) => (
                    <div onClick={() => {
                        setActive(i)
                        setOn(false)
                    }} key={i} className='flex pointer justify-between items-center p-3 hover:bg-[#E5E5E5]'>
                        <div className="flex items-center">
                            <div className={`w-3 h-3 ${x.color} mr-4 rounded-full`} />
                            <p>{x.name}</p>
                        </div>
                        <p>{active == i && '✅'}</p>
                    </div>
                ))}
            </section>}

        </div>
    )
}