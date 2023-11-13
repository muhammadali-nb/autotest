import React, { ReactNode } from "react";
import RentPage from "../pages/RentPage";

const RentDetailModalLayout = ({ children }: { children: ReactNode }) => {
	return <RentPage>{children}</RentPage>;
};

export default RentDetailModalLayout;
