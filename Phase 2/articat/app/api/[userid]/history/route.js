import articatRepo from "@/app/repo/articat-repo"
const AtriCatRepo = new articatRepo()

export async function GET(request, { params }) {
    
    const username= params.userid
    
    const items = await AtriCatRepo.getHistory(username)
    
    const headers = new Headers({
        'Access-Control-Allow-Origin': '*',  
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
    })

    return  Response.json(items, {
        status: 200,
        headers: headers
    })

}