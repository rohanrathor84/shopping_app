import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../routes/home/HomeScreen';
import ShoppingReelScreen from '../routes/shoppingReel/ShoppingReelScreen';
import ProductCategoryScreen from '../routes/productCategory/ProductCategoryScreen';
import WishlistScreen from '../routes/wishlist/WishlistScreen';
import CartScreen from '../routes/cart/CartScreen';
import {
  Cart,
  Home,
  ProductCategory,
  ShoppingReel,
  Wishlist,
} from './ScreenNames';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AppHeader from '../components/AppHeader';
import { APP_NAME } from '../utils/Constants';

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        header: props => (
          <AppHeader
            title={APP_NAME}
            appNavigation={props.navigation}
            appRoute={props.route}
            {...props}
          />
        ),
      }}>
      <Tab.Screen
        name={Home}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="home" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name={ProductCategory}
        component={ProductCategoryScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="category" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name={ShoppingReel}
        component={ShoppingReelScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="ondemand-video" size={25} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={Wishlist}
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="favorite-outline" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name={Cart}
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="shopping-cart" size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
