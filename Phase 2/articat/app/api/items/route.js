import articatRepo from "@/app/repo/articat-repo"
const AtriCatRepo = new articatRepo()

export async function GET(request) {
    let items
    const {searchParams} = new URL(request.url)
    const category = searchParams.get('category')
    const searchValue = searchParams.get('searchValue')
    
    if (category) {
        items = await AtriCatRepo.getItems(category)
    } else if (searchValue) {
        items = await AtriCatRepo.getSearchItems(searchValue)
    } else {
        items = await AtriCatRepo.getAllItems()
    }

    // Manually setting CORS headers
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',  
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',  
    })

    return new Response(JSON.stringify(items), {
        status: 200,
        headers: headers
    })
}

export async function POST(request) {
    const item = await request.json()
    const newItem = await AtriCatRepo.addItem(item)
    const headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',  
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',  
    })

    return new Response(JSON.stringify(newItem), {
        status: 200,
        headers: headers
    })
}