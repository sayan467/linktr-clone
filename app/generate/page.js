"use client"
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'

const Generate = () => {
    const searchParams = useSearchParams()

    // const [link, setlink] = useState("")
    // const [linktext, setlinktext] = useState("")
    const [links, setLinks] = useState([{ link: "", linktext: "" }])
    const [handle, sethandle] = useState(searchParams.get("handle"))
    const [pic, setpic] = useState("")
    const [desc, setdesc] = useState("")

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

    const addLink = () => {
        setLinks(links.concat([{ link: "", linktext: "" }]))
    }

    // const addLink = async (text, link, handle) => {
    //     const myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     const raw = JSON.stringify({
    //         "link": link,
    //         "linkText": text,
    //         "handle": handle
    //     });

    //     const requestOptions = {
    //         method: "POST",
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: "follow"
    //     };

    //     const r = await fetch("http://localhost:3000/api/add", requestOptions)
    //     const result = await r.json()
    //     toast(result.message)

    //     // Reset all the function objects
    //     // setlink("")
    //     // setlinktext("")
    // }

    const submitLinks = async () => {
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

        const r = await fetch("http://localhost:3000/api/add", requestOptions)
        const result = await r.json()

        if(result.success) {
            toast.success(result.message)
            setLinks([])
            setpic("")
            sethandle("")
        }
        else {
            toast.error(result.message)
        }

        // Reset all the function objects
        // setlink("")
        // setlinktext("")
    }

    return (
        <div className='bg-[#d6a336] min-h-screen grid grid-cols-2'>
            <div className='col1 flex flex-col justify-center items-center text-gray-900'>
                <div className='flex flex-col gap-4 my-4'>
                    <h1 className='font-bold text-4xl'>Create your Nexttree</h1>
                    <div className='item flex flex-col'>
                        <h2 className='font-semibold text-2xl'>Step 1: Claim your handle</h2>
                        <input value={handle || ""} onChange={e => { sethandle(e.target.value) }} className='px-6 py-2 mx-2 my-1 focus:outline-yellow-700 rounded-full'
                            type="text" placeholder='Choose a Handle' />
                    </div>
                    <div className='item'>
                        <h2 className='font-semibold text-2xl'>Step 2: Add links</h2>
                        {links && links.map((item, index) => {
                            return <div key={index} className='item flex  justify-center gap-2'>
                                <input value={item.linktext || ""} onChange={e => { handleChange(index, item.link, e.target.value) }} className='px-4 py-2 mx-2 my-2 focus:outline-yellow-900 rounded-full' type="text" placeholder='Enter link text' />
                                <input value={item.link || ""} onChange={e => { handleChange(index, e.target.value, item.linktext) }} className='px-4 py-2 mx-2 my-2 focus:outline-yellow-900 rounded-full'
                                    type="text" placeholder='Enter link' />
                            </div>
                        })}
                        <button onClick={() => addLink()} className='p-5 py-2 w-fit mx-2 bg-yellow-950 text-white font-bold rounded-xl'>+ Add Link</button>
                    </div>
                    <div className='item flex flex-col'>
                        <h2 className='font-semibold text-2xl'>Step 3: Add a Picture and Description</h2>
                        <input value={pic || ""} onChange={e => setpic(e.target.value)} className='px-6 py-2 mx-2 my-1 focus:outline-yellow-700 rounded-full'
                            type="text" placeholder='Enter link to add image' />
                        <input value={desc || ""} onChange={e => setdesc(e.target.value)} className='px-6 py-2 mx-2 my-1 focus:outline-yellow-700 rounded-full'
                            type="text" placeholder='Enter Description' />
                        <button disabled={pic == "" || handle == "" || links[0].linktext == ""} onClick={() => { submitLinks() }} className='disabled:bg-slate-600 p-5 py-2 my-5 w-fit mx-2 bg-yellow-950 text-white font-bold rounded-xl'>Create your Nexttree</button>
                    </div>
                </div>
            </div>
            <div className='col2 w-full h-[60vw] bg-[#d6a336]'>
                <img className='h-full' src="/generate.png" alt="Generate your links" />
                <ToastContainer />
            </div>
        </div>
    )
}

export default Generate