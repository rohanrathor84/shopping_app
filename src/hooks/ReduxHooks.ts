import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";

export const useAppSelector = (selector: (state: RootState) => any) => useSelector(selector);
export const useAppDispatch = () => useDispatch<AppDispatch>();