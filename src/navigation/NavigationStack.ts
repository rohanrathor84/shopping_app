// Define your navigation stack params
export type RootStackParamList = {
    Home: undefined;
    ProductDetails: { itemId: number };
    ProductCategory: { itemId: number };
    ShoppingReel: { itemId: number };
    Wishlist: { itemId: number };
    Cart: { itemId: number };
    Notifications: undefined;
    Profile: undefined;
};
