import Head from "next/head"
import { useEffect, useState } from "react"
import DropDown from "../components/Dropdown"
import { Close, Left } from "../components/Icons"

const array = [
    { name: 'Test test', color: 'bg-red-500' },
    { name: 'tes2', color: 'bg-yellow-500' },
    { name: 'new', color: 'bg-green-500' },
    { name: 'test', color: 'bg-blue-500' },
    { name: 'okay', color: 'bg-purple-500' }
]

delete array[0]

export default function Content({ data }: any) {

    const [add, setAdd] = useState(false)
    const [del, setDel] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [input, setInput] = useState('')

    useEffect(() => {

        if (input == '') {
            setDisabled(true)
        } else {
            setDisabled(false)
        }

    }, [input, setDisabled])

    async function tambah() {
        setAdd(false)
    }

    return (
        <>
            <Head>
                <title>{data.priority ? data.priority : 'null'}</title>
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
            </Head>

            <nav className='bg-blue-600 h-[90px] w-full flex items-center'>
                <div className='flex w-full p-4 mx-auto max-w-screen-md'>
                    <h3 className='text-white'>To Do List App</h3>
                </div>
            </nav>

            <main>

                <section className='flex justify-between'>
                    <div onClick={() => location.href = '/'} className="flex pointer items-start">
                        <Left className="w-7 mr-2" />
                        <h3>{data.priority ? data.priority : 'New Activity'}</h3>
                    </div>
                    <button onClick={() => setAdd(true)}>+ Tambah</button>
                </section>

                {array.length == 1 ?
                    <section className='flex justify-center'>
                        <img src="/todo-empty-state.png" className='w-[500px] mt-20' />
                    </section> :
                    <span className="mt-20 gap-4">
                        {array.map((x, i) => (
                            <menu key={i} className='bg-white w-full p-4 h-[80px] shadow-md rounded-xl justify-between'>
                                <div className="flex items-center">
                                    <div className="border-2 mr-4">✅</div>
                                    <div className={`w-3 h-3 ${x.color} mr-4 rounded-full`} />
                                    <b>{x.name}</b>
                                </div>
                                <img onClick={() => setDel(true)} src="/trash.svg" className='pointer w-7' />
                            </menu>
                        ))}
                    </span>}

                {add &&
                    <div className='modal'>
                        <div className='bg-white divide-y-2 w-[800px] rounded-xl'>
                            <section className='flex w-full justify-between p-6'>
                                <h3>Tambah List Item</h3>
                                <div onClick={() => setAdd(false)}><Close className='w-7 text-gray-500 pointer' /></div>
                            </section>
                            <span className='p-6'>
                                <b>NAMA LIST ITEM</b>
                                <input onChange={(e) => setInput(e.target.value)} placeholder='Tambahkan Nama List Item' type="text" id="name" className='mt-2 mb-6 focus:border-blue-600' />
                                <b>PRIORITY</b>
                                <DropDown />
                            </span>
                            <section className='w-full flex justify-end p-6'>
                                <button onClick={tambah} disabled={disabled}>Simpan</button>
                            </section>
                        </div>
                    </div>}

                {del &&
                    <div className='modal'>
                        <div className='bg-white w-[800px] rounded-xl flex flex-col justify-center items-center p-12'>
                            <img src="/delete-icon.svg" className='w-40 mb-6' />
                            <p>Apakah anda yakin menghapus activity?</p>
                            <b>"Daftar Belanja Bulanan"?</b>
                            <section className='flex gap-6 mt-6'>
                                <button onClick={() => setDel(false)} className='bg-[#F4F4F4] text-[#4A4A4A] border-[#F4F4F4]'>Batal</button>
                                <button onClick={() => setDel(false)} className='bg-red-500 border-red-500'>Hapus</button>
                            </section>
                        </div>
                    </div>}

            </main>
        </>
    )
}

export async function getServerSideProps({ params }: any) {

    const get = await fetch("https://floating-mountain-35184.herokuapp.com/todo-items?activity_group_id=999999", { method: 'GET' })
        .then(res => res.json())

    const data = get.data[params.id]


    return {
        props: { data: data }, // will be passed to the page component as props
    }

}