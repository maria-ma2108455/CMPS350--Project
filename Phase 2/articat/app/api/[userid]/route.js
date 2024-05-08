import articatRepo from "@/app/repo/articat-repo"
const ArtiCatRepo = new articatRepo()

export async function GET(request, { params }) {

    const username = params.userid
    const user = await ArtiCatRepo.getUser(username)


    return  Response.json(user, {
        status: 200
    })

    

}