import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation"

export default async function Page({ params }) {
    const handle = (await params).handle
    const client = await clientPromise
    const db = client.db('playlink')
    const collection = db.collection('links')

    // If the handle is already claimed, you cannot create the PlayLink
    const item = await collection.findOne({ handle: handle })

    if(!item){
        return notFound()
    }

    return <div className="flex min-h-screen bg-indigo-300 justify-center items-start py-10">
        {item && <div className="photo flex flex-col justify-center items-center gap-2">
            <img src={item.pic} alt="profile pic" />
            <span className="font-bold text-xl">@{item.handle}</span>
            <span className="desc w-80 text-center">{item.desc}</span>
            <div className="links">
                {item.links.map(((item, index) => {
                    return <Link key={index} href={item.link}><div className="flex justify-center items-center py-4 px-2 min-w-96 rounded-md my-3 shadow-lg bg-indigo-50">
                        {item.linktext}
                    </div></Link>
                }))}
            </div>
        </div>}
    </div>
}