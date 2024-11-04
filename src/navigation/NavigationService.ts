import { createNavigationContainerRef, CommonActions, StackActions, useNavigationState } from '@react-navigation/native';
import { RootStackParamList } from './NavigationStack'; // Your defined stack types

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// Navigate to a screen
export function navigate(name: keyof RootStackParamList, params?: RootStackParamList[keyof RootStackParamList]) {
    if (navigationRef.isReady()) {
        // navigationRef.navigate(name, params);
    }
}

// Go back to the previous screen
export function goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.goBack();
    }
}

// Reset the navigation state
export function reset(index: number, routes: Array<{ name: keyof RootStackParamList }>) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index,
                routes,
            })
        );
    }
}

// Replace the current screen with another
export function replace(name: keyof RootStackParamList, params?: RootStackParamList[keyof RootStackParamList]) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(name, params));
    }
}

// Push a new screen onto the stack
export function push(name: keyof RootStackParamList, params?: RootStackParamList[keyof RootStackParamList]) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.push(name, params));
    }
}

// Pop a screen off the stack
export function pop(count: number = 1) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.pop(count));
    }
}

// Pop all the way to the first screen
export function popToTop() {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.popToTop());
    }
}

// Set params for the current screen
export function setParams(params: Partial<RootStackParamList[keyof RootStackParamList]>) {
    if (navigationRef.isReady()) {
        navigationRef.setParams(params);
    }
}

// Check if there is a screen to go back to
export function canGoBack() {
    return navigationRef.isReady() && navigationRef.canGoBack();
}

// Get the current active route
export function getCurrentRoute() {
    if (navigationRef.isReady()) {
        return navigationRef.getCurrentRoute();
    }
}

export function activeTabName() {
    // Use useNavigationState to access the state of the navigation
    const activeTabName = useNavigationState(state => {
        const activeRoute = state.routes[state.index]; // Get the currently active route
        return activeRoute.name; // Return the name of the active route (tab)
    });

    return activeTabName;
}
