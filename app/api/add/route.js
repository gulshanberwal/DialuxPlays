import clientPromise from '@/lib/mongodb'

export async function POST(req) {
  const body = await req.json()
  const client = await clientPromise
  const db = client.db('playlink')
  const collection = db.collection('links')
  
  // If the handle is already claimed, you cannot create the PlayLink
  const doc = await collection.findOne({handle: body.handle})

  if(doc){
    return Response.json({ success: false, error: true, message: "The PlayLink already exists!" , result: null})
  }

  const result = await collection.insertOne(body)
  
  return Response.json({ success: true, error: false, message: "The PlayLink has been added!" , result: result})
}