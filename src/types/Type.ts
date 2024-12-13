export type VideoProps = {
    author: string
    description: string
    duration: string
    id: string
    isLive: boolean
    subscriber: string
    thumbnailUrl: string
    title: string
    uploadTime: string
    videoUrl: string
    views: string
    color: string
}

export type ProductImages = {
    id: string,
    imageUrl: string
}

export type ShoppingReelDataProps = {
    id: string
    type: string
    videoUrl: string
    description: string
    productImages: ProductImages[]
}