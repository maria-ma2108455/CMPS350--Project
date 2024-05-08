import articatRepo from "@/app/repo/articat-repo"
const ArtiCatRepo = new articatRepo()

export async function GET(request) {
    
    const users = await ArtiCatRepo.getAllUsers()
   

    return  Response.json(users, {
        status: 200
    })

}