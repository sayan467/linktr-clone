import clientPromise from "@/lib/mongodb"

export async function POST(request) {
    const body = await request.json()
    const client = await clientPromise
    const db = client.db("nexttree")
    const collection = db.collection("links")

    // if the handle is already claimed then cannot claim the same handle again
    const doc = await collection.findOne({handle: body.handle})
    if(doc) {
        return Response.json({ success: false, error: true, message: 'Nexttree already exists', result: null })
    }

    const result = await collection.insertOne(body)    

    return Response.json({ success: true, error: false, message: 'The Nexttree has been created', result: result })
}
