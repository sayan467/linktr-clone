import Link from "next/link"
import clientPromise from "@/lib/mongodb"


export default async function Page({ params }) {
    const handle = (await params).handle
    const client = await clientPromise
    const db = client.db("nexttree")
    const collection = db.collection("links")

    // if the handle is already claimed then cannot claim the same handle again
    const item = await collection.findOne({handle: handle})

    const item2 = {
        "_id": {
            "$oid": "676ad3030a2f95ad00c63717"
        },
        "links": [
            {
                "link": "https://www.linkedin.com/in/syed-sayan-8a1a5228a/",
                "linktext": "Linkedin"
            },
            {
                "link": "https://leetcode.com/u/Sayan_leetcode24/",
                "linktext": "Leetcode"
            },
            {
                "link": "https://github.com/Sayan-467",
                "linktext": "Github"
            }
        ],
        "handle": "sayan",
        "pic": "https://media.licdn.com/dms/image/v2/D5603AQFbIKkutT7h8A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724522271210?e=1740614400&v=beta&t=yQ66yJheYFIEMIzurqnx97onvSyXQHOdGHFSOsB_rwM"
    }

    return <div className="flex min-h-screen bg-green-600 justify-center items-start py-12">
        {item && <div className="photo flex flex-col justify-center items-center gap-4">
            <img src={item.pic} alt="" height="50" width="150" />
            <span className="font-bold">@{item.handle}</span>
            <span className="desc w-72">{item.desc}</span>
            <div className="links">
                {item.links.map((item, index) => {
                    return <Link key={index} href={item.link}>
                        <div className="px-2 py-4 shadow-lg bg-white rounded-md my-2 min-w-72 flex justify-center">
                            {item.linktext}
                        </div>
                    </Link>
                })}
            </div>
        </div>}
    </div>
}
