import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Close } from '../components/Icons';

import type { NextPage } from 'next'



const Home: NextPage = () => {

  const [add, setAdd] = useState(false)
  const [del, setDel] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [input, setInput] = useState('')
  const [data, setData] = useState<any | null>([])

  const now = new Date().toISOString()

  useEffect(() => {

    fetch("https://floating-mountain-35184.herokuapp.com/activity-groups", { method: 'GET' })
      .then(response => response.json())
      .then(result => setData(result.data))
      .catch(error => console.log('error', error));

    if (input == '') {
      setDisabled(true)
    } else {
      setDisabled(false)
    }

  }, [data, input, setDisabled])

  async function tambah() {
    const raw = [
      {
        "id": data.length + 1,
        "email": "darwin.prayoga13@gmail.com",
        "title": input,
        "created_at": now,
        "updated_at": now,
        "deleted_at": null
      }
    ];

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(raw)
    };

    await fetch("https://floating-mountain-35184.herokuapp.com/activity-groups", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))

    setAdd(false)
  }

  return (
    <>

      <Head>
        <title>To Do List / @darwinprayoga</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <nav className='bg-blue-600 h-[90px] w-full flex items-center'>
        <div className='flex w-full p-4 mx-auto max-w-screen-md'>
          <h3 className='text-white'>To Do List App</h3>
        </div>
      </nav>

      <main>

        <section className='flex justify-between'>
          <h3>Activity</h3>
          <button onClick={() => setAdd(true)}>+ Tambah</button>
        </section>

        {data.length == 0 &&
          <section className='flex justify-center'>
            <img src="/activity-empty-state.png" className='w-[500px] mt-20' />
          </section>}

        <section className='grid grid-cols-4 w-full h-full gap-4 mt-8'>
          {data && data.map((x: any, i: number) => (
            <div onClick={() => location.href = `/${1 + i}`} key={i} className='bg-white w-full pointer p-4 h-[180px] shadow-md col-span-1 rounded-xl flex flex-col justify-between'>
              <b>{x.title}</b>

              <menu className='justify-between'>
                <sub>{new Date(x.created_at).toDateString()}</sub>
                <img onClick={() => setDel(true)} src="/trash.svg" className='w-7' />
              </menu>
            </div>
          ))}
        </section>

      </main>

      {add &&
        <div className='modal'>
          <div className='bg-white divide-y-2 w-[800px] rounded-xl'>
            <section className='flex w-full justify-between p-6'>
              <h3>Tambah Activity</h3>
              <div onClick={() => setAdd(false)}><Close className='w-7 text-gray-500 pointer' /></div>
            </section>
            <span className='p-6'>
              <b>NAMA ACTIVITY</b>
              <input onChange={(e) => setInput(e.target.value)} placeholder='Tambahkan Nama List Item' type="text" id="name" className='mt-2 mb-6 focus:border-blue-600' />
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

    </>
  )
}

export default Home
