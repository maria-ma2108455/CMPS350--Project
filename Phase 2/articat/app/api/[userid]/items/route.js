import articatRepo from "@/app/repo/articat-repo"
const ArtiCatRepo = new articatRepo()

export async function GET(request, { params }) {

    const sellerUN = params.userid
    const items = await ArtiCatRepo.getSellerItems(sellerUN)

    return  Response.json(items, {
        status: 200
    })

}