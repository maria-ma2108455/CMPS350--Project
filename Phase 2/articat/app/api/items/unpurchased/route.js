import articatRepo from "@/app/repo/articat-repo"
const AtriCatRepo = new articatRepo()

export async function GET(request) {
    const unPurchased = await AtriCatRepo.getUnpurchasedProducts()
    return Response.json(unPurchased)
}