"use client"
import React from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

const Generate = () => {

    const searchParams = useSearchParams()

    // const [link, setLink] = useState("")
    // const [linktext, setLinktext] = useState("")
    const [links, setLinks] = useState([{ link: "", linktext: "" }])
    const [handle, setHandle] = useState(searchParams.get('handle'))
    const [pic, setPic] = useState("")
    const [desc, setDesc] = useState("")

    const handleChange = (index, link, linktext) => {
        setLinks((initialLinks) => {
            return initialLinks.map((item, i) => {
                if (i == index) {
                    return { link, linktext }
                }
                else {
                    return item
                }
            })
        })
    }


    const submit = async (text, link) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "links": links,
            "handle": handle,
            "pic": pic,
            "desc": desc
        });

        console.log(raw)

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        let r = await fetch("http://localhost:3000/api/add", requestOptions)
        let result = await r.json()
        if (result.success == true) {
            toast.success(result.message)
            setLinks([])
            setHandle("")
            setPic("")
            setDesc("")
        }
        else {
            toast.error(result.message)
        }



    }

    const addLink = () => {
        setLinks(links.concat([{ link: "", linktext: "" }]))
    }



    return (
        <div className='bg-[#225ac0] min-h-screen grid grid-cols-2 justify-center items-center'>
            <div className='col1 flex flex-col items-start w-1/2 mx-auto gap-3'>
                <h1 className='font-bold text-3xl py-2'>Create your PlayLink</h1>

                <div className='step:1 flex flex-col gap-3'>
                    <h2 className='font-semibold text-xl'> Step 1: Claim your Handle</h2>
                    <div className='mx-4 flex gap-4'><input value={handle || ""} onChange={(e) => { setHandle(e.target.value) }} type="text" placeholder='Choose a Handle' className='py-1.5 px-3 rounded-full bg-white focus:outline-[#225ac0]' /></div>
                </div>

                <div className='step:2'>
                    <h2 className='font-semibold text-xl py-2'>Step 2: Add Links</h2>
                    {links && links.map((item, index) => {
                        return <div key={index} className='mx-4 flex gap-4 mb-3'>
                            <input value={item.linktext || ""} onChange={(e) => { handleChange(index, item.link, e.target.value) }} type="text" placeholder='Enter link text' className='py-1.5 px-3 rounded-full bg-white focus:outline-[#225ac0]' />
                            <input value={item.link || ""} onChange={(e) => { handleChange(index, e.target.value, item.linktext) }} type="text" placeholder='Enter link' className='py-1.5 px-3 rounded-full bg-white focus:outline-[#225ac0]' />
                        </div>
                    })}
                </div>
                <button onClick={() => addLink()} className='bg-black rounded-3xl py-1.5 px-4 text-white my-2'>Add Link</button>
                <div className='step:3 w-full'>
                    <h2 className='font-semibold text-xl py-2'> Step 1: Add Picture and Discription</h2>
                    <div className='mx-4 flex flex-col gap-4'>
                        <input value={pic || ""} onChange={(e) => { setPic(e.target.value) }} type="text" placeholder='Enter link to your Picture' className='py-1.5 px-3 rounded-full bg-white focus:outline-[#225ac0] w-full' />
                        <input value={desc || ""} onChange={(e) => { setDesc(e.target.value) }} type="text" placeholder='Enter description' className='py-1.5 px-3 rounded-full bg-white focus:outline-[#225ac0] w-full' />
                        </div>
                    <button onClick={(e) => { submit() }} disabled={pic == "" || handle == "" || links[0].linktext == "" || links[0].link == ""} className='bg-black disabled:bg-slate-500 rounded-3xl py-1.5 px-4 text-white my-4'>Create your PlayLink</button>
                </div>
            </div>
            <div className='col2 w-full h-screen'>

                <img className='h-full object-contain' src="/banner.webp" alt="banner" />
                <ToastContainer />
            </div>
        </div>
    )
}

export default Generate
