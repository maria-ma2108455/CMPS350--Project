import articatRepo from "@/app/repo/articat-repo"
const AtriCatRepo = new articatRepo()
export async function GET(request, { params }) {
    const itemId= params.itemid
    const item = await AtriCatRepo.getItem(itemId)
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',  
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',  
    })

    return  Response.json(item, {
        status: 200,
        headers: headers
    })

}


export async function PUT(request, { params }){
    const itemId= params.itemid
    const itemUpdate = await request.json()
    const updatedItems = await AtriCatRepo.updateItem(itemId,itemUpdate)
    return Response.json(updatedItems, { status: 200 })
}