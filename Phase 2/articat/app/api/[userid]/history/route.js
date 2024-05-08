import articatRepo from "@/app/repo/articat-repo"
const ArtiCatRepo = new articatRepo()

export async function GET(request, { params }) {
    
    const username= params.userid
    
    const items = await ArtiCatRepo.getHistory(username)
    
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',  
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',  
    })
    

    return  Response.json(items, {
        status: 200,
        headers: headers
    })

}