import articatRepo from "@/app/repo/articat-repo"
const AtriCatRepo = new articatRepo()

export async function GET(request) {
    const accounts = await AtriCatRepo.getAllItems()
    return Response.json(accounts, { status: 200 })
}
// export async function POST(request) {
//     const account = await request.json()
//     const newAccount = await AtriCatRepo.addAccount(account)
//     return Response.json(newAccount, { status: 201 })
// }