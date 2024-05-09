import articatRepo from "@/app/repo/articat-repo"
const ArtiCatRepo = new articatRepo()

export async function PUT(request, { params }){
    const itemId= params.itemid
    // const itemUpdate = await request.json()
    const updatedItemClick = await ArtiCatRepo.updateItemClick(itemId)
    return Response.json(updatedItemClick, { status: 200 })
    // return Response.json('checking', { status: 200 })
}