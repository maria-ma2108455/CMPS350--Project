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

   
    return new Response(JSON.stringify(items), {
        status: 200
    })
}

export async function POST(request) {
    const item = await request.json()
    const newItem = await AtriCatRepo.addItem(item)
  

    return new Response(JSON.stringify(newItem), {
        status: 200
    })
}
