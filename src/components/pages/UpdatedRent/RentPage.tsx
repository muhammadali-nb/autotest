import { ReactNode, useState } from "react";
import { MetaTags } from "../../layout/BaseLayout";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import rentService from "../../../api-functions/rent-page/rent-service";
import MetaDecorator from "../../layout/MetaDecorator";
import RentLayout from "../../layout/RentLayout";
import { Col, Container, Row } from "react-bootstrap";
import CatalogMobileMenu from "../Catalog/CatalogMobileMenu";
import FiltersBlock from "../Rent/FiltersBlock";
import FilterButtons from "../Catalog/FilterButtons";
import RentGrid from "../Catalog/RentGrid";
import { SmallFooter } from "../../layout/Footer";
import { RentPageHeader } from "../RentPage";

const RentPage = ({ children }: { children?: ReactNode }) => {
	const title = "Аренда автомобилей - " + process.env.REACT_APP_WEBSITE_NAME;
	const meta: MetaTags = {
		description: "Аренда автомобилей",
		keywords: "аренда, авто, каталог,rent",
	};
	const [isOpen, setOpen] = useState<boolean>(false);
	const { id } = useParams();
	const paramsId = id ? parseInt(id) : 1;
	const { data, isLoading, error } = useQuery({
		queryKey: ["rent-filter"],
		queryFn: () => rentService.getFilter(),
	});
	// if (error) return <LoadError response={error} />;
	return (
		<>
			<MetaDecorator title={title} url="/rent" />
			<RentLayout
				meta={meta}
				title={title}
				headerSelectedLink={`/rent/page/${paramsId}`}
				footerSmall>
				<RentPageHeader />
				<Container fluid={"xxl"} className={" mt-px-30"}>
					<CatalogMobileMenu
						data={!isLoading && data}
						isActive={isOpen}
						setIsActive={setOpen}
					/>

					<Row>
						<Col lg={3}>
							<FiltersBlock filterData={!isLoading && data} />
						</Col>
						<Col lg={9} className="d-flex flex-column">
							{!error && (
								<FilterButtons
									rentFilterData={!isLoading && data.top}
									mode="rent"
									isShowMobileFiler={setOpen}
								/>
							)}

							<RentGrid activePage={paramsId} />
							<SmallFooter className={"mt-auto"} />
						</Col>
					</Row>
				</Container>
				{children}
			</RentLayout>
		</>
	);
};

export default RentPage;
